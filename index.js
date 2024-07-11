const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const upsalesService = require('./services/upsalesService');
const cinodeService = require('./services/cinodeService');

// Example data paths (adjust as per your folder structure)
const exampleOrdersDataPath = path.join(__dirname, 'exampleOrdersData.json');
const exampleOpportunitiesDataPath = path.join(__dirname, 'exampleOpportunitiesData.json');

// Function to read example data from JSON file
async function readExampleData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading example data from ${filePath}:`, error);
    throw error;
  }
}

function transformUpsalesToCinode(upsalesData) {
  return upsalesData.map(data => {
    const orderRowDetails = data.orderRow.map(row => ({
      id: row.id,
      quantity: row.quantity,
      price: row.price,
      discount: row.discount
    }));

    return {
      email: data.user.email,
      title: data.description,
      description: data.notes,
      createdDateTime: data.regDate,
      updatedDateTime: data.modDate,
      currentEmployer: data.client.name,
      companyId: data.client.id,
      phone: data.user.phone,
      value: data.value,
      probability: data.probability,
      orderRow: orderRowDetails
    };
  });
}

async function processIntegration() {
  try {
    // Fetch Cinode token
    const cinodeToken = await cinodeService.getCinodeToken();

    // Fetch orders and opportunities data from Upsales
    const ordersData = await upsalesService.fetchOrdersData();
    const opportunitiesData = await upsalesService.fetchOpportunitiesData();

    // console.log('Orders Data:', ordersData);
    // console.log('Opportunities Data:', opportunitiesData);

    // Read and log example data
    const exampleOrdersData = await readExampleData(exampleOrdersDataPath);
    const exampleOpportunitiesData = await readExampleData(exampleOpportunitiesDataPath);

    // console.log('Example Orders Data:', exampleOrdersData);
    // console.log('Example Opportunities Data:', exampleOpportunitiesData);

    // Combine real data and example data for testing
    const allUpsalesData = [
      ...ordersData.data,
      ...opportunitiesData.data,
      ...exampleOrdersData.data,
      ...exampleOpportunitiesData.data
    ];
// console.log(allUpsalesData, "All data")
    const cinodeUsersData = transformUpsalesToCinode(allUpsalesData);

    for (const userData of cinodeUsersData) {
      // Logic to update Cinode users would go here
      // console.log(`Prepared Cinode User Data: ${userData.email}`);
    }

    console.log('Data processing completed.');
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

processIntegration();
