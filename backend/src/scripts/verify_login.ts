
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/v1';

async function verifyLogin() {
    try {
        console.log('Testing Admin Login (admin@college.com / admin123)...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@college.com',
            password: 'admin123'
        });

        if (loginRes.data.message === 'Login successful') {
            console.log('✅ LOGIN SUCCESSFUL');
            console.log('Token:', loginRes.data.data.tokens.accessToken.substring(0, 20) + '...');
        } else {
            console.log('❌ LOGIN FAILED (Unexpected response)');
            console.log(loginRes.data);
        }
    } catch (error: any) {
        console.error('❌ LOGIN FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

verifyLogin();
