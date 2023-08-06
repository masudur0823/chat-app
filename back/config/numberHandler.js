const qrHandler = (req, res, io) => {
    console.log(req.body);
    const qr = req.body.qr;
    const userId = req.body.id; 
  
    // validate inputs
    if (!qr || !userId) {
      res.status(400).send({ message: 'QR and User ID are required' });
      return;
    }
    console.log(userId)
    io.to(userId).emit('qr', { qr });
    // here add to set the number as active in database
  
    res.status(200).send({ message: 'QR received' });
  };
  
  const statusHandler = (req, res, io) => {
    const output = req.body.output;
    const userId = 'user123'; // Use the actual unique user id from the request
  
    // validate inputs
    if (!output || !userId) {
      res.status(400).send({ message: 'Output and User ID are required' });
      return;
    }
  
    if (output === 'ready') {
      io.to(userId).emit('status', { output });
    }
  
    res.status(200).send({ message: 'Status received' });
  };
  
  module.exports = {
    qrHandler,
    statusHandler
  };
  