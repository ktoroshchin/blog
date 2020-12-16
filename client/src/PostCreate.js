
import * as React from 'react'
import axios from 'axios'

export const PostCreate = () => {
    const [title, setTitle] = React.useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await axios.post('http://localhost:4000/posts', {
            title
        })

        if(response.status === 201) {
            setTitle('')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Title</label>
                    <input className='form-control' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <button className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}