"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMostPopular = exports.jsonToVideos = void 0;
const request_1 = __importDefault(require("request"));
const server = __importStar(require("./config/env_servers"));
const winston_1 = require("./log/winston");
function jsonToVideos(json) {
    winston_1.logger.info('[ACCESS] jsonToVideo');
    const youtubeVideos = JSON.parse(json);
    const result = [];
    let rank = 0;
    for (let item of youtubeVideos.items) {
        const video = {
            videoId: item.id,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            tags: item.snippet.tags,
            categoryId: item.snippet.categoryId,
            ranking: ++rank,
            platform: 1
        };
        result.push(video);
    }
    winston_1.logger.info('[SUCCESS] jsonToVideo');
    return result;
}
exports.jsonToVideos = jsonToVideos;
;
function getMostPopular() {
    return new Promise(function (resolve, reject) {
        winston_1.logger.info('[ACCESS] getMostPopular');
        request_1.default.get(server.api + '/mostPopular', (err, res) => {
            if (err) {
                winston_1.logger.error('[ERROR] getMostPopular: ' + err);
                reject(err);
            }
            winston_1.logger.info('[SUCCESS] getMostPopular');
            resolve(JSON.parse(res.body));
        });
    });
}
exports.getMostPopular = getMostPopular;
;
