import { useEffect } from 'react';
import { registerDecryptWorker } from './registerServiceWorker';

function App() {
  useEffect(() => {
    registerDecryptWorker();
  }, []);

  return (
    <div>
      <h1>Service Worker Registered</h1>
      <p>All fetch requests will be automatically decrypted</p>
    </div>
  );
}

export default App;
