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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const mongoose_1 = __importDefault(require("mongoose"));
const posts_router_1 = require("./routes/posts.router");
const PORT = process.env.PORT || 5000;
const server = (0, express_1.default)();
server.use(body_parser_1.default.json({ limit: '30mb' }));
server.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
server.use((0, cors_1.default)());
server.use('/posts', posts_router_1.postRouter);
server.get('/', (_req, res) => {
    res.send('Hello to memories api');
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.MONGO_URL);
        server.listen(PORT, 'localhost', () => console.log(`Server listen on port ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
}))();
//# sourceMappingURL=server.js.map