import multer from 'multer';
import path from 'path'

let filename = "";
let ext = ""

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let url = path.join('public/' + req.body.tabla)
        cb(null, url)
    },
    filename: function (req, file, cb) {
        let hashCode = Math.random().toString(36).replace(/[^a-z]+/g, '');
        cb(null, hashCode + '-' + file.originalname)
        // console.log(req.body.tabla);
        console.log(file.mimetype);
        ext = file.mimetype;
        filename = hashCode + '-' + file.originalname;
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
    return [filename, ext];
}

export default save;