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
const api_1 = require("./api");
const db_1 = require("./db");
const winston_1 = require("./log/winston");
const app = (0, express_1.default)();
app.get('/youtubeData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    winston_1.logger.info('GET /youtubeData');
    const mostPopularJson = yield (0, api_1.getMostPopular)();
    const youtubeData = (0, api_1.jsonToVideos)(mostPopularJson);
    yield (0, db_1.addVideos)(youtubeData);
    res.send();
}));
app.get('/mostPopularYoutube', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    winston_1.logger.info('GET /mostPopularYoutube');
    const youtubeVideos = yield (0, db_1.mostPopularYoutube)();
    res.send(youtubeVideos);
}));
app.listen(8080, () => {
    winston_1.logger.info('core server started!');
});
