# SucharJS
Javascript module that returns a random suchar. This is a a simple web crawler using data from the website piszsuchary.pl.

### Installation
```
npm install https://github.com/lakowalski/suchar
```

### Simple usage
Function returns a `Promise` object. Fulfilled promise will contain a random suchar.
```javascript
var suchar = require("sucharjs");
suchar().then(console.log).catch(console.log).done();
```