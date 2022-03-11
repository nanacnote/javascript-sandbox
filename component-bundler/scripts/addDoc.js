/**
 *
 * @author Owusu K <adjeibohyen@hotmail.co.uk>
 *
 */

const fse = require('fs-extra');
const path = require('path');
const prettier = require('prettier');

const outPath = path.resolve(__dirname, '..', 'src', 'stories', 'introduction');
const introFile = fse.readFileSync(
  `${outPath}/Introduction.stories.mdx`,
  'utf8'
);
const readmeFile = fse.readFileSync(
  path.resolve(__dirname, '..', 'README.md'),
  'utf8'
);
const docsVar = /<!--- {{---START---}} --->[\s\S]*?<!--- {{---END---}} --->/g;

function parseIntroFile(introFile) {
  const updatedDocs = `<!--- {{---START---}} --->\n${readmeFile}\n<!--- {{---END---}} --->`;
  const introFileString = introFile.replace(docsVar, updatedDocs);

  return prettier.format(introFileString, {
    singleQuote: true,
    filepath: '*.mdx',
  });
}

function write(parsedCode, toOutPath) {
  try {
    return fse.outputFileSync(toOutPath, parsedCode);
  } catch (err) {
    console.error(err);
  }
}

function run() {
  write(parseIntroFile(introFile), `${outPath}/Introduction.stories.mdx`);
}

module.exports = run();
