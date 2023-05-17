import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { addOrder } from '../../firebase/firebase.utils';

const QrCode = () => {
  const [url, setUrl] = useState('');

  const downloadQRCode = async e => {
    e.preventDefault();
    const canvas = document.getElementById('123456');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
      .substring(31);

    // let downloadLink = document.createElement('a');
    // downloadLink.href = pngUrl;
    // downloadLink.download = '123456.png';
    // document.body.appendChild(downloadLink);
    // downloadLink.click();
    // document.body.removeChild(downloadLink);
  };

  const qrCodeEncoder = e => {
    setUrl(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      hidden={true}
      id="123456"
      value={url}
      size={300}
      bgColor={'transparent'}
      level={'H'}
    />
  );

  return (
    <div className="qrcode__container">
      <div>{qrcode}</div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <label>Enter URL</label>
          <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="value"
          />
          <button type="submit" disabled={!url}>
            Download QR code
          </button>
        </form>
      </div>
    </div>
  );
};

export default QrCode;
