const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res) {
    const about = {
        avatar_src: "./assets/img/rodney_mullen.png",
        name: "Rodney Mullen",
        role: "Professional Skateboarder",
        description: "Just a simple fanpage in honor of this great inventor!",
        links: [
            { name: "Github", url: "https://github.com/TedMartins" },
            { name: "Twitter", url: "https://twitter.com/TedMartins_" },
            { name: "Linkedin", url: "https://linkedin.com/in/TedMartins" }
        ]
    }

    return res.render('about', {about})
})

server.get('/videos', function(req, res) {

    return res.render('videos', { items: videos })
})

server.get('/player', function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send('Video not found!')
    }

    return res.render('player', { item: video })
})

server.listen(5000, function() {
    console.log('server is running')
})