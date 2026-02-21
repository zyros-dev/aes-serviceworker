const AES_KEY = new Uint8Array([79, 162, 15, 84, 108, 136, 121, 158, 188, 41, 148, 174, 70, 56, 170, 74, 191, 173, 147, 242, 170, 147, 229, 44, 86, 90, 197, 181, 151, 85, 101, 225]);

let cryptoKey;

async function initCryptoKey() {
  if (!cryptoKey) {
    cryptoKey = await crypto.subtle.importKey(
      'raw',
      AES_KEY,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    );
  }
  return cryptoKey;
}

async function decryptResponse(encryptedData) {
  const key = await initCryptoKey();
  const dataArray = new Uint8Array(encryptedData);

  const nonce = dataArray.slice(0, 12);
  const ciphertext = dataArray.slice(12);

  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: nonce },
    key,
    ciphertext
  );

  return plaintext;
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(async (response) => {
        const contentType = response.headers.get('content-type');

        if (!response.ok) {
          return response;
        }

        const encryptedData = await response.arrayBuffer();

        try {
          const decryptedData = await decryptResponse(encryptedData);

          const newHeaders = new Headers(response.headers);
          newHeaders.delete('content-encoding');
          newHeaders.set('content-length', decryptedData.byteLength.toString());

          return new Response(decryptedData, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders
          });
        } catch (error) {
          console.error('Decryption failed:', error);
          return response;
        }
      })
      .catch((error) => {
        console.error('Fetch failed:', error);
        throw error;
      })
  );
});

self.addEventListener('install', (event) => {
  event.waitUntil(initCryptoKey());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
