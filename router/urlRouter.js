const express = require('express')
const urlRouter = express.Router();
const urlController = require('../controller/urlController')

urlRouter.post('/createUrl',urlController.url);
urlRouter.get('/urlist',urlController.showUrl);
urlRouter.get('/getUser/:id', urlController.showUrlById);
urlRouter.delete('/deleteUrl/:id',urlController.deleteUrl);
urlRouter.put('/editUrl/:id',urlController.editUrl);

module.exports = urlRouter;