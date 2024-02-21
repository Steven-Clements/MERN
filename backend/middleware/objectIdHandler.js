/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { isValidObjectId } from "mongoose";

/* ~ ~ ~ ~ ~ Object ID Handler ~ ~ ~ ~ ~ */
function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    throw new Error("Resource not found");
  }
  next();
}

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default checkObjectId;
