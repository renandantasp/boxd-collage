import generateCollage from "./generate_collage/index.js";
import express from "express"


const app = express()

app.get('/collage', async (req,res) => {
  const img_tag = await generateCollage(req.query.user,req.query.time,req.query.size,true)
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': img_tag.length
  });
  res.end(img_tag);

})

app.listen(4000)