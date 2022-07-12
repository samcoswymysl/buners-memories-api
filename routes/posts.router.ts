import express from 'express'
import {createPost, deletePost, getPosts, likePost, updatePost} from "../controllers/posts.controller";


export const postRouter = express.Router()

postRouter
    .get('/', getPosts)
    .post('/', createPost)
    .patch('/:id', updatePost)
    .delete('/:id', deletePost)
    .patch('/:id/like', likePost)
