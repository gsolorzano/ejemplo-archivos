import multer from 'multer';
import path from 'path'

var filename = "";
var ext = ""
var name = ""

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var url = path.join('public/' + req.body.tabla)
        cb(null, url)
    },
    filename: function (req, file, cb) {
        //cb(null, Date.now() + '-' + file.originalname)
        // console.log(req.body.tabla);
        console.log(file.mimetype);
        ext = file.mimetype;
        name = file.originalname;
        filename = Date.now() + '-' + file.originalname;
    }
})


const upload = multer({ storage: storage }).single('file')

async function save(req: any, res: any) {
    await upload(req, res, function (err: any) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
    });
    return [filename,ext, name];
}

export default save;