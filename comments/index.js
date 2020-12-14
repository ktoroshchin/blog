const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')

const PORT = '4001'
const app = express()

let commentsByPostId = {}

app.use(bodyParser.json())

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex') 
    const { content } = req.body   

    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id: commentId, content: content})
    commentsByPostId[req.params.id] = comments

    res.status(201).send(comments)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))