const http = require('http');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/students',
  method: 'GET',
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    try {
        const json = JSON.parse(data);
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`TOTAL STUDENTS RETURNED: ${json.data?.total || 0}`);
        const inactive = json.data?.students?.filter(s => s.status === 'inactive');
        console.log(`INACTIVE STUDENTS IN RESPONSE: ${inactive?.length || 0}`);
    } catch(e) {
        console.log("Error parsing response", data.substring(0, 50));
    }
  });
});

req.on('error', error => console.error(error));
req.end();
