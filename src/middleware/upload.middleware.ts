import multer from "multer";

export const upload = multer({ storage: multer.diskStorage({
    destination: "upload", //Nome do diretório para salvar os arquivos
    filename: (request, file, callback) => { //Função para definir o nome do arquivo
        const filename = `${file.originalname}`;

        return callback(null, filename);
    }}) 
});