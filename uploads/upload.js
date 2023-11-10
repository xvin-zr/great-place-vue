import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const now = Date.now();
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./find/");
  },
  filename: function (req, file, cb) {
    const [name, type] = file.originalname.split(".");
    cb(null, name + "_" + now + "." + type);
  },
});
const upload = multer({ storage: storage }); // 指定文件上传的目录
// const upload = multer({ dest: "./find/" }); // 指定文件上传的目录

app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
  // 单个文件上传的中间件，'file' 是上传表单字段的名称

  // 文件信息可以通过 req.file 访问
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const [fileName, fileType] = req.file.originalname.split(".");
  const type = req.headers.type
  const filePath = `uploads/${type}/${fileName}_${now}.${fileType}`;

  // fs.writeFile(filePath, req.file.buffer, (err) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).json({ error: "Failed to save the file" });
  //   }

  //   console.log("File saved:", filePath);
  // });

  // 处理上传的文件，例如保存到数据库或进行进一步处理
  // 这里仅打印上传的文件信息
  console.log("File saved:", filePath);
  res.json({ message: "File uploaded successfully", path: filePath });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
