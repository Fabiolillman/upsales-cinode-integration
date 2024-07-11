const axios = require('axios');

const ordersUrl = 'https://integration.upsales.com/api/v2/orders?token={{token}}&probability=100';
const opportunitiesUrl = 'https://integration.upsales.com/api/v2/orders?token={{token}}&probability=gte:1&probability=lte:99';

const token = '98aa4bf8683bab2253c6a4ead84389815ecb15ee816afa42631cad965076f18f';

function replaceToken(url, token) {
  return url.replace('{{token}}', token);
}

async function fetchOrdersData() {
  try {
    const response = await axios.get(replaceToken(ordersUrl, token));
    return response.data;
  } catch (error) {
    console.error('Error fetching orders data:', error);
    throw error;
  }
}

async function fetchOpportunitiesData() {
  try {
    const response = await axios.get(replaceToken(opportunitiesUrl, token));
    return response.data;
  } catch (error) {
    console.error('Error fetching opportunities data:', error);
    throw error;
  }
}

module.exports = {
  fetchOrdersData,
  fetchOpportunitiesData
};
