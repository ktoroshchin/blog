import * as React from 'react'

export const CommentList = ({ comments }) => {
    const renderComments =  comments.map(comment => {
        let content
        
        switch(comment.status) {
            case 'approved':
                content = comment.content
                break
            case 'rejected':
                content = 'This comment was rejected'
                break
            case 'pending':
                content = 'This comment is waiting for moderation'
                break
            default:
                content = ''
        }
        
        return (
            <li key={comment.id}>{content}</li>
        )
    })

    return (
        <ul>{renderComments}</ul>
    )
}