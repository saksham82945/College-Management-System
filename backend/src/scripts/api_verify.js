const axios = require('axios');
const BASE = 'http://localhost:5000/api/v1';

async function apiTest() {
    try {
        // Login as admin
        const loginRes = await axios.post(`${BASE}/auth/login`, {
            email: 'admin@college.com',
            password: 'admin123'
        });
        const token = loginRes.data.data.tokens.accessToken;
        const headers = { Authorization: `Bearer ${token}` };
        console.log('LOGIN: OK');

        // Test students API
        const studentsRes = await axios.get(`${BASE}/students`, { headers });
        const students = studentsRes.data.data.students || [];
        console.log(`STUDENTS API: OK - ${students.length} students returned`);
        for (const s of students) {
            console.log(`  - ${s.name} | ${s.rollNo} | ${s.course} | Sem ${s.semester} | Sec ${s.section}`);
        }

        // Test teachers API
        const teachersRes = await axios.get(`${BASE}/teachers`, { headers });
        const teachers = teachersRes.data.data || [];
        console.log(`\nTEACHERS API: OK - ${teachers.length} teachers returned`);
        for (const t of teachers) {
            console.log(`  - ${t.userId?.fullName} | ${t.employeeId} | ${t.designation}, ${t.department}`);
        }

        // Test staff API
        const staffRes = await axios.get(`${BASE}/staff`, { headers });
        const staff = staffRes.data.data || [];
        console.log(`\nSTAFF API: OK - ${staff.length} staff returned`);
        for (const s of staff) {
            console.log(`  - ${s.userId?.fullName} | ${s.employeeId} | ${s.role}, ${s.department}`);
        }

        // Test dashboard
        const dashRes = await axios.get(`${BASE}/dashboard/admin`, { headers });
        const d = dashRes.data.data;
        console.log(`\nDASHBOARD API: OK`);
        console.log(`  Total Students: ${d.totalStudents}`);
        console.log(`  Total Teachers: ${d.totalTeachers}`);

        console.log('\nALL API TESTS PASSED!');
    } catch(e) {
        console.error('API ERROR:', e.response ? JSON.stringify(e.response.data) : e.message);
    }
}

apiTest();
