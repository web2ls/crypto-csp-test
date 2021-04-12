import { useEffect } from 'react';
import { createDetachedSignature, createHash } from 'crypto-pro';

import logo from './logo.svg';
import './App.css';

function App() {

  const signIt = async () => {
    const message = 'Hello Workld';
    try {
      const messageHash = await createHash(message);

      try {
        const signature = await createDetachedSignature('certname', messageHash);
        console.log(signature);
      } catch (signatureError) {
        console.log(signatureError);
      }
    } catch (hashError) {
      console.log(hashError);
    }
  };

  return (
    <div className="App">
      <header className="App-header" onClick={signIt}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
