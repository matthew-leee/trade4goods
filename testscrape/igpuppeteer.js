const { promisify } = require('util');
const fs = require('fs');
const readFile = promisify(fs.readFile)
const puppeteer = require('puppeteer');
const cheerio = require("cheerio")
const request = require("request")

function extractItems() {

  const extractedElements = Array.from(document.querySelectorAll("#react-root > section > main > div > div > article > div > div > div"))
  const items = [];
  for (let element of extractedElements) {
    items.push(element.innerHTML);
  }
  return items;
}

async function scrapeInfiniteScrollItems(page, extractItems, scrollDelay = 1000, ac) {
  let items = [];

  try {
    let previousHeight;
    let count = 1;
    let itemTargetCount = await page.evaluate('document.querySelector("#react-root > section > main > div > header > section > ul > li:nth-child(1) > a > span").innerText')
    itemTargetCount = itemTargetCount.replace(/\,/g,'')
    console.log (itemTargetCount)
    while (items.length < Number(itemTargetCount)) {
      temp = await page.evaluate(extractItems);
      for (let tem of temp) {
        const $ = cheerio.load(tem);
        $("img").each((i, u) => {
          let src = $(u).attr("src");
          let alt = $(u).attr("alt");
          let obj = { src: src, alt: alt };
          let boo = items.some((u) => {
            return u.src == src
          });
          if (!boo) {
            items.push(obj)
          }
          console.log(`Scraping...${count}`)
        })
      }
      if (!fs.existsSync(`./ac/${ac}`)) {
        await fs.mkdirSync(`./ac/${ac}`);
      }
      fs.writeFileSync(`./ac/${ac}/${ac}.json`, JSON.stringify(items), "utf8")
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate(`window.scrollTo(0, ${count * 900})`);
      count++
      await page.waitFor(scrollDelay);
    }
  } catch (e) {
    console.log(`err: ${e}`)
  }
  return items;
}

const startScraping = async (ac) => {
  // Set up browser and page.
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 1000 });

  // Navigate to the demo page.
  await page.goto(`https://www.instagram.com/${ac}/`);

  // Scroll and extract items from the page.
  const items = await scrapeInfiniteScrollItems(page, extractItems, 1000, ac);

  console.log(`ac of ${ac} has been scraped!`)

  // Close the browser.
  await browser.close();
}

const grabPhotos = async (ac) => {
  await startScraping(ac);
  let json = await readFile(`./ac/${ac}/${ac}.json`, "utf8");
  let srcs = JSON.parse(json).map((u) => {
    return u.src
  });
  for (let i = 0; i < srcs.length; i++) {
    if (!fs.existsSync(`./ac/${ac}/img`)) {
      await fs.mkdirSync(`./ac/${ac}/img`);
    }
    await request(srcs[i]).pipe(fs.createWriteStream(`./ac/${ac}/img/${ac}_${i+1}.jpg`))
  }
}

grabPhotos("renciysw")