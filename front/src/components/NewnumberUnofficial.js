import React from 'react';
import http from '../utils/http';
// import io from 'socket.io-client';
import { useState, useEffect, useContext  } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, CircularProgress } from '@mui/material';
import { SocketContext } from '../context/SocketContext'; // make sure the path is correct


function NewnumberUnofficial() {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [qrImage, setQrImage] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading spinner
  const [qrDialogOpen, setQrDialogOpen] = useState(false); // New state variable for the second dialog

   // Get the socket from the context
   const socket = useContext(SocketContext);

   useEffect(() => {
     socket.on('qr', data => {
       console.log(data);
       if (data.qr) {
         setQrImage(data.qr);
         setIsLoading(false);
       }
     });
 
     socket.on('status', data => {
       if (data.output === 'ready') {
         setQrDialogOpen(false);
       }
     });
 
     return () => {
       socket.off('qr');
       socket.off('status');
     };
   }, [socket]);


  const handleSave = () => {
    // validate number
    if (!number) {
      setError('Number is required');
      return;
    }

    setIsLoading(true); // Show spinner when number is being sent
    http.post('/numbers', { number ,userId:'user123'})
      .then(() => {
        setOpen(false); // Close first dialog
        setQrDialogOpen(true); // Open second dialog
        setQrImage(null);
      })
      .catch(err => {
        setError('Error sending number');
        setIsLoading(false); // Hide spinner when error occurs
      });
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Add New Number</button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Number</DialogTitle>
        <DialogContent>
          <TextField label="Number" value={number} onChange={e => setNumber(e.target.value)} />
          {error && <p>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)}>
        <DialogTitle>QR Code</DialogTitle>
        <DialogContent>
          {isLoading ? <CircularProgress /> : qrImage && <img src={`${qrImage}`} alt="QR" />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewnumberUnofficial;
