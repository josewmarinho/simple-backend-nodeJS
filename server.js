const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require ("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoscape:  false,
  noCache: true
})

server.get("/", function (req, res) {
  const about = {
    avatar_url: "https://avatars1.githubusercontent.com/u/66637832?s=460&u=a5dd4ee6ca8f49dd2916f4e902026c16a2dc2244&v=4",
    name: "José Wellington",
    role: "Dev",
    description: "Desenvolvedor de web sites e aplicações moveis",
    link: [
      { name: "GitHub", url: "https://github.com/josewmarinho"},
      { name: "Instagram", url: "https://www.instagram.com/josewpmjr/"},
      { name: "Linkedin", url: "https://www.linkedin.com/in/jose-wellington-porto-marinho-2883521a5/"}
    ]
  }
  return res.render("about", { about })
})

server.get("/porti", function (req, res) {

  return res.render("porti",{ items: videos})
})

server.get("/video", function (req, res){
  const id = req.query.id

  const video = videos.find(function(video){
    return video.id == id   
  })

  if (!video) {
    return res.send("Video not found!")
  }

  return res.render("video", { item: video })
})

server.listen(5000, function () {
  console.log("server is running")
})