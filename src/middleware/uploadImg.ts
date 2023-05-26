import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'src/upload')
  },
  filename: function (_req, file, cb) {
    //cb(null, Date.now() + '-' + file.originalname)
    cb(null, file.originalname)
  }
})

export const upload = multer({ storage: storage })
