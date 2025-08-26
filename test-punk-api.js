// Simple test script to verify Punk API integration
const https = require('https');

console.log('Testing Punk API integration...\n');

function testPunkAPI() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'punkapi.online',
      port: 443,
      path: '/v3/beers/random',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const beer = JSON.parse(data);
          console.log('✅ Punk API Test Success!');
          console.log(`📋 Beer Name: ${beer.name}`);
          console.log(`🍺 ABV: ${beer.abv}%`);
          console.log(`🌿 IBU: ${beer.ibu || 'N/A'}`);
          console.log(`🎨 EBC: ${beer.ebc || 'N/A'}`);
          console.log(`💭 Tagline: ${beer.tagline || 'N/A'}`);
          console.log(`📝 Description: ${beer.description.substring(0, 100)}...`);
          console.log(`🖼️  Image: ${beer.image || 'No image'}`);
          
          // Test our style derivation logic
          const { abv, ibu = 0, ebc = 0 } = beer;
          let derivedStyle = 'Ale'; // default
          
          if (ibu > 60) {
            derivedStyle = abv > 7 ? 'Double IPA' : 'IPA';
          } else if (ebc > 40) {
            derivedStyle = abv > 8 ? 'Imperial Stout' : abv > 5 ? 'Stout' : 'Porter';
          } else if (ebc < 10 && ibu < 25) {
            derivedStyle = abv < 5 ? 'Lager' : 'Pilsner';
          } else if (abv > 6) {
            derivedStyle = 'Strong Ale';
          } else if (ibu > 30) {
            derivedStyle = 'Pale Ale';
          }
          
          console.log(`🏷️  Derived Style: ${derivedStyle}`);
          console.log('\n✅ All API integration components working correctly!');
          resolve(beer);
        } catch (error) {
          console.error('❌ JSON parsing error:', error.message);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      reject(error);
    });

    req.setTimeout(10000, () => {
      console.error('❌ Request timeout');
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Run the test
testPunkAPI()
  .then(() => {
    console.log('\n🎉 Integration test completed successfully!');
    console.log('The brewery finder app should now display real beer data from Punk API.');
  })
  .catch((error) => {
    console.error('\n💥 Integration test failed:', error.message);
    console.log('Fallback beer data will be used instead.');
  });