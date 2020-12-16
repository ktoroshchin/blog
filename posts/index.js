const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const PORT = '4000'
const app = express()

let posts = {}

app.use(cors())
app.use(bodyParser.json())

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async(req, res) => {
    const id = randomBytes(4).toString('hex') 
    const { title } = req.body   

    posts[id] = {
       title, id
    }

    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })

    res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {

    res.send({})
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
