
const puppeteer = require('puppeteer');

module.exports = async function getData(key) {
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const page = await browser.newPage();
  await page.goto(`https://shopee.com.br/search?keyword=${key}&page=${0}`, {
    waitUntil: 'networkidle2'
  });
    
  const getData = await page.evaluate(async () => {
    
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    const distance = 1000;
    const delay = 500;

    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await sleep(delay);
    }

    const getCard = document.getElementsByClassName('shopee-search-item-result__item');

    const arr = [];

    getCard.forEach(e => {
      const pd = e.querySelector('._36CEnF');
      const pc = e.querySelector('._4jGuyf') || e.querySelector('._29R_un');
      const a = e.querySelector('a');
      const img = e.querySelector('.mxM4vG');
      const keySearch = document.querySelector('.shopee-searchbar-input__input').value.toLowerCase().split(' ');

      if (pc !== null && img.src !== "" && keySearch.every((el) => pd.innerHTML.toLowerCase().indexOf(el) > -1)) {
        arr.push({
          id: Date.now() + Math.round(Math.random() * 1000000),
          produto: pd.innerHTML,
          link: a.href,
          image: img.src,
          preco: pc.innerHTML
        })
      }
    })

    return arr;
  })

  await browser.close();

  return getData;

};
