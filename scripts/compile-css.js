const chalk = require('chalk');
const log = require('./log');
const sass = require('node-sass');
const packageImporter = require('node-sass-package-importer');
const path = require('path');

module.exports = (filePath, callback) => {
  const filename = path.basename(filePath).slice(0, -5);
  const dir = path.dirname(filePath);

  sass.render({
    file: filePath,
    outputStyle: 'expanded', // leave minification to Drupal.
    outFile: `${dir}/../${filename}.css`,
    importer: packageImporter(),
    sourceMap: true, // or an absolute or relative (to outFile) path
  },(err, result) => {
    if (err) {
      log(chalk.red(err));
      process.exitCode = 1;
    }
    else {
      result.css = `/**\n * Don't edit this file. Find all style at ./sass folder.\n **/\n${
        result.css
      }`;
      callback(result);
    }
  });
};