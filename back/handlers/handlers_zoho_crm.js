const axios = require('axios');

const handleZohoIntegration = async (contact, tenantId,tokenzoho) => {
  const endpoint = `http://api.zoho.com/function${tokenzoho}`;
  
  // Structure your payload as needed for the Zoho API
  const payload = {
    contactInfo: contact,
    tenantId: tenantId
  };

  try {
    const response = await axios.post(endpoint, payload);
    console.log("Data sent to Zoho successfully:", response.data);
  } catch (error) {
    console.error("Error sending data to Zoho:", error);
  }
};

module.exports = {
  handleZohoIntegration
};
