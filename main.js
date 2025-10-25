import puppeteer from 'puppeteer';
import { supabase } from './supabaseclient.js';

(async () => {
  const URL = "https://x.com/5ro4";

  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  await page.goto(URL, { waitUntil: "networkidle2" });

  const title = await page.title();
  console.log(`Titulo de la pagina: ${title}`);

  // Esperar a que carguen los tweets
  await page.waitForSelector('article[data-testid="tweet"]', { timeout: 10000 });

  // Scroll para cargar contenido
  await page.evaluate(() => window.scrollTo(0, 2000));

  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => window.scrollTo(0, 2000));
  }

  const post = await page.evaluate(() => {
    const articles = Array.from(
      document.querySelectorAll('article[data-testid="tweet"]')
    );

    //  (implicit return)
    return articles.map(article => ({
      text: article.querySelector('div[data-testid="tweetText"]')?.innerText || 'Sin texto',
      images: Array.from(article.querySelectorAll('div[data-testid="tweetPhoto"] img'))
        .map(img => img.src),
      videos: Array.from(article.querySelectorAll('div[data-testid="videoComponent"] img'))
        .map(img => img.src)
    }));
  });

  console.log('Total de posts:', post.length);
  console.log(post);

  await browser.close();
})();



// document.querySelectorAll('div[data-testid="tweetText"').innerText

/*
Intercepta la respuesta de el video y converti la playlist en un video con fmpeg
*/