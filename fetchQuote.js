const axios = require('axios');
const fs = require('fs');
const path = require('path');

const quotesFilePath = path.join(__dirname, 'quotes.json');

const fetchQuote = async () => {
  try {
    const previousQuotes = JSON.parse(fs.readFileSync(quotesFilePath, 'utf8'));
    let quote = '';
    let isUnique = false;
    let attempt = 0;

    while (!isUnique) {
      attempt += 1;
      console.log(`Attempt ${attempt}`);

      const response = await axios.get('https://favqs.com/api/quotes', {
        // params: {
        //   filter: 'life',
        //   type: 'tag'
        // },
        headers: {
          'Authorization': 'Token token="PUT YOUR TOKEN HERE"'
        }
      });

      if (response.data && response.data.quotes && response.data.quotes.length > 0) {
        quote = response.data.quotes[0].body;
        if (!previousQuotes.includes(quote)) {
          isUnique = true;
        }
      } else {
        console.log('No quotes found in the response, trying again...');
      }
    }

    // Add the new quote to the list of previous quotes
    previousQuotes.push(quote);
    fs.writeFileSync(quotesFilePath, JSON.stringify(previousQuotes, null, 2), 'utf8');

    return quote;
  } catch (error) {
    console.error('Error fetching quote:', error);
    return 'Life is full of sorrows, but it is also full of beauty.';
  }
};

module.exports = fetchQuote;
