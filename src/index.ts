import express, { Request, Response } from 'express';
import path from 'path';

// Constants
const app = express();

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set views dir
const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);

const serverStartMsg = 'Express server started on port: ',
    port = (process.env.PORT || 3000);

// Serve index.html file
app.get('*', (_: Request, res: Response) => {
    res.send('<h1>Hello World</h1>');
  });

// Start server
app.listen(port, () => {
    console.log(serverStartMsg + port);
});
