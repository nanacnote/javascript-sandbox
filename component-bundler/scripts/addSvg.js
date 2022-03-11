/**
 *
 * @author Owusu K <adjeibohyen@hotmail.co.uk>
 *
 */

const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const yaml = require('js-yaml');
const svgr = require('@svgr/core').default;
const {camelCase, upperFirst, includes} = require('lodash');

const assetsFolder = path.resolve(__dirname, '..', 'src', 'assets', 'svg');
const scriptrcFile = path.resolve(__dirname, '..', '.scriptrc.yml');
const svgIndexFile = path.resolve(
  __dirname,
  '..',
  'src',
  'stories',
  'svg',
  'index.tsx'
);
const svgStoriesFile = path.resolve(
  __dirname,
  '..',
  'src',
  'stories',
  'svg',
  'Svg.stories.tsx'
);

const svgFile = /^.*\.svg?$/;
// const tsxFile = /^.*\.tsx?$/;
const ext = /\.[^/.]+$/;
const svgImports = /\{\{IMPORTS\}\}/;
const svgDictionary = /\{\{DICTIONARY\}\}/;
const svgStory = /\{\{STORY\}\}/;
const svgFillAttr = /fill="(?!none).*?"/g;
const svgStrokeAttr = /stroke="(?!none).*?"/g;
const svgGradient = /{\.\.\.props}\s*>/gi;
const svgWithColor = /_color/i;

const fileList = fs.readdirSync(assetsFolder);

const [scriptrcSvgGradient, scriptrcSvgStories, scriptrcSvgIndex] = yaml.load(
  fs.readFileSync(scriptrcFile, 'utf8')
)['add_svg'];

function run() {
  outputTSX();
  updateStories();
  updateIndex();
  deleteSvg();
}

function readFile(svgFilePath) {
  try {
    return fs.readFileSync(svgFilePath, 'utf8');
  } catch (err) {
    console.error(err);
  }
}

function writeFile(tsxCode, tsxFilePath) {
  try {
    return fs.writeFileSync(tsxFilePath, tsxCode);
  } catch (err) {
    console.error(err);
  }
}

function removeFill(svgCode, filename) {
  if (filename.match(svgWithColor)) {
    return svgCode;
  } else {
    return svgCode
      .replace(
        svgFillAttr,
        "fill={props.color === 'gradient' && 'url(#gradient)' || props.color || 'black'}"
      )
      .replace(
        svgStrokeAttr,
        "stroke={props.color === 'gradient' && 'url(#gradient)' || props.color || 'black'}"
      )
      .replace(svgGradient, `{...props}>\n${scriptrcSvgGradient['gradient']}`);
  }
}

function convertFile(svgCode, filename) {
  try {
    return svgr.sync(
      svgCode,
      {
        plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
        typescript: true,
        dimensions: false,
      },
      {componentName: upperFirst(camelCase(filename.replace(ext, '')))}
    );
  } catch (err) {
    console.error(err);
  }
}

function outputTSX() {
  fileList.forEach(filename => {
    const isSvgFile = filename.match(svgFile);
    const noTsxFile = !includes(fileList, filename.replace(ext, '.tsx'));

    if (isSvgFile && noTsxFile) {
      const svgFilePath = path.resolve(assetsFolder, filename);
      const tsxFilePath = svgFilePath.replace(ext, '.tsx');

      const svgCode = readFile(svgFilePath);
      const tsxCode = convertFile(svgCode, filename);
      const svgNoFillCode = removeFill(tsxCode, filename);

      writeFile(svgNoFillCode, tsxFilePath);
    }
  });
}

function updateStories() {
  const storyBlock = [];

  const tsxFileList = [
    ...new Set(fileList.map(filename => filename.replace(ext, ''))),
  ];

  tsxFileList.forEach(filenameTrimExt => {
    storyBlock.push(
      `export const ${upperFirst(
        camelCase(filenameTrimExt)
      )} = Template.bind({});
      ${upperFirst(camelCase(filenameTrimExt))}.args = {
        name: '${filenameTrimExt}',
        width: '5em',
        height: '5em',
      };\n\n`
    );
  });

  const [key] = Object.keys(scriptrcSvgStories);
  const SvgStories = scriptrcSvgStories[key].replace(
    svgStory,
    storyBlock.join('')
  );

  const prettifiedSvgStories = prettier.format(SvgStories, {
    singleQuote: true,
    filepath: '*.ts',
  });

  writeFile(prettifiedSvgStories, svgStoriesFile);
}

function updateIndex() {
  const importStatements = [];
  const dictionaryStatements = [];

  const tsxFileList = [
    ...new Set(fileList.map(filename => filename.replace(ext, ''))),
  ];

  tsxFileList.forEach(filenameTrimExt => {
    const componentName = upperFirst(camelCase(filenameTrimExt));

    importStatements.push(
      `import ${componentName} from '@assets/svg/${filenameTrimExt}';\n`
    );
    dictionaryStatements.push(`'${filenameTrimExt}': ${componentName},\n`);
  });

  const [key] = Object.keys(scriptrcSvgIndex);
  const SvgIndex = scriptrcSvgIndex[key]
    .replace(svgImports, importStatements.join(''))
    .replace(svgDictionary, dictionaryStatements.join(''));

  const prettifiedSvgIndex = prettier.format(SvgIndex, {
    singleQuote: true,
    filepath: '*.ts',
  });

  writeFile(prettifiedSvgIndex, svgIndexFile);
}

function deleteSvg() {
  fileList.forEach(filename => {
    const filePath = path.resolve(assetsFolder, filename);
    if (filePath.match(svgFile)) {
      fs.unlinkSync(filePath);
    }
  });
}

module.exports = run();
