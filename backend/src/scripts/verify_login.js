"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const verifyLogin = async () => {
    try {
        const credentials = {
            email: 'admin@college.com',
            password: 'admin123',
            role: 'ADMIN'
        };
        console.log('Attempting login with:', credentials);
        const response = await axios_1.default.post('http://localhost:5001/api/v1/auth/login', credentials);
        console.log('Login successful!');
        console.log('Status:', response.status);
        console.log('User:', response.data.data.user);
    }
    catch (error) {
        console.error('Login failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }
        else {
            console.error('Error:', error.message);
        }
    }
};
verifyLogin();
