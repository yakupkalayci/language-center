const Enum = require("../config/Enum");
const CustomError = require("./Error");

class Response {
  constructor() {}

  static successResponse(data) {
    return {
      status: 'success',
      data,
    };
  }

  static errorResponse(error) {
    console.error(error);
    if (error instanceof CustomError) {
      return {
        status: 'error',
        code: error.code,
        error: {
          title: error.message,
          description: error.description,
        },
      };
    }

    return {
      code: Enum.HTTPS_CODES.INT_SERVER_ERROR,
      error: {
        title: "Unknown Error",
        description: error.message,
      },
    };
  }
}

module.exports = Response;
