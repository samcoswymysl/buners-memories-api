"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = void 0;
const postMessage_1 = require("../models/postMessage");
const mongoose_1 = __importDefault(require("mongoose"));
const handleError_1 = require("../handleError/handleError");
const getPosts = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postMessage = yield postMessage_1.PostMessage.find();
        res
            .status(200)
            .json(postMessage);
    }
    catch (e) {
        next(e);
    }
});
exports.getPosts = getPosts;
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, message, creator, tags, likeCount, createdAt, selectedFile } = req.body;
    const newPost = new postMessage_1.PostMessage({ title, message, creator, tags, likeCount, createdAt, selectedFile });
    try {
        yield newPost.save();
        res
            .status(201)
            .json(newPost);
    }
    catch (e) {
        next(e);
    }
});
exports.createPost = createPost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, message, creator, tags, likeCount, createdAt, selectedFile } = req.body;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new handleError_1.ValidationError('Id is incorrect', 404);
        }
        const updatedPost = yield postMessage_1.PostMessage.findByIdAndUpdate(id, { title, message, creator, tags, likeCount, createdAt, selectedFile, _id: id }, { new: true });
        res.json(updatedPost);
    }
    catch (e) {
        next(e);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new handleError_1.ValidationError('Id is incorrect', 404);
        }
        yield postMessage_1.PostMessage.findByIdAndRemove(id);
        res.json({ message: 'Post deleted successful' });
    }
    catch (e) {
        next(e);
    }
});
exports.deletePost = deletePost;
const likePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new handleError_1.ValidationError('Id is incorrect', 404);
        }
        const post = yield postMessage_1.PostMessage.findById(id);
        if (post) {
            const updatedPost = yield postMessage_1.PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
            res.json(updatedPost);
        }
        else {
            throw new handleError_1.ValidationError('Cant find the post', 404);
        }
    }
    catch (e) {
        next(e);
    }
});
exports.likePost = likePost;
//# sourceMappingURL=posts.controller.js.map