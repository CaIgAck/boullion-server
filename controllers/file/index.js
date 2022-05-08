const fs = require("fs");
const {actionResponse, errorResponse} = require("../../helpers/utils");
const file = require('../../models/file')


exports.create_file = async (req, res) => {
    // try {
        // console.log(req.img)
        // const img = fs.readFileSync(req.path);
        // const encode_img = img.toString('base64');
        // const final_img = {
        //     img: {
        //         contentType:req.file.mimetype,
        //         image:new Buffer(encode_img,'base64')
        //     }
        // };
        // file.create(final_img,function(err,result){
        //     if(err){
        //         console.log(err);
        //     }else{
        //         console.log(result.img.Buffer);
        //         console.log("Saved To database");
        //         res.contentType(final_img.contentType);
        //         res.send(final_img.image);            }
        // })

    // } catch (e) {
    //     return res.status(400).send(e)
    // }
}