const fs = require("fs");
const file = require('../../models/file')


exports.create_file = async (req, res) => {
    try {
        const img = fs.readFileSync(req.file.path);
        const encode_img = img.toString('base64');
        const final_img = {
            img: {
                data: new Buffer.from(encode_img, 'base64'),
                contentType: req.file.mimetype
            }
        };
        file.create(final_img,function(err,result){
            if(err){
                console.error(err);
            }else{
                res.send(result);
            }
        })
    } catch (e) {
        res.status(400).send(e)
    }
}