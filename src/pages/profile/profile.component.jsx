import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './profile.styles.scss';

import placeholderImage from '../../assets/placeholder_picture.png';
import Orders from './orders/orders.component';
import {
  auth,
  getUserOrders,
  updateProfile,
  updateProfilePicture,
} from '../../firebase/firebase.utils';
import Loader from '../../components/loader/loader.component';

import { storage } from '../../firebase/firebase.utils';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import CustomButton from '../../components/custom-button/custom-button.component';

const ProfilePage = ({ currentUser }) => {
  const [image, setImage] = useState(currentUser.photoURL || placeholderImage);
  const [isHovering, setIsHovering] = useState(false);
  const [orders, setOrders] = useState(null);
  const [displayName, setDisplayName] = useState(currentUser?.displayName);
  const [email, setEmail] = useState(currentUser?.email);
  const [edit, setEdit] = useState(false);

  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);

  const [imageSelected, setImageSelected] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dName = currentUser?.displayName;

  useEffect(() => {
    const fetchOrders = async () => {
      const userOrders = await getUserOrders();
      setOrders(userOrders);
    };

    if (auth?.currentUser) {
      fetchOrders();
    }
  }, [auth?.currentUser]);

  const handleDisplayNameChange = event => {
    setDisplayName(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handleEditClicked = () => {
    if (edit) {
      setDisplayName(dName);
    }
    setEdit(!edit);
  };

  const handleSaveClicked = async () => {
    setEdit(!edit);
    updateProfile(displayName);
  };

  const handleImageChange = event => {
    const uploadedImage = event.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));
    setFile(event.target.files[0]);
    setImageSelected(true);
  };

  const handlePictureUpload = async () => {
    if (!file) {
      return;
    }
    setUploading(true);
    const storageRef = ref(
      storage,
      `/profile-pictures/${auth?.currentUser?.uid}/${auth?.currentUser?.uid}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
        if (percent === 100) {
          setUploading(false);
          setImageSelected(false);
        }
      },
      err => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          updateProfilePicture(url);
        });
      }
    );
  };

  return (
    <div className="profile-page">
      <h1 className="welcome">Welcome to your profile!</h1>
      <div className="content">
        <div className="left-menu">
          <span>Picture:</span>
          <>
            <label
              htmlFor="image-input"
              className="img-container"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                alt="Profile"
                className={`pic ${isHovering ? 'blur' : ''}`}
                src={image}
                referrerPolicy="no-referrer"
              />
              {isHovering && <p className="upload-text">Upload image</p>}
            </label>
            {imageSelected && !uploading && (
              <CustomButton className="upload" onClick={handlePictureUpload}>
                Upload
              </CustomButton>
            )}
            {uploading && (
              <div className="uploading-text">
                {uploading && <Loader />}
                {uploading && <p className="percentage">{percent}% done</p>}
              </div>
            )}
            <input
              id="image-input"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </>
          <span className="first">Display name:</span>
          <input
            disabled={!edit}
            type="text"
            className="editable-field"
            value={displayName}
            onChange={handleDisplayNameChange}
          />
          <span>Email address:</span>
          <input
            disabled={true}
            type="email"
            className="editable-field"
            value={email ? email : ''}
            onChange={handleEmailChange}
          />
          <div className="edit">
            <CustomButton className="first-edit" onClick={handleEditClicked}>
              {edit ? 'Cancel editing' : 'Edit profile'}
            </CustomButton>
            {edit && (
              <CustomButton onClick={handleSaveClicked} save>
                Save
              </CustomButton>
            )}
          </div>
        </div>
        <div className="right-menu">
          <span className="rm-span">Previous orders</span>
          {orders ? <Orders orders={orders} /> : <Loader />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ProfilePage);
