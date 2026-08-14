import express from 'express'
import { addcomment, commentCount, deleteComment, getAllComments, getComments } from '../controllers/Comment.controller.js'
// import { authenticate } from '../middleware/authenticate.js'

const CommentRoute = express.Router()

CommentRoute.post('/add', addcomment)
CommentRoute.get('/get/:blogid', getComments)
CommentRoute.get('/get-count/:blogid', commentCount)
CommentRoute.get('/get-all-comment', getAllComments)
CommentRoute.delete('/delete/:commentid', deleteComment)


export default CommentRoute