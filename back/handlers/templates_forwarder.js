const axios = require('axios');


async function handleTemplates(allSessionData) {
     // Adjust based on your actual request structure
     
   console.log("-- " +allSessionData);
    //const communicationMode = allSessionData.permissionall;
    const newObject = {
        ...allSessionData,
        key: parseInt(tenantId)
    };

    try {
        const response = await axios.post(process.env.ROUTE_OFFICIAL+`/templates`, {
            datatemplate:newObject  // example
        });

        return response.data; // Return the response from the other server
    } catch (error) {
        throw new Error('Failed to send the template');
    }
}

// Export the function if you're using modules
module.exports = handleTemplates;
