// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createCanvas, loadImage } from 'canvas'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const mainUrl = (process.env.enviroment === "production" ? process.env.productionUrl : process.env.devUrl)

  const response = await fetch(`${mainUrl}api/film_scraper?user=${req.query.user}&time=${req.query.time}`)
  const collage_films = await response.json()

  if (collage_films.length == 0) {
    res.status(500).send({ error: 'No films to display' });
  }

  const size = Number(req.query.size)
  const films = (collage_films.length > size*size) ? collage_films.slice(0,size*size) : collage_films
  const width = 150
  const height = width*1.5
  const font_size = 10

  const canvas = createCanvas(width*size, height*size)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = "black"
  ctx.fillRect(0,0,width*size,height*size)
  ctx.fillStyle = "white"
  ctx.font = "12px Courier New";
  ctx.lineWidth = 2;
  
  let film_index = 0
  
  for (let i=0; i < size; i++){
    for (let j=0; j< size && film_index < films.length; j++){
      const image = await loadImage(films[film_index].poster_path)
      ctx.drawImage(image, width*j, height*i, width, height)
      
      const grd = ctx.createLinearGradient(0, i*height, 0, (i*height)+height)
      grd.addColorStop(0, "#00000070");
      grd.addColorStop(0.25, "transparent");
      grd.addColorStop(1, "transparent");

      ctx.fillStyle = grd;
      ctx.fillRect(width*j, height*i, width, height);

      ctx.fillStyle = 'white';
      ctx.fillText(films[film_index].film_name, (width*j)+5, (height*i)+font_size+5,width)
      
      ctx.fillStyle = "#00e054"
      ctx.fillText(films[film_index].rating, (width*j)-4, (height*i)+(font_size*2.25)+5,width)
      
      film_index = film_index + 1
    }
  }

  const dataURL = canvas.toDataURL('image/jpeg');
  res.status(200).send({src:dataURL});
}
