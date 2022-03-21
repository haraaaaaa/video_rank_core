import request from 'request';
import * as server from "./config/env_servers";
import { logger } from './log/winston';


export function addVideos (youtubeData:Video[]): Promise<void> {
    return new Promise(function (resolve, reject) {
        logger.info('[ACCESS] addVideos');
        const params = {
            uri:server.db + '/addVideos', 
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Accept':'application/json',
            },
            body: { "videos": youtubeData },
            json: true,
        };
        request.post(params, (err, res) => {
            if (err) { 
                logger.error('[ERROR] addVideos: ' + err);
                reject(err);
            }
            logger.info('[SUCCESS] addVideos');
            resolve();
        })
})};

const YOUTUBE = 1;

const params = { 
    date: new Date(),
    platform: YOUTUBE,
};

export function mostPopularYoutube (): Promise<Video[]> {
    return new Promise(function (resolve, reject) {
        request.get({uri: server.db + '/getVideos', qs: params}, (err, res) => {
            logger.info('[ACCESS] mostPopularYoutube');
            if (err) { 
                logger.error('[ERROR] mostPopularYoutube: ' + err);
                reject(err);
            }
            const result:Video[] = res.body;
            logger.info('[SUCCESS] mostPopularYoutube');
            resolve(result);
        })
})};