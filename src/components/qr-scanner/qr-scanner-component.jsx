import React, { useState } from 'react';
// import { QrScanner } from '@yudiel/react-qr-scanner';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import ValidationPopup from './validation-popup/validation-popup.component';
import { checkOrder, checkOrders } from '../../firebase/firebase.utils';

import './qr-scanner-styles.scss';
import TrackSelector from './track-selector/track-selector.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const QRCodeScanner = ({ collections }) => {
  // const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(0);

  const [uid, setUid] = useState('');
  const [pin, setPin] = useState('');
  const [selectedCurcuitId, setSelectedCurcuitId] = useState(
    collections[0].circuitId
  );

  const handleScanUidChange = event => {
    const { value } = event.target;
    setUid(value);
  };

  const handleScanPinChange = event => {
    const { value } = event.target;
    if (value.length < 7) setPin(value);
  };

  let items = [];
  collections.map(track => {
    items.push({ image: track.url, circuitId: track.circuitId });
  });

  return (
    <>
      <TrackSelector
        items={items}
        onSelect={circuitId => setSelectedCurcuitId(circuitId)}
      />
      <FormInput
        id="scan_uid"
        name="scan_uid"
        type="text"
        value={uid}
        label="UID"
        onChange={handleScanUidChange}
        title="UID"
        required
      />
      <FormInput
        id="scan_pin"
        name="scan_pin"
        type="text"
        value={pin}
        label="PIN"
        onChange={handleScanPinChange}
        title="PIN"
        required
      />
      <CustomButton
        className="submit"
        onClick={async () => {
          if (pin.length === 6 && uid.length > 0) {
            if (!selectedCurcuitId) return;
            const res = await checkOrders({
              circuitId: selectedCurcuitId,
              uid: uid,
              pin: pin,
            });
            setResult(res);
            switch (res) {
              case -3:
                console.log('Unknown error!');
                break;
              case -2:
                console.log('Error checking order!');
                break;
              case -1:
                console.log('Incorrect PIN!');
                break;
              case 1:
                console.log('Success!');
                break;
              default:
                console.log('Unknown error!');
                break;
            }
          }
        }}
      >
        VALIDATE
      </CustomButton>

      <ValidationPopup isSuccessful={result > 0} scanned={result !== 0} />

      {/* {result !== 0 ? ( 
        <Popup isSuccessful={result > 0} scanned={true} />
      ) : (
        <Popup isSuccessful={result > 0} scanned={false} />
      )} */}

      {/* <div
        className="scanner"
        style={{
          margin: 'auto',
          width: 400,
        }}
      >
        {scanning && (
          <QrScanner
            constraints={{
              facingMode: 'environment',
              height: {
                ideal: 720,
                max: 1080,
                min: 640,
              },
              width: {
                ideal: 720,
                max: 1920,
                min: 640,
              },
            }}
            onResult={e => {
              console.log(e.text);
              setResult(e.text);
              if (scanning) {
                setScanning(false);
              }
            }}
            scanDelay={1000}
          />
        )}
      </div>
      <div
        style={{
          fontSize: 30,
          fontFamily: 'f1_1',
        }}
      >
        {result}
      </div> */}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(QRCodeScanner);
