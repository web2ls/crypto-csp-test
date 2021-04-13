import { useEffect } from 'react';
import { createAttachedSignature, createHash, getUserCertificates } from 'crypto-pro';

import logo from './logo.svg';
import './App.css';

import API from './api';

function App() {
  const backendUrl = 'http://localhost:8000/crypto.pdf';

  const signIt = async (source, thumbprint) => {
    const message = source ? source : 'Hello Workld';
    try {
      const messageHash = await createHash(new Uint8Array(message));

      try {
        const signature = await createAttachedSignature(thumbprint, messageHash);
        console.log(signature);
        return signature;
      } catch (signatureError) {
        console.log(signatureError);
        return false;
      }
    } catch (hashError) {
      console.log(hashError);
      return false;
    }
  };

  const onSelectFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];

    const fileReader = new FileReader();

    fileReader.onload = async () => {
      console.log('file has been readed');
      try {
        const certs = await getUserCertificates();
        console.log(certs[0]);

        if (certs.length) {
          signIt(fileReader.result, certs[0].thumbprint);
        } else {
          console.log('Certs not found');
        }
      } catch(certsListError) {
        console.log('Error on getting certs list');
      };
    };

    fileReader.onerror = (error) => {
      console.error(error);
    };

    fileReader.readAsDataURL(file);
  };

  const onRemoteFileClick = async () => {
    const pdfFile = await getPDFFile();
    const certs = await getUserCertificates();
    const signature = await signIt(pdfFile, certs[0].thumbprint);
    API.uploadFile(signature)
    .then(res => {
      console.log('File has been uploaded');
    })
    .catch(error => {
      console.error(error);
    })
  };

  const getPDFFile = () => {
    return new Promise((resolve, reject) => {
      API.getPDFFile()
      .then(res => {
        resolve(res.body);
      })
      .catch(error => {
        reject(error);
      })
    })
  };

  return (
    <div className="App">
      <div className='string-signer' onClick={signIt} style={{ marginBottom: '20px' }}>
        Create Sign for string
      </div>

      <div className='sign-file' style={{ marginBottom: '20px' }}>
        <input type='file' accept='.pdf' onChange={onSelectFile} />
      </div>

      <div className='sign-remote-pdf' style={{cursor: 'pointer'}} onClick={onRemoteFileClick}>
        Sign remote PDF file
      </div>
    </div>
  );
}

export default App;
