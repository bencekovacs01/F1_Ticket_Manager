import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './profile.styles.scss';

import placeholderImage from '../../assets/placeholder_picture.png';

const ProfilePage = ({ currentUser }) => {
  const [image, setImage] = useState(currentUser.photoURL || placeholderImage);
  const [isHovering, setIsHovering] = useState(false);

  const handleImageChange = event => {
    const uploadedImage = event.target.files[0];
    setImage(URL.createObjectURL(uploadedImage));
  };
  //   console.log('PROFILE:');
  //   console.log(currentUser);
  return (
    <div className="profile-page">
      <h1 className="welcome">Welcome to your profile!</h1>
      <div className="content">
        <div className="left-menu">
          {/* <span className="info">Profile info</span> */}
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
                // src={currentUser.photoURL ? currentUser.photoURL : placeholderImage}
                referrerPolicy="no-referrer"
              />
              {isHovering && <span className="upload-text">Upload image</span>}
            </label>
            <input
              id="image-input"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </>
          <span>Display name:</span>
          <div className="editable-field">{currentUser?.displayName}</div>
          <span>Email address:</span>
          <div className="editable-field">{currentUser?.email}</div>
        </div>
        <div className="right-menu">
          <span>Previous orders:</span>
          {/* <div className="editable-field">{currentUser?.displayName}</div>
          <span>Email address:</span>
          <div className="editable-field">{currentUser?.email}</div> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(ProfilePage);
