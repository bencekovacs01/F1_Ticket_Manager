import React, { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';

const QRCodeScanner = props => {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState();
  return (
    <>
      <div
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
      </div>
    </>
  );
};

export default QRCodeScanner;
