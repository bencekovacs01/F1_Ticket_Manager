import React from 'react';
// import QrCode from '../../components/qr-generator/qr-generator.component';
import QRCodeScanner from '../../components/qr-scanner/qr-scanner-component';

import './qr-scanner-page.styles.scss';

const QrScannerPage = () => (
  <div className="generator">
    {/* <QrCode /> */}
    <QRCodeScanner />
  </div>
);
export default QrScannerPage;
