const util = require('util');
const path = require('path');
const child_process = require('child_process');
const exec = util.promisify(child_process.exec);
const jarPath = path.join(__dirname, 'jar');
const sourcePath = path.join(__dirname, 'source');
const distPath = path.join(__dirname, 'dist');

module.exports = async function (sourceFileName,distFileName,words) {
    await exec(`rm -rf ${distPath}`);
    await exec(`mkdir ${distPath}`);
    const shellStr = `java -jar ${jarPath}/sfnttool.jar -s '${words}' ${sourcePath}/${sourceFileName} ${distPath}/${distFileName}`
    await exec(shellStr);
}