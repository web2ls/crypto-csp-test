import { useEffect } from 'react';
import { createAttachedSignature, createHash, getUserCertificates } from 'crypto-pro';

import logo from './logo.svg';
import './App.css';

function App() {

  const signIt = async (source) => {
    const message = source ? source : 'Hello Workld';
    try {
      const messageHash = await createHash(new Uint8Array(message));

      try {
        const signature = await createAttachedSignature('certname', messageHash);
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

    fileReader.onload = () => {
      console.log('file has been readed');
      signIt(fileReader.result);
    };

    fileReader.onerror = (error) => {
      console.error(error);
    };

    fileReader.readAsDataURL(file);
    // getUserCertificates();
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
