const axios = require('axios');
const cheerio = require('cheerio');

// Define the endpoint URL
const endpointUrl = 'http://94.237.56.188:32525/index.php';

// Define the request headers
const headers = {
    'Host': '94.237.56.188:32525',
    'Content-Length': '24',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'Origin': 'http://94.237.56.188:32525',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.5249.62 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Referer': 'http://94.237.56.188:32525/',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Connection': 'close'
};

// Define the request data
const requestData = 'username=admin&msg=heloo';

// Function to make the request
async function makeRequest() {
    try {
        // Make a POST request to the endpoint
        const response = await axios.post(endpointUrl, requestData, { headers });

        // Load the HTML response into Cheerio
        const $ = cheerio.load(response.data);

        // Extract the content of the script tag
        const scriptContent = $('script').html();

        // Find and extract the value from the script tag
        const match = scriptContent.match(/alert\("(.*)"\);/);
        const result = match ? match[1] : null;

        // Print the result
        console.log('Result:', result);
    } catch (error) {
        // If there's an error, print it
        console.error('Error:', error.message);
    }
}

// Call the makeRequest function
makeRequest();
