const express = require('express');
const dbService = require('./config/mongoseConfig');
const { auth } = require('./middlewares/authMiddleware');
const { PORT } = require('./config/env');

const app = express();

dbService.connecter();
require('./config/cookieParserConfig')(app);
require('./config/handlebarsConfig')(app);
app.use(auth);
require('./config/expressConfig')(app);
require('./middlewares/errorHandlerMiddleware');
app.listen(PORT, console.log(`Listening on port http://localhost:${PORT}`));