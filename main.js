import puppeteer from 'puppeteer';
import pLimit from 'p-limit';
import { supabase } from './supabaseclient.js';

(async () => {

  const URL = "https://monsnode.com/?ranking=1&period=24h";

  const browser = await puppeteer.launch({
    headless: false
  })

  const page = await browser.newPage();

  await page.goto(URL, {waitUntil: "networkidle2"})

  const title = await page.title();
  console.log(`Titulo de la pagina, ${title}`);
  
//   const links = await page.evaluate(() =>
//   Array.from(document.querySelectorAll('.listn a'), a => a.href)
// ).then(arr => arr.filter(h => h.startsWith('http')));

// // 2. Limitás la concurrencia a 10
// const limit = pLimit(2);

// // 3. Función que entra, saca el src y cierra
// const scrapeVideo = async (url) => {
//   const p = await browser.newPage();
//   await p.goto(url, { waitUntil: 'domcontentloaded' });
//   const src = await p.evaluate(() => 
//     document.querySelector('a')?.href || null
//   );
//   await p.close();
//   return { url, src };
// };

// // 4. Ejecutás todo en paralelo (máx. 10 a la vez)
// const results = await Promise.all(links.map(l => limit(() => scrapeVideo(l))));

// results.map(e => {
//   const UploadVideos = async () => {
//     const uniqueId = "id" + Math.random().toString(16).slice(2);
// const { error } = await supabase.from('videos').upsert([
//         { 
//           id: uniqueId,
//           title: `Video${uniqueId}`,
//           subreddit: `unknow`,
//           url: e.src,
//           type: 'video',
//           created_utc: Math.floor(Date.now() / 1000)
//         }
//       ], { onConflict: ['id'] });
  
//    if (error) console.error('Error al insertar en DB:', error);
//   }
//   UploadVideos();
// }
// )

// console.log(results);
// console.log(results.length);
// await browser.close();

})();