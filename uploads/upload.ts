import cors from "cors";
import express from "express";
import multer from "multer";
import { readFile } from "node:fs/promises";

type UploadType = "find" | "welcome";

const app = express();
const now = Date.now();
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = req.headers.type;
    cb(null, `./${type}/`);
  },
  filename: function (req, file, cb) {
    // const [name, type] = file.originalname.split(".");
    const name = file.originalname.split(".").shift();
    const type = file.originalname.split(".").pop();
    cb(null, name + "_" + now + "." + type);
  },
});
const upload = multer({ storage: storage }); // 指定文件上传的目录
// const upload = multer({ dest: "./find/" }); // 指定文件上传的目录

app.use(cors());
app.use(express.json());

app.post("/upload", upload.single("file"), (req, res): void => {
  // 单个文件上传的中间件，'file' 是上传表单字段的名称

  // 文件信息可以通过 req.file 访问
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const fileName = req.file.originalname.split(".").shift();
  const fileType = req.file.originalname.split(".").pop();
  const type: UploadType = req.headers.type as UploadType;
  const filePath = `${type}/${fileName}_${now}.${fileType}`;

  // 这里仅打印上传的文件信息
  console.log("File saved:", filePath);
  res.json({ message: "File uploaded successfully", path: filePath });
});

// Get file
app.post("/image", async (req, res): Promise<void> => {
  console.log(req.body);
  const { filePath } = req.body;
  const fileType = filePath.split(".").at(-1) as string;
  const imgType = ["jpg", "png", "jepg"];
  const videoType = ["mp4", "mkv", "avi", "webm", "mov"];
  let contentType = "";
  if (imgType.includes(fileType)) {
    contentType = `image/${fileType}`;
  } else if (videoType.includes(fileType)) {
    contentType = `video/${fileType}`;
  } else {
    res.status(400).json({ error: "File type not supported!" });
  }
  try {
    const retFile = await readFile(filePath);
    res.setHeader("Content-Type", contentType);
    res.send(retFile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read the file" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
