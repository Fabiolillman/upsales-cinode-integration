const axios = require('axios');

const accessId = '1951d02fad158347a96dee20d8a62f48.app.cinode.com'; // replace with your actual access ID
const accessSecret = 'c59d49fffb7a72b5969189b7045f49e7'; // replace with your actual access secret
const cinodeAuthUrl = 'https://api.cinode.com/token';

async function getCinodeToken() {
  try {
    const basicParameter = Buffer.from(`${accessId}:${accessSecret}`).toString('base64');

    const response = await axios.get(cinodeAuthUrl, {
      headers: {
        'Authorization': `Basic ${basicParameter}`
      }
    });

    if (response.status === 200) {
      console.log('Cinode Token Response:', response.data);
      return response.data.access_token;
    } else {
      console.error('Error fetching Cinode token:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error fetching Cinode token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = {
  getCinodeToken
};
