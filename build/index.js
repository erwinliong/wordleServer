"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// Constants
const app = (0, express_1.default)();
/***********************************************************************************
 *                                  Middlewares
 **********************************************************************************/
// Common middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Set views dir
const viewsDir = path_1.default.join(__dirname, 'views');
app.set('views', viewsDir);
const serverStartMsg = 'Express server started on port: ', port = (process.env.PORT || 3000);
// Serve index.html file
app.get('*', (_, res) => {
    res.send('<h1>Hello World</h1>');
});
// Start server
app.listen(port, () => {
    console.log(serverStartMsg + port);
});
