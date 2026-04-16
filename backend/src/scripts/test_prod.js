const axios = require('axios');
const BASE = 'https://college-management-system-backend-e4ki.onrender.com/api/v1';

async function testProd() {
    try {
        console.log('[1] Testing /health...');
        const h = await axios.get('https://college-management-system-backend-e4ki.onrender.com/health', { timeout: 15000 });
        console.log('[1] Health:', h.data);

        console.log('[2] Testing login...');
        const l = await axios.post(`${BASE}/auth/login`, { email: 'admin@college.com', password: 'admin123' }, { timeout: 15000 });
        const token = l.data.data.tokens.accessToken;
        console.log('[2] Login: OK, token length:', token.length);

        const headers = { Authorization: `Bearer ${token}` };

        console.log('[3] Testing /students...');
        const s = await axios.get(`${BASE}/students`, { headers, timeout: 15000 });
        const students = s.data.data?.students || [];
        console.log('[3] Students:', students.length);

        console.log('[4] Testing /teachers...');
        const t = await axios.get(`${BASE}/teachers`, { headers, timeout: 15000 });
        console.log('[4] Teachers:', (t.data.data || []).length);

        console.log('[5] Testing /staff...');
        const st = await axios.get(`${BASE}/staff`, { headers, timeout: 15000 });
        console.log('[5] Staff:', (st.data.data || []).length);

        console.log('[6] Testing /dashboard/admin...');
        const d = await axios.get(`${BASE}/dashboard/admin`, { headers, timeout: 15000 });
        console.log('[6] Dashboard:', d.data.success ? 'OK' : 'FAILED');
        console.log('    Students:', d.data.data?.totalStudents, '| Teachers:', d.data.data?.totalTeachers);

        console.log('\nALL PRODUCTION TESTS PASSED!');
    } catch(e) {
        const status = e.response?.status;
        const data = e.response?.data;
        console.error(`ERROR (status ${status}):`, typeof data === 'string' ? data.substring(0, 200) : JSON.stringify(data));
        console.error('Message:', e.message);
    }
}

testProd();
