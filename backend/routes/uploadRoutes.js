/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import express from 'express';
import multer from 'multer';
import path from 'path';

/* ~ ~ ~ ~ ~ Initialize Router ~ ~ ~ ~ ~ */
const router = express.Router();

/* ~ ~ ~ ~ ~ Multer Config ~ ~ ~ ~ ~ */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

/* ~ ~ ~ ~ ~ Check File Type ~ ~ ~ ~ ~ */
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

/* ~ ~ ~ ~ ~ Upload Image ~ ~ ~ ~ ~ */
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image');

/* ~ ~ ~ ~ ~ Upload Route ~ ~ ~ ~ ~ */
router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default router;
