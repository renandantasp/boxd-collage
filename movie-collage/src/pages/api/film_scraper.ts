// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cheerio from 'cheerio'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const url = `https://letterboxd.com/${req.query.user}/films/diary/`
  const poster_api = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB}&query=`
  const response  = await fetch(url)
  const html = await response.text()
  const $ = cheerio.load(html)

  const entries = $('.diary-entry-row').toArray();

  const films = await Promise.all(
    entries.map(async (entry) => {
      const fullDay = $(entry).find('.td-day a').attr('href')
      const day = (fullDay === undefined ? '' : fullDay.slice(-11).substring(0, 10).replace(/\//g, '-'))
      const date = new Date(day).getTime()
      const film_name = $(entry).find('.headline-3 a').text()
      const rating = $(entry).find('.td-rating div span').text()

      return { film_name, rating, date }
    })
  )

  var now = new Date()
  const min_date = now.setMonth(now.getMonth() - Number(req.query.time))

  const collage_films = await Promise.all(
    films.filter( film => film.date > min_date).map(async (film) => {
      const inital_poster_path = "https://image.tmdb.org/t/p/original"
      const res = await fetch(`${poster_api}${film.film_name}`)
      const poster_path = await res.json()
      return {...film, poster_path:`${inital_poster_path}${poster_path.results[0].poster_path}`}
    })
  )
  
  res.status(200).json(collage_films)
}
