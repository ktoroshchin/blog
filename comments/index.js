const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const PORT = '4001'
const app = express()

let commentsByPostId = {}

app.use(cors())
app.use(bodyParser.json())

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

//comment create
app.post('/posts/:id/comments', async(req, res) => {
    const commentId = randomBytes(4).toString('hex') 
    const { content } = req.body   

    const comments = commentsByPostId[req.params.id] || []
    comments.push({ id: commentId, content: content, status: 'pending'})
    commentsByPostId[req.params.id] = comments

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments)
})

app.post('/events', async(req, res) => {
    const { type, data } = req.body
    
    if(type === 'CommentModerated') {
        const { postId, id, status, content } = data
        const comments = commentsByPostId[postId]

        const comment = comments.find(comment => {
            return comment.id === id
        })
        comment.status = status
    

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                content,
                postId
            }
        })

    }

    res.send({})
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))