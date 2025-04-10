import { logger } from "./logger.js";

export class errorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof errorHandler) {
    if (
      !(req.originalUrl == "/api/signin" || req.originalUrl == "/api/signup")
    ) {
      logger.error(err.message, {
        "request URL": req.originalUrl,
        body: req.body,
      });
    } else {
      logger.error(err.message, { "request URL": req.originalUrl });
    }
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    console.log(err);
    if (
      !(req.originalUrl == "/api/signin" || req.originalUrl == "/api/signup")
    ) {
      logger.error("Oops! Somethimg went wrong...Try again later", {
        "request URL": req.originalUrl,
        body: req.body,
      });
    } else {
      logger.error("Oops! Somethimg went wrong...Try again later", {
        "request URL": req.originalUrl,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Oops! Somethimg went wrong...Try again later",
    });
  }
};
