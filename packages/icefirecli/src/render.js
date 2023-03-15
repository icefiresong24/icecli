const ejs = require("ejs")
const path = require("path")
const fs = require("fs-extra")
const prettier = require("prettier")
const { options } = require("./constant")
const rendFile = [
    "package.json",
    "vite.config.ts",
    "src/main.ts",
]
const render = function (handlePath) {
    let filepath = path.resolve(process.cwd(), options.projectName, handlePath)
    let fileInfo = path.parse(filepath)
    let readFilePath = path.resolve(fileInfo.dir, `${fileInfo.name}.ejs`)
    let code = fs.readFileSync(readFilePath, "utf-8")
    let renderCode = ejs.render(code, options)
    renderCode = prettier.format(renderCode, {
        parser: fileInfo.ext.slice(1) !== "json" ? "typescript" : "json",
    })
    fs.writeFileSync(filepath, renderCode)
    fs.removeSync(readFilePath)

}
function renderFile() {
    rendFile.forEach((item) => {
        render(item)
    })
}
module.exports = { renderFile }