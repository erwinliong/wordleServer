import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import apiRouter from './routes/api';
import logger from 'jet-logger';
import { CustomError } from '@shared/errors';

import https from 'https';
import wordleService from '@services/wordleService';
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Constants
const app = express();


/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}


/***********************************************************************************
 *                         API routes and error handling
 **********************************************************************************/

// Add api router
app.use('/api', apiRouter);

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
  logger.err(err, true);
  const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
  return res.status(status).json({
    error: err.message,
  });
});


/***********************************************************************************
 *                                  Front-end content
 **********************************************************************************/

// Set views dir
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

// Set static dir
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

/*
GraphQL
 */
const url = 'https://gist.githubusercontent.com/dracos/dd0668f281e685bad51479e5acaadb93/raw/ca9018b32e963292473841fb55fd5a62176769b5/valid-wordle-words.txt';
let data: string | string[] = '';
https.get(url, res => {
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    data = (data as string).split('\n');
    return data;
  })
}).on('error', err => {
  console.log(err.message);
})

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    allWords: [String]
    wordOfTheDay(index: Int!): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  allWords: () => { return wordleService.getAllWords() },
  wordOfTheDay: async (args: any) => {
    let promise = new Promise((resolve, reject) => {
      resolve(wordleService.getAllWords());
    })
    return (await promise as string[])[args.index];
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Serve index.html file
app.get('*', (_: Request, res: Response) => {
  res.sendFile('index.html', { root: viewsDir });
});

// Export here and start in a diff file (for testing).
export default app;
