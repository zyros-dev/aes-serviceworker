# AES-GCM Service Worker Decryption

Service Worker that automatically intercepts and decrypts AES-GCM encrypted fetch responses.

## Features

- Transparent decryption of all fetch requests
- No modification to existing fetch calls required
- Supports AES-256-GCM encryption
- Extracts nonce from first 12 bytes of response
- Decrypts ciphertext + authentication tag

## Usage

### In React

```javascript
import { useEffect } from 'react';
import { registerDecryptWorker } from './registerServiceWorker';

function App() {
  useEffect(() => {
    registerDecryptWorker();
  }, []);

  return <div>Your app content</div>;
}
```

### Vanilla JavaScript

```javascript
navigator.serviceWorker.register('/sw.js')
  .then(() => console.log('Service Worker registered'))
  .catch(error => console.error('Registration failed:', error));
```

## Encrypted Response Format

```
[12 bytes: nonce][remaining bytes: ciphertext + 16-byte auth tag]
```

## Testing

```bash
npm install
node encrypt-test-data.js
node test-server.js
```

In another terminal:
```bash
node browser-test.js
```

Or open `http://localhost:3000` in a browser and click "Test Fetch & Decrypt".

## Files

- `sw.js` - Service Worker that intercepts and decrypts responses
- `registerServiceWorker.js` - Helper to register the service worker
- `App.jsx` - React example
- `test-server.js` - Test HTTP server
- `encrypt-test-data.js` - Generates encrypted test data
- `test-decrypt.js` - Node.js decryption verification
- `browser-test.js` - Automated browser test using Puppeteer

## License

MIT
