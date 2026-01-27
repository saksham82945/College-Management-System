
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/v1';

async function testFlow() {
    try {
        console.log('1. Testing Admin Login...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'admin@college.com',
            password: 'admin123'
        });

        if (!loginRes.data.success && !loginRes.data.message.includes('successful')) {
            console.error('Login Failed:', loginRes.data);
            return;
        }

        const token = loginRes.data.data.tokens.accessToken;
        console.log('Login Successful. Token received.');

        console.log('\n2. Fetching Teachers List...');
        const teachersRes = await axios.get(`${API_URL}/teachers`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Teachers API Response Status:', teachersRes.status);
        const teachers = teachersRes.data.data;

        if (!Array.isArray(teachers)) {
            console.error('Expected array of teachers, got:', typeof teachers);
            return;
        }

        console.log(`Found ${teachers.length} teachers.`);

        teachers.forEach((t, i) => {
            console.log(`\nTeacher [${i}]:`);
            console.log(`  ID: ${t._id}`);
            console.log(`  EmployeeId: ${t.employeeId}`);

            if (t.userId) {
                console.log(`  UserId Type: ${typeof t.userId}`);
                if (typeof t.userId === 'object') {
                    console.log(`  UserId.firstName: ${t.userId.firstName}`);
                    console.log(`  UserId.email: ${t.userId.email}`);
                } else {
                    console.error('  CRITICAL: userId is NOT an object (Population failed?)');
                    console.log('  Value:', t.userId);
                }
            } else {
                console.error('  CRITICAL: userId is NULL/UNDEFINED');
            }
        });

    } catch (error: any) {
        console.error('Test Failed:', error.response ? error.response.data : error.message);
    }
}

testFlow();
