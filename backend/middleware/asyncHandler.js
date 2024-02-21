/* ~ ~ ~ ~ ~ Create asyncHandler middleware ~ ~ ~ ~ ~ */
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default asyncHandler;
