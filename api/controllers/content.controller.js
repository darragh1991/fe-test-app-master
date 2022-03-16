const ResponseHandler = require('../handlers/response.handler');
const DB = require('../DB/db');

const get = function(req, res) {
  const statuses = DB.content.get();
  ResponseHandler.sendSuccessResponse(res, { data: statuses });
}

const getOne = function(req, res) {
  const lang = +req.params.lang;
  console.log(lang);
  const content = DB.content.get().map((entry) => entry.find(lang => lang === entry.lang));
  if (content) {
    ResponseHandler.sendSuccessResponse(res, { data: { content } });
  } else {
    ResponseHandler.sendErrorResponse(res, {
      data: undefined,
      message: 'Status was not found',
      status: 404
    });
  }
}

const ContentController = { get, getOne };

module.exports = ContentController;
