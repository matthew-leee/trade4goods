const fs = require('fs');
const puppeteer = require('puppeteer');
const cheerio = require("cheerio")

function extractItems() {
  
  const extractedElements = Array.from(document.querySelectorAll("#react-root > section > main > div > div > article > div > div > div"))
  const items = [];
  for (let element of extractedElements) {
    items.push(element.innerHTML);
  }
  return items;
}

async function scrapeInfiniteScrollItems(page,extractItems,scrollDelay = 1000) {
  let items = [];
  
  try {
    let previousHeight;
    let count = 1;
    let itemTargetCount = await page.evaluate('document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(1) > a > span").innerText')
    while (items.length < Number(itemTargetCount)) {
      temp = await page.evaluate(extractItems);
      for (let tem of temp){
        const $ = cheerio.load(tem);
         $("img").each((i, u)=>{
          let src = $(u).attr("src");
          let alt = $(u).attr("alt");
          let obj = {src: src,alt: alt};
          let boo = items.some((u)=>{
            return u.src == src
          });
          if (!boo){
            items.push(obj)
          }
          console.log (items)
        })
      }
      fs.writeFileSync("checkItems.json", JSON.stringify(items), "utf8")
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate(`window.scrollTo(0, ${count*500})`);
      count++
      await page.waitFor(scrollDelay);
    }
  } catch(e) {
    console.log (`err: ${e}`)
  }
  return items;
}

(async () => {
  // Set up browser and page.
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 1000 });

  // Navigate to the demo page.
  await page.goto('https://www.instagram.com/hiavmy/');

  // Scroll and extract items from the page.
  const items = await scrapeInfiniteScrollItems(page, extractItems);

  // Save extracted items to a file.
  fs.writeFileSync('./items.txt', items.join('\n') + '\n');

  // Close the browser.
  await browser.close();
})();