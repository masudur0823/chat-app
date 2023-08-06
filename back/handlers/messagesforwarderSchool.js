const axios = require('axios');


async function handleMessageCreationSchool(allSessionData) {
     // Adjust based on your actual request structure
     
   console.log("-- " +allSessionData);
    //const communicationMode = allSessionData.permissionall;
    let communicationMode = allSessionData.communicationmode;
    let baseUrl;

    if (communicationMode === 'Official') {
        baseUrl = 'http://localhost:4000';
        console.log(baseUrl);
    } else {
        baseUrl = 'http://localhost:5000'; 
        console.log(baseUrl);
    } 
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
module.exports = handleMessageCreationSchool;
