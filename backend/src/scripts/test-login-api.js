"use strict";
// import fetch from 'node-fetch'; // Native fetch is available in Node 18+
const testLogin = async () => {
    const url = 'http://localhost:5001/api/v1/auth/login';
    const credentials = {
        email: 'admin@college.com',
        password: 'admin123'
    };
    console.log(`Attempting login to: ${url}`);
    console.log(`Credentials:`, credentials);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        console.log(`Response Status: ${response.status}`);
        console.log(`Response Body:`, JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error('Login request failed:', error);
    }
};
testLogin();
