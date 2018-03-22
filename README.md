# Portrets following mouse

Portrets from the city archive of Amsterdam follow the direction of the mouse by looking at it. The face position of the portrets is detected with the [Microsoft face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/).

![Example webapp](https://github.com/fennadew/performance-matters-server-side/blob/master/public/images/example.gif)

## Get started

* Run $ git clone https://github.com/fennadew/performance-matters-server-side.git in your terminal in the desired directory

* Create a new file called vars.env
In this file, add a SUB_KEY= with a valid key from [Microsoft face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/).
This webapp is based on the free key with 20 calls/minute. 

* run npm install & npm start to run everything.
App listens on port 8000.
