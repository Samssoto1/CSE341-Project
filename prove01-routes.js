let user = ""; // I used this global variable to print out the additional name entered onto the /users route

const http = require('http');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    // return greeting text on "/"
    if (url === "/"){
        res.setHeader('Content-Type', 'text/html'); // This is used to tell browser we are sending HTML
        res.write('<html>');
        res.write("<head></head>")
        res.write("<body><h1>Greeting text!</h1>")
        res.write("<form method='POST' action='/create-user'><input type='text' name='username'><button type='submit'>Submit</button></form>")

        res.write("</body>")
        res.write('</html>');
        return res.end(); // Return not required since we do not have another path to be concerned of running afterwards. In this instance, return doesn't hurt.
    }
    // add the "/create-user" route and parse the incoming data and simply log it to the console
    if (url === "/create-user" && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            user = username; // update the global variable with the name entered
        });
        res.statusCode = 302; // Redirect status code
        res.setHeader('Location', '/'); // tells browser where to redirect to
        res.end();
    }
    // return list of dummy users on users
    if (url === "/users"){
        console.log(url);
        res.write('<html>');
        res.write("<head></head><body><ul><li>Sam</li><li>Bob</li><li>Steve</li>");
        // the global variable users is referenced here
        try{
            if(user != ""){
                res.write(`<li>${user}</li>`)
            }
        }
        catch{
        }
        res.write("</ul></body>");
        res.write('</html>');
    }
}

module.exports = requestHandler;
    
