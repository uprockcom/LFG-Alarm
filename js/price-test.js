// Function to fetch current bitcoin price from CoinGecko API
async function getCurrentPrice() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    return data.bitcoin.usd;
  }
  
  // Function to display current bitcoin price on the webpage
  async function displayCurrentPrice() {
    const currentPrice = await getCurrentPrice();
    const bitcoinPriceElem = document.querySelector('.bitcoin-price');
    bitcoinPriceElem.textContent = currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  
  // Function to check and update displayed bitcoin price every minute
  async function checkAndUpdatePrice() {
    const currentPrice = await getCurrentPrice();
    const bitcoinPriceElem = document.querySelector('.bitcoin-price');
    const currentPriceStr = currentPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  
    if (currentPrice === 1000000) {
      // Trigger browser notification if price equals $1 million USD
      const notification = new Notification('Bitcoin Price Alert', {
        body: `The price of Bitcoin is now $1 million USD!`
      });
    }
  
    console.log(`Current Bitcoin Price: ${currentPriceStr}`);
    bitcoinPriceElem.textContent = currentPriceStr;
  }
  
  // Display current bitcoin price on page load
  displayCurrentPrice();
  
  // Check and update displayed bitcoin price every minute
  setInterval(checkAndUpdatePrice, 60000);
  