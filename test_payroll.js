const axios = require('axios');

async function testPayrollData() {
    try {
        console.log('Logging in as Admin...');
        const loginRes = await axios.post('http://localhost:5000/api/v1/auth/login', {
            email: 'admin@college.com',
            password: 'admin123' // Or whatever default password is. Let me read from LOGIN_CREDENTIALS.md or just try admin123
        });

        const token = loginRes.data.token;
        console.log('Login successful. Token acquired.');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        console.log('Fetching teachers...');
        const teachersRes = await axios.get('http://localhost:5000/api/v1/teachers', config);
        console.log(`Teachers fetched successfully: ${teachersRes.data.data.length} records found.`);

        console.log('Fetching staff...');
        const staffRes = await axios.get('http://localhost:5000/api/v1/staff', config);
        console.log(`Staff fetched successfully: ${staffRes.data.data.length} records found.`);

    } catch (error) {
        if (error.response) {
            console.error('API Error:', {
                url: error.response.config.url,
                status: error.response.status,
                data: error.response.data
            });
        } else {
            console.error('Network or other error:', error.message);
        }
    }
}

testPayrollData();
