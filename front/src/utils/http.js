import axios from "axios";
import jwtDecode from 'jwt-decode';

const http = axios.create({
    baseURL: "http://localhost:3000/api",
});

http.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    const tenantID = localStorage.getItem('tenantID');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    config.headers.tenantID =  tenantID ? tenantID : '';
    
    if (token) {
        try {
            const decoded = jwtDecode(token);
            // extract your user id
            const userId = decoded.iduser; 
            console.log('User ID:', userId);
            config.headers.userId =  userId ? userId : '';
        } catch (error) {
            console.log('Invalid JWT Token:', error);
        }
    }
    return config;
});

export default http;
