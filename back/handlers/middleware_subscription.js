const client = require("../config/redis.config");


const checkSubscriptionStatus = async (req, res, next) => {
    try {
      // Get the tenantId from the request
      const tenantId = req.headers.tenantid;
      console.log("/// " + tenantId);
      // Check if tenantId is available
      if (!tenantId) {
        return res.status(400).send("Missing tenantId.");
      }
      // Get the subscription status from Redis.
      
    /*
      const newSettings = await client.hGetAll(`tenantSettings:${tenantId}`);
      
      
      let  suscription = newSettings?.suscription || 'test';
      // Check if the subscription is active.
      
      if (suscription !== "active" && suscription !== "test") {
        return res.status(403).send("Subscription is not active.");
      }
  
      // If active, move to the next middleware or route.
      */
      next(); 
    } catch (err) {
      console.error('Error checking subscription in Redis:', err);
      res.status(500).send("Internal Server Error");
    }
  };
  
  module.exports = {
    checkSubscriptionStatus
  };