const axios = require('axios');
async function test() {
    try {
        const res1 = await axios.post('http://localhost:5000/api/v1/auth/login', {
            email: 'admin@college.com',
            password: 'admin123'
        });
        const token = res1.data.data.tokens.accessToken;
        console.log('Logged in!');
        const res2 = await axios.get('http://localhost:5000/api/v1/dashboard/admin', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Dashboard Data Success:', Object.keys(res2.data.data));
    } catch (e) {
        console.error('Error:', e.response?.data || e.message);
    }
}
test();
