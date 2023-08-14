import React, { useState, useEffect } from 'react';
import { List, ListItem, Divider, Switch, Button, Dialog, DialogActions, DialogContent, TextField, DialogTitle } from '@mui/material';
import http from '../utils/http';

const Integrations = () => {
    const defaultIntegrations = [
        { name: "Whatsapp Unofficial", token: '' },
        { name: "Whatsapp Official", token: '', accId: '' },
        { name: "Facebook", token: '' },
        { name: "School", token: '' },
        { name: "Zoho", token: '' }
    ];
    const [integrations, setIntegrations] = useState(defaultIntegrations);
    const [currentIntegration, setCurrentIntegration] = useState(null);
    const [open, setOpen] = useState(false);
    const [tokenInput, setTokenInput] = useState('');
    const [accIdInput, setAccIdInput] = useState('');

    useEffect(() => {
        const fetchIntegrations = async () => {
            try {
                const response = await http.get('/integrations');
                if (response.data && response.data.length > 0) {
                    const updatedIntegrations = defaultIntegrations?.map(defaultInt => {
                        const fetchedInt = response.data.find(int => int.name === defaultInt.name);
                        return fetchedInt || defaultInt;
                    });
                    setIntegrations(updatedIntegrations);
                }
            } catch (error) {
                console.error('Error fetching integrations:', error);
            }
        };

        fetchIntegrations();
    }, []);

    const handleClickOpen = (index) => {
        setCurrentIntegration(index);
        setTokenInput(integrations[index].token);
        setAccIdInput(integrations[index].accId || '');
        setOpen(true);
    };

    const handleSave = async () => {
        const newIntegrations = [...integrations];
        newIntegrations[currentIntegration].token = tokenInput;
        if (newIntegrations[currentIntegration].name === "Whatsapp Official") {
            newIntegrations[currentIntegration].accId = accIdInput;
        }
        setIntegrations(newIntegrations);

        const integrationData = {
            name: newIntegrations[currentIntegration].name,
            token: tokenInput,
            accId: newIntegrations[currentIntegration].accId
        };

        try {
            await http.put('/integrations', integrationData);
            setOpen(false);
        } catch (error) {
            console.error('There was a problem with the POST operation:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const encryptToken = (token) => {
        return token.replace(/./g, '*');
    };

    return (
        <List>
            {integrations.map((integration, index) => (
                <div key={index}>
                    <ListItem>
                        {integration.name}
                        <Switch edge="end" checked={integration.token !== ''} />
                        <Button variant="contained" color="primary" onClick={() => handleClickOpen(index)}>
                            Manage
                        </Button>
                    </ListItem>
                    {index !== integrations.length - 1 && <Divider />}
                </div>
            ))}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Token"
                        type="text"
                        fullWidth
                        value={tokenInput}
                        onChange={(e) => setTokenInput(e.target.value)}
                        placeholder={integrations[currentIntegration]?.token ? encryptToken(integrations[currentIntegration].token) : ''}
                    />
                    {integrations[currentIntegration]?.name === "Whatsapp Official" && (
                        <TextField
                            margin="dense"
                            label="AccId"
                            type="text"
                            fullWidth
                            value={accIdInput}
                            onChange={(e) => setAccIdInput(e.target.value)}
                            placeholder={integrations[currentIntegration]?.accId || ''}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </List>
    );
}

export default Integrations;
