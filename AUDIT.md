## Perfomance
1. Added Gzip
added node module "compression" middleware for Node.js Express. The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options. 
Improves paint with 0.04sec and usable page with 0.12 sec on slow 3G.

<b>Before</b>
![Example webapp](https://github.com/fennadew/performance-matters-server-side/blob/master/public/images/voor.png)

<b>After</b>
![Example webapp](https://github.com/fennadew/performance-matters-server-side/blob/master/public/images/na.png)
