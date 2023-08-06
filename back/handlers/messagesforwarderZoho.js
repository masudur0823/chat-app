const axios = require('axios');


async function handleMessageCreationZoho(allSessionData) {
     // Adjust based on your actual request structure
     
   console.log("-- " +allSessionData);
    //const communicationMode = allSessionData.permissionall;
    let communicationMode = allSessionData.communicationmode;
    let baseUrl;
    // buscar el token en la session

    //agregar el toekn a la url
    baseUrl = "Facebook.com/api...?" + token;
    try {
        const response = await axios.post(`${baseUrl}/messages`, {
            message: req.body.message // example
        });

        return response.data; // Return the response from the other server
    } catch (error) {
        throw new Error('Failed to send the message');
    }
}

// Export the function if you're using modules
module.exports = handleMessageCreationZoho;
