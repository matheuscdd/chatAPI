import { Router } from "express";
import middleware from "../middleware";
import schemas from "../schemas";
import controllers from "../controllers";

export const message: Router = Router();

message.post("/:id", 
    middleware.dataValid(schemas.message.create),
    middleware.tokenValid,
    middleware.idTalkValid,
    middleware.userInTalkValid,
    controllers.message.create
);

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { sendEmail } from "../nodemailer.util";

message.put("", middleware.upload.single("image"), async (req, res) => {
    console.log(req.file)
    const upload = await cloudinary.uploader.upload(req.file!.path, (error, result) => result)
    // cloudinary.uploader.upload é o método que utilizamos para o upload
    // req.file!.path é o caminho da nossa imagem salva pelo multer na pasta upload
    
    //fs é uma lib nativa do node.js para manipulação do sistema operacional
    //fs.unlink esta apagando o arquivo da pasta upload após o envio ao cloudinary
    fs.unlink(req.file!.path, (error) => {
        if (error) {
            console.log(error);
        }
    })
    
    const { url } = upload
    await sendEmail({to: "matheuscdd@hotmail.com", subject: "img", text: `<img src="${url}"/>`})

    res.json(upload)
})