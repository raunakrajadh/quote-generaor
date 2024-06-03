const fetchQuote = require('./fetchQuote');
const generateHtml = require('./generateHtml');
const generateImage = require('./generateImage');

const runApp = async () => {
  const quote = await fetchQuote();
  generateImage(quote);
};

runApp();
module.exports = {runApp};