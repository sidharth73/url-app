const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv').config()
const PORT = process.env.PORT || 5800
const route = require('./router/router')
const urlRouter = require('./router/urlRouter')
const cors = require('cors');
const AuthMiddleware = require('./middleware/AuthMiddleware');

require('./db/db')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',route);
app.use('/api/', AuthMiddleware, urlRouter);

app.listen(PORT,() => {
    console.log(`app is listening at port ${PORT}`);
})