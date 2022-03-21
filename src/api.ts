import request from 'request';
import * as server from "./config/env_servers";
import { logger } from './log/winston';

export function jsonToVideos (json:string):Video[] {
    logger.info('[ACCESS] jsonToVideo');
    const youtubeVideos:YoutubeVideos = JSON.parse(json);
    const result:Video[] = []; 
    let rank = 0;
    for(let item of youtubeVideos.items) {
        const video: Video = {
            videoId: item.id,
            publishedAt: item.snippet.publishedAt,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            tags: item.snippet.tags,
            categoryId: item.snippet.categoryId,
            ranking: ++rank,
            platform: 1
        }
        result.push(video);
    }
    logger.info('[SUCCESS] jsonToVideo');
    return result;
};

export function getMostPopular (): Promise<string> {
    return new Promise(function (resolve, reject) {
        logger.info('[ACCESS] getMostPopular');
        request.get(server.api + '/mostPopular', (err, res) => {
            if (err) { 
                logger.error('[ERROR] getMostPopular: ' + err);
                reject(err);
            }
            logger.info('[SUCCESS] getMostPopular');
            resolve(JSON.parse(res.body));
        })
})};
