import { useEffect } from 'react';
import { createAttachedSignature, createHash, getUserCertificates } from 'crypto-pro';

import logo from './logo.svg';
import './App.css';

function App() {

  const signIt = async (source, thumbprint) => {
    const message = source ? source : 'Hello Workld';
    try {
      const messageHash = await createHash(new Uint8Array(message));

      try {
        const signature = await createAttachedSignature(thumbprint, messageHash);
        console.log(signature);
      } catch (signatureError) {
        console.log(signatureError);
      }
    } catch (hashError) {
      console.log(hashError);
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

  return (
    <div className="App">
      <div className='string-signer' onClick={signIt} style={{ marginBottom: '20px' }}>
        Create Sign for string
      </div>

      <div className='sign-file'>
        <input type='file' accept='.pdf' onChange={onSelectFile} />
      </div>
    </div>
  );
}

export default App;
