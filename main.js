import puppeteer from "puppeteer";

await scrap("5ro4");

async function scrap(user) {
  const URL = `https://x.com/${user}`;

  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle2" });
  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await autoScroll(page);

  await scrapeSomething(page);

  await browser.close();
}

async function scrapeSomething(page) {
  const data = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll('div[data-testid="tweetText"]'),
      (e) => ({
        postTetx: e.innerText,
      }),
    );
  });

  console.log("This is Data: ", data);
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            let distance = 100;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

// const title = await page.title();
// console.log(`Titulo de la pagina: ${title}`);

// document.querySelectorAll('div[data-testid="tweetText"').innerText
