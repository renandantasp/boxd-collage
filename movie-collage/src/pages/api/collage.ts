import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from "puppeteer-core";



const width = 250;
const height = width * 1.5;
const font_size = 10;

interface Film {
  poster_path: string;
  film_name: string;
  rating: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mainUrl =
    process.env.enviroment === 'production'
      ? process.env.productionUrl
      : process.env.devUrl;

  const response = await fetch(
    `${mainUrl}api/film_scraper?user=${req.query.user}&time=${req.query.time}`
  );
  const collage_films = await response.json();

  if (collage_films.length === 0) {
    return res.status(500).send({ error: 'No films to display' });
  }

  const size = Number(req.query.size);
  const films = collage_films.slice(0, size * size);

  var html = `<html>
  <div style="display:flex; flex-direction: row; align-items: flex-start; width:${size*width};height:${size*height}; flex-wrap: wrap; padding: 0px; margin: 0px; background:black">`
  
  const content =  films.map((film:Film, index:number) =>{
    const i = Math.floor(index / size);
    html = html + 
    `<div style="width: ${width}px;padding: 0px;margin: 0px;">
    <div style="position:absolute; top:${(height*i)+8}px">
      <img width="${width}px"  src="${film.poster_path}" alt=${film.film_name}/>
    </div>
    <div style="width: ${width}px; background-image: linear-gradient(to bottom, #00000077, transparent); height: 200px; position:absolute; top:${(height*i)+8}px">
      <p style="color: white; margin:0;padding-top:5px;padding-left:5px;padding-bottom:0px; font-family: monospace;">${film.film_name}</p>
      <p style="color: #00e054; vertical-align:top; margin:0;padding-left:3px;padding-top:0px">${film.rating}</p>
    </div>
  </div>`
  })

  html = html + "</div></html>"


  const browser = await puppeteer.connect({ 
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.browserlessKey}` 
  })
  const page = await browser.newPage();

  await page.setContent(html);

  const screenshot = await page.screenshot({
    type: 'png', // or 'jpeg'
    encoding: 'base64',
    clip: {
      x: 10,
      y: 10,
      width: (width*size)-10,
      height: (height*size)-10,
    },
  });

  await page.close();
  await browser.close();

  res.status(200).send({src:`data:image/png;base64,${screenshot}`})
}
