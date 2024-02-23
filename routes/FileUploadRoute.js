const express = require ("express")
const router = express.Router();

const{
    uploadSingleFile, getAllFile, getAllFileById, deleteFile,
} = require("../controllers/UploadFileController")

router.route('/').post(uploadSingleFile)
router.route('/').get(getAllFile);
router.route("/:id").get(getAllFileById);
router.route('/:id').delete(deleteFile);


module.exports = router;





