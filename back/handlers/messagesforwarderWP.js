const axios = require('axios');

async function handleMessageCreation(allSessionData, req) {
    console.log("-- " + allSessionData);

    let tokenwp = allSessionData?.tokenwp;
    let integrationzoho = allSessionData?.zohointegration;
    let integrationschool = allSessionData?.schoolintegration;
    let integrationfb = allSessionData?.facebookintegration;

    // Process Zoho Integration
    if (integrationzoho !== null && typeof integrationzoho !== "undefined") {
        let token =  allSessionData?.tokenzoho;
        await processIntegration('http://localhost:6000', token, req.body);
    }
    
    // Process School Integration
    if (integrationschool !== null && typeof integrationschool !== "undefined") {
        let token = allSessionData?.tokenschool;
        await processIntegration('http://localhost:7000', token, req.body);
    }

    // Process Facebook Integration
    if (integrationfb !== null && typeof integrationfb !== "undefined") {
        let token = allSessionData?.tokenfb;
        await processIntegration('http://localhost:8000', token, req.body);
    }

  // Handle communication mode only if no integrations are active
  if (tokenwp !== null && typeof tokenwp !== "undefined") {
    let communicationMode = allSessionData.communicationmode;
    let baseUrl = (communicationMode === 'Official') ? 'http://localhost:4000' : 'http://localhost:5000';
    let Objecttosend = req.body;
    if (communicationMode === 'Official') {
        Objecttosend.accId = allSessionData?.accId;
    }
    await processIntegration(baseUrl, tokenwp, Objecttosend);
}
}

async function processIntegration(baseUrl, token, body) {
    try {
        const response = await axios.post(`${baseUrl}/messages?token=${token}`, body);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to send the message to ${baseUrl}: ` + error.message);
    }
}

// Export the function if you're using modules
module.exports = handleMessageCreation;
