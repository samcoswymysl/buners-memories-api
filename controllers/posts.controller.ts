import {NextFunction, Request, Response} from "express";
import {PostMessage} from "../models/postMessage";
import mongoose from "mongoose";
import {ValidationError} from "../handleError/handleError";
interface NewPostMessage {
    title: string;
    message: string;
    creator: string;
    tags: [string];
    likeCount?: number;
    createdAt?: Date;
    selectedFile: any;
}


export const getPosts = async (_req: Request, res: Response, next: NextFunction ) => {
    try{
        const postMessage = await PostMessage.find()


        res
            .status(200)
            .json(postMessage)

    } catch (e) {
        next(e)
    }
}



export const createPost = async(req: Request, res: Response, next: NextFunction) => {
    const {title, message, creator, tags, likeCount, createdAt, selectedFile} = req.body as NewPostMessage

    const newPost = new PostMessage({title, message, creator, tags, likeCount, createdAt, selectedFile})

    try {
        await newPost.save()


        res
            .status(201)
            .json(newPost)

    } catch (e) {
        next(e)
    }
}

export const updatePost  = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string
    const {title, message, creator, tags, likeCount, createdAt, selectedFile} = req.body as NewPostMessage

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new ValidationError('Id is incorrect', 404)
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(id, {title, message, creator, tags, likeCount, createdAt, selectedFile, _id: id}, {new: true} )

        res.json(updatedPost)

    }catch (e) {
        next(e)
    }

}


export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string

    try {

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new ValidationError('Id is incorrect', 404)
        }
        await PostMessage.findByIdAndRemove(id)

        res.json({message: 'Post deleted successful'})


    } catch (e) {
        next(e)
    }
}


export const likePost  = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new ValidationError('Id is incorrect', 404)
        }

        const post = await PostMessage.findById(id)

        if(post){

            const updatedPost = await  PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount! + 1}, {new: true})

            res.json(updatedPost)
        } else {
            throw new ValidationError('Cant find the post', 404)
        }



    }catch (e) {
        next(e)
    }

}
