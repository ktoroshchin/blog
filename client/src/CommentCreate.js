import * as React from 'react'
import axios from 'axios'

export const CommentCreate = ({ postId }) => {
    const [content, setContent] = React.useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
            content
        })

        if(response.status === 201){
            setContent('')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>New Comment</label>
                    <input value={content} onChange={(e) => setContent(e.target.value)} className='form-control'/>
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}