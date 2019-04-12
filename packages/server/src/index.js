require("@babel/polyfill"); // Required for async functions
require("dotenv").config(); // Load env variables
console.log(`$ echo $NODE_ENV\n${process.env.NODE_ENV}`);
require("./server"); // Load Server
