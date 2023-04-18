const fs = require("fs");
const Koa = require("koa");
const Router = require("koa-router");
const multer = require("koa-multer");
const bodyparser = require('koa-bodyparser');
const send = require("koa-send");
const { join } = require("path");
const execFile = require("./change.js");

const app = new Koa();
const router = new Router();

app.use(bodyparser());

const storage = multer.diskStorage({
  // 存储的位置
  destination: join(__dirname, "source"),
  // 文件名
  filename(req, file, cb) {
    cb(null, 'clone_' + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/profile", upload.single("file"), async (ctx) => {
  let txt = ctx.req.body.txt;
  console.log('要提取的文字：', txt);
  let fileName = ctx.req.file.filename;
  let pathFileName = "./" + fileName;

  await execFile(fileName, fileName, txt);
  ctx.attachment(pathFileName);
  console.log('导出文件：', pathFileName);
  await send(ctx, pathFileName, { root: __dirname + "/dist" });
});

app.use(router.routes()).use(router.allowedMethods());

app.use((ctx) => {
  ctx.set("Content-Type", "text/html");
  ctx.body = fs.readFileSync(join(__dirname, "index.html"));
});

app.listen(3000, () => {
  console.log("服务启动: http://localhost:3000");
});
