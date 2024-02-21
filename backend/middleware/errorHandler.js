/* ~ ~ ~ ~ ~ Not Found Error ~ ~ ~ ~ ~ */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

/* ~ ~ ~ ~ ~ Error Handler ~ ~ ~ ~ ~ */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  /* - - - - - Check for CastError - - - - - */
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  /* - - - - - Custom Error - - - - - */
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export { notFound, errorHandler };
