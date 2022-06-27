import express from 'express';

// Constants
const app = express();

/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const serverStartMsg = 'Express server started on port: ',
    port = (process.env.PORT || 3000);

// Start server
app.listen(port, () => {
    console.log(serverStartMsg + port);
});
