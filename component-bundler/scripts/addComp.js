/**
 *
 * @author Owusu K <adjeibohyen@hotmail.co.uk>
 *
 */

let componentName, componentIProps, componentDescription, pathDictionary;

const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const prettier = require('prettier');
const chalk = require('chalk');
const yaml = require('js-yaml');
const inquirer = require('inquirer');
const {upperFirst, lowerFirst} = require('lodash');

const storiesFolder = path.resolve(__dirname, '..', 'src', 'stories');
const entryFile = path.resolve(__dirname, '..', 'src', 'index.ts');
const scriptrcFile = path.resolve(__dirname, '..', '.scriptrc.yml');

const nameVar = /\{\{NAME\}\}/g;
const iPropsVar = /\{\{IPROPS\}\}/g;
const descriptionVar = /\{\{DESCRIPTION\}\}/g;
const typesExportVar = /\{\{TYPES\}\}/;
const componentExportVar = /\{\{COMPONENTS\}\}/;

const templates = yaml.load(fs.readFileSync(scriptrcFile, 'utf8'))[
  'new_component'
];
const entryFileString = fs.readFileSync(entryFile, 'utf8');

function isRequired(answer) {
  return answer ? true : 'Required';
}

function inquirerError(error) {
  if (error.isTtyError) {
    throw Error("Prompt couldn't be rendered in the current environment");
  } else {
    throw Error(error);
  }
}

function writeFile(tsxCode, tsxFilePath) {
  try {
    return fse.outputFileSync(tsxFilePath, tsxCode);
  } catch (err) {
    console.error(err);
  }
}

function generatePaths() {
  pathDictionary = [
    `${storiesFolder}/${
      lowerFirst(componentName) || 'error'
    }/style/Fragment.ts`,
    `${storiesFolder}/${lowerFirst(componentName) || 'error'}/${
      componentName || 'error'
    }.stories.tsx`,
    `${storiesFolder}/${lowerFirst(componentName) || 'error'}/index.tsx`,
  ];
}

function createFileFromTemplate(tsxTemplate, outputPath) {
  const tsxString = tsxTemplate
    .replace(nameVar, componentName)
    .replace(iPropsVar, componentIProps)
    .replace(descriptionVar, componentDescription);

  const prettifiedTsxString = prettier.format(tsxString, {
    singleQuote: true,
    filepath: '*.ts',
  });

  writeFile(prettifiedTsxString, outputPath);
}

function createComponentFiles() {
  templates.forEach((entry, index) => {
    const [key] = Object.keys(entry);
    const tsxTemplate = entry[key];
    createFileFromTemplate(tsxTemplate, pathDictionary[index]);
  });
}

function updateEntryFile() {
  const typesExport = `{{TYPES}}
  export type {${componentIProps}} from '@stories/${lowerFirst(
    componentName
  )}';`;
  const componentExport = `{{COMPONENTS}}
  export {${componentName}} from '@stories/${lowerFirst(componentName)}';`;

  const updatedEntryFileString = entryFileString
    .replace(typesExportVar, typesExport)
    .replace(componentExportVar, componentExport);

  const prettifiedUpdatedEntryFileString = prettier.format(
    updatedEntryFileString,
    {
      singleQuote: true,
      filepath: '*.ts',
    }
  );

  writeFile(prettifiedUpdatedEntryFileString, entryFile);
}

function checkComponentExistence(callback) {
  if (fs.existsSync(`${storiesFolder}/${lowerFirst(componentName)}`)) {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'confirmOverride',
          message: `${chalk.red(
            'Component already exits!'
          )}\nDo you want to override?[Y/n]`,
          default: 'n',
          validate: isRequired,
        },
      ])
      .then(answers => {
        if (answers.confirmOverride === 'Y') {
          callback('override');
        } else {
          console.log(chalk.red('Aborted!'));
        }
      })
      .catch(error => {
        inquirerError(error);
      });
  } else {
    callback('noOverride');
  }
}

function run() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'componentName',
        message: 'Component Name',
        validate: isRequired,
      },
      {
        type: 'input',
        name: 'componentDescription',
        message: 'Component Description',
        validate: isRequired,
      },
    ])
    .then(answers => {
      componentName = upperFirst(answers.componentName.trim());
      componentIProps = `${componentName}Props`;
      componentDescription = answers.componentDescription;

      checkComponentExistence(feedback => {
        const isNewComponent = feedback === 'noOverride';

        generatePaths();
        createComponentFiles();
        isNewComponent && updateEntryFile();
      });
    })
    .catch(error => {
      inquirerError(error);
    });
}

module.exports = run();
