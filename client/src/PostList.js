import * as React from 'react'
import axios from 'axios'
import './PostList.css'
import { CommentCreate } from './CommentCreate'
import { CommentList} from './CommentList'

export const PostList = () => {
    const [posts, setPosts] = React.useState({})

    const getPosts = async() => {
        const response = await axios.get('http://localhost:4002/posts')
        if(response.data) {
            setPosts(response.data)
        }
    }

    React.useEffect(() => {
        getPosts()
    },[])

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div 
                key={post.id}
                className='post-card'
            >
                <div className='post-card-body'>
                    <h3 style={{fontWeight: 'bold'}}>{post.title}</h3>
                    <CommentList comments={post.comments}/>
                    <CommentCreate postId={post.id} />
                </div> 
            </div>
        )
    })


    return ( 
        <div className='posts-container'>
            {renderedPosts}
        </div>
    )
}