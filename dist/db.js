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
exports.mostPopularYoutube = exports.addVideos = void 0;
const request_1 = __importDefault(require("request"));
const server = __importStar(require("./config/env_servers"));
const winston_1 = require("./log/winston");
function addVideos(youtubeData) {
    return new Promise(function (resolve, reject) {
        winston_1.logger.info('[ACCESS] addVideos');
        const params = {
            uri: server.db + '/addVideos',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: { "videos": youtubeData },
            json: true,
        };
        request_1.default.post(params, (err, res) => {
            if (err) {
                winston_1.logger.error('[ERROR] addVideos: ' + err);
                reject(err);
            }
            winston_1.logger.info('[SUCCESS] addVideos');
            resolve();
        });
    });
}
exports.addVideos = addVideos;
;
const YOUTUBE = 1;
const params = {
    date: new Date(),
    platform: YOUTUBE,
};
function mostPopularYoutube() {
    return new Promise(function (resolve, reject) {
        request_1.default.get({ uri: server.db + '/getVideos', qs: params }, (err, res) => {
            winston_1.logger.info('[ACCESS] mostPopularYoutube');
            if (err) {
                winston_1.logger.error('[ERROR] mostPopularYoutube: ' + err);
                reject(err);
            }
            const result = res.body;
            winston_1.logger.info('[SUCCESS] mostPopularYoutube');
            resolve(result);
        });
    });
}
exports.mostPopularYoutube = mostPopularYoutube;
;
