import express from 'express';
import { getMostPopular, jsonToVideos } from './api';
import { addVideos, mostPopularYoutube } from './db';
import { logger } from './log/winston';

const app = express();

app.get('/youtubeData', async (req, res) => {
  logger.info('GET /youtubeData');
    const mostPopularJson:string = await getMostPopular();
    const youtubeData:Video[] = jsonToVideos(mostPopularJson);
    await addVideos(youtubeData);
    res.send();
  });

  app.get('/mostPopularYoutube', async (req, res) => {
    logger.info('GET /mostPopularYoutube');
      const youtubeVideos :Video[] = await mostPopularYoutube();
      res.send(youtubeVideos);
    });

app.listen(8080, () => {
    logger.info('core server started!');
  });