// Import necessary libraries
import React, { useState, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import base64 from 'base-64';
import html2canvas from 'html2canvas';
import logo from './images/logo-fosti.webp'
import logoQR from './images/logo-fosti-qr.webp'; // Update the path based on your folder structure

// Functional component for the QR Code generator
const QRCodeGenerator = () => {
  // State variables for form fields and QR code data
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [qrCodeData, setQrCodeData] = useState('');
  const [error, setError] = useState('');
  const qrCodeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Input validation
    if (studentId.includes('/') || studentId.includes(';') ||
        fullName.includes('/') || fullName.includes(';') ||
        email.includes('/') || email.includes(';')) {
      setError("Input cannot contain '/' or ';'");
      setQrCodeData('');
      return;
    }

    const encodedData = base64.encode(`${studentId}/${fullName}/${email}/FOSTI`);
    setQrCodeData(encodedData);
    setError('');
  };

  const handleDownload = () => {
    if (qrCodeRef.current) {
      html2canvas(qrCodeRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    } else {
      console.error('QR code reference is null. Make sure it is properly assigned.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-9 px-4">
      <div>
        <img src={logo} alt="Logo FOSTI UMS" className="w-36 h-36 mx-auto mb-4" />
      </div>
      <h1 className="text-2xl font-bold mb-4 text-center">QR Presence Generator</h1>

      <form onSubmit={handleSubmit} className="mb-8 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-600">
            Student ID
          </label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full"
        >
          Generate QR Code
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>

      {qrCodeData && (
        <div ref={qrCodeRef} className="text-center max-w-xl mx-auto relative">
          <h2 className="text-xl font-bold mb-2">FOSTI Presence Code</h2>
          <QRCode
            value={qrCodeData}
            logoImage={logoQR}
            removeQrCodeBehindLogo
            logoPaddingStyl="circle"
            size={256}
          />
        </div>
      )}

      {qrCodeData && (
        <button
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mt-4"
          onClick={handleDownload}
        >
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeGenerator;
