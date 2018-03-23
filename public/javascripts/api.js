let data = require('./data.js');
const mouse = require('./mouse.js');

const api = {
    handleRequest() {
        const reqSettings = new Request('/api', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'text/plain'
            })
        });
        const request = async () => {
            try {
                // Success handler
                const response = await fetch(reqSettings);
                data = await response.json();

                mouse.onMouseMovement(data);


            } catch (err) {
                // Error handler shows message in the DOM that the API request failed
            }

        }
        request();
    },
}

module.exports = api