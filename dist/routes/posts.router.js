"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const posts_controller_1 = require("../controllers/posts.controller");
exports.postRouter = express_1.default.Router();
exports.postRouter
    .get('/', posts_controller_1.getPosts)
    .post('/', posts_controller_1.createPost)
    .patch('/:id', posts_controller_1.updatePost)
    .delete('/:id', posts_controller_1.deletePost)
    .patch('/:id/like', posts_controller_1.likePost);
//# sourceMappingURL=posts.router.js.map