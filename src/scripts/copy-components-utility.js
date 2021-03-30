const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const dirCompare = require('dir-compare');
const chalk = require('chalk');

const reactUiVersion = process.env.npm_package_version;
const metaVersionFileName = '.ReactUIMetaVersion';
const customConfigFileName = 'react-ui.json';

const reactUiComponentDirectory = './src/components';
const projectRootDirectory = '../../..';
let projectComponentDirectory = `${projectRootDirectory}/src/components`;
const intermediaryFolderPath = './intermediary/';

const configSnippetExample = `// Make sure you configure your package.json or react-ui.json:
"react-ui": {
  "eject": true, // enable/disable this script
  "eject-path": "./src/components", // your components folder path
  "components": ["BaseButton", "VideoPlayer"] // components to sync
}`;

const chalkRUIPrefix = chalk.bgCyanBright.black('react-ui:');
const chalkError = description => chalk.red(`Fatal error occured while ${description}.`);
const chalkComponent = componentName => chalk.yellow(componentName);
const chalkCode = code => chalk.bgBlack.yellow(code);
const chalkRUI = chalk.green('react-ui');
const chalkProject = chalk.cyan('project');

/**
 * Application entry point.
 */
(function() {
  const projectConfigData = getProjectConfigData();
  if (projectConfigData.ejectPath) {
    projectComponentDirectory = `${projectRootDirectory}/${projectConfigData.ejectPath}`;
  }
  validatePackageComponentList(projectConfigData.components);
  unifyComponentsSimpleConfigToAdvanced(projectConfigData.components);
  projectConfigData.components.forEach(component => {
    copyComponentUtility(component.name, component.newName);
  });
  console.log(); // New line at program completion for better formatting seperation.
})();

/**
 * Gets react-ui specific configuration data from projects {customConfigFileName} or package.json.
 * If no configuration data is present, or catches an error, forcefully terminates the application.
 *
 * @returns {object} Object containing the optional eject-path and components list.
 */
function getProjectConfigData() {
  let jsonConfig;

  try {
    if (checkForExistence(`${projectRootDirectory}/${customConfigFileName}`)) {
      jsonConfig = fs.readJsonSync(`${projectRootDirectory}/${customConfigFileName}`);
    } else {
      console.log(
        chalkRUIPrefix,
        `Configuration file ${customConfigFileName} not found, using projects package.json.\n`
      );
      jsonConfig = fs.readJsonSync(`${projectRootDirectory}/package.json`)['react-ui'];
    }
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('reading project package.json'));
    console.log(err);
    process.exit(0);
  }

  if (!jsonConfig || !jsonConfig.eject || !jsonConfig.components || !jsonConfig.components.length) {
    console.log(chalkRUIPrefix, chalk.red('Ejecting is not configured, skipping copy-component-utility.\n'));
    console.log(chalkRUIPrefix, chalkCode(configSnippetExample));
    process.exit(0);
  }

  try {
    if (jsonConfig['eject-path'] && !fs.existsSync(`${projectRootDirectory}/${jsonConfig['eject-path']}`)) {
      console.log(chalkRUIPrefix, chalkError(`validating eject-path, '${jsonConfig['eject-path']}' does not exist`));
      console.log(chalkRUIPrefix, chalkCode(configSnippetExample));
      process.exit(0);
    }
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('checking for existence of eject-path.'));
    console.log(chalkRUIPrefix, chalkCode(configSnippetExample));
    console.log(err);
    process.exit(0);
  }

  return { ejectPath: jsonConfig['eject-path'], components: jsonConfig.components };
}

/**
 * Validates the configuration's components to be correctly typed and an existing react-ui component
 * Terminates the application when types are mismatching, unsupported component is detected, or an error is caught.
 *
 * @param {Array} configComponents Array of components to validate.
 */
function validatePackageComponentList(configComponents) {
  let supportedComponents;
  try {
    supportedComponents = fs.readdirSync(reactUiComponentDirectory);
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('reading contents of react-ui directory'));
    console.log(chalkRUIPrefix, chalkCode(configSnippetExample));
    console.log(err);
    process.exit(0);
  }

  configComponents.forEach(configComponent => {
    const componentType = typeof configComponent;
    if (componentType !== 'string' && componentType === 'object' && typeof configComponent.name !== 'string') {
      console.log(chalkRUIPrefix, chalkError(`validating package component list, ${configComponent} mismatching type`));
      process.exit(0);
    } else if (
      !supportedComponents.some(supportedComponent =>
        componentType === 'string'
          ? supportedComponent === configComponent
          : supportedComponent === configComponent.name
      )
    ) {
      console.log(chalkRUIPrefix, chalkError(`validating package component list, '${configComponent}' does not exist`));
      process.exit(0);
    }
  });
}

/**
 * ReactUI configuration supports simple ejection:
 *  "components": ["BaseButton"]
 * and advanced ejection:
 *  "components": [
 *    {
 *      "name": "BaseButton",
 *      "newName": "PillButton",
 *      etc...
 *    }
 *  ]
 *
 * Converts string defined components to object defined for a single unified system.
 *
 * @param {Array} configComponents Array of components to unify.
 * @returns
 */
function unifyComponentsSimpleConfigToAdvanced(configComponents) {
  for (let i = 0; i < configComponents.length; ++i) {
    const component = configComponents[i];
    if (typeof component === 'string') {
      configComponents[i] = { name: component };
    }
  }
}

/**
 * Analyze react-ui and project component directories for differences and copy or merges those changes.
 * Expected actions that could happen:
 *  - Project directory does not have the component -> copy the component directory from react-ui to project.
 *  - No differences exist -> do nothing.
 *  - Difference between react-ui and project component file -> creates merge markers in the project component file for manual resolution.
 *  - New file in react-ui component -> copy the new component file to the project directory.
 *
 * @param {String} componentName Name of the component to run the copy utility against.
 * @param {String?} componentNewName Custom ejected name of the component.
 */
function copyComponentUtility(componentName, componentNewName) {
  console.log(chalkRUIPrefix, 'Running copy component utility for', chalkComponent(componentName) + '.');
  const projectComponentNameDir = `${projectComponentDirectory}/${componentNewName || componentName}`;
  let reactUiComponentNameDir;
  if (componentNewName) {
    createRenamedIntermediary(componentName, componentNewName);
    reactUiComponentNameDir = `${intermediaryFolderPath}/${componentNewName}`;
  } else {
    reactUiComponentNameDir = `${reactUiComponentDirectory}/${componentName}`;
  }

  if (!checkForExistence(projectComponentNameDir) || isEmptyDir(projectComponentNameDir)) {
    copyFromTo(reactUiComponentNameDir, projectComponentNameDir);
    createMetaVersionFile(`${projectComponentNameDir}/${metaVersionFileName}`);
    console.log(
      chalkRUIPrefix,
      '-- Copied',
      chalk.green(componentName),
      'from',
      chalkRUI,
      'to',
      chalkProject,
      chalk.cyan(componentNewName || '') + '.'
    );
    return;
  }

  if (getComponentsMetaVersion(componentNewName || componentName) === reactUiVersion) {
    console.log(
      chalkRUIPrefix,
      `-- Already using the latest version of ${chalkComponent(componentName)}, skipping copy component utility.`
    );
    return;
  }

  createMetaVersionFile(`${projectComponentNameDir}/${metaVersionFileName}`);

  const compareResults = compareDirectories(reactUiComponentNameDir, projectComponentNameDir);
  const filteredDiffSet = compareResults.diffSet.filter(
    diff => !(diff.state === 'equal' || (diff.state == 'right' && diff.name2 === metaVersionFileName))
  );
  if (filteredDiffSet.length === 0) {
    console.log(
      chalkRUIPrefix,
      '-- No differences between',
      chalkRUI,
      'and',
      chalkProject,
      'versions of',
      chalkComponent(componentName) + '.'
    );
    return;
  }

  filteredDiffSet.forEach(set => {
    const pathString = set.relativePath === '/' ? '/' : set.relativePath + '/';
    if (set.state === 'distinct') {
      console.log(
        chalkRUIPrefix,
        '-- Differences between',
        chalkRUI,
        'and',
        chalkProject,
        'versions of',
        chalkComponent(`${componentName}${pathString}${set.name1}`) + '. Resolve manually with provided merge markers.'
      );
      gitMergeFileUtility(`${set.path1}/${set.name1}`, `${set.path2}/${set.name2}`);
    } else if (set.state === 'left') {
      console.log(
        chalkRUIPrefix,
        '-- New file',
        chalkComponent(`${componentName}${pathString}${set.name1}`),
        'found in',
        chalkRUI + ', copying it to',
        chalkProject + '.'
      );
      copyFromTo(`${set.path1}/${set.name1}`, `${projectComponentNameDir}${pathString}${set.name1}`);
    }
  });

  componentNewName && deleteRenamedIntermediary();
}

/**
 * Get a project components meta version.
 *
 * @param {String} componentName The project component whose meta version is requested.
 */
function getComponentsMetaVersion(componentName) {
  let version;
  try {
    version = fs.readFileSync(`${projectComponentDirectory}/${componentName}/${metaVersionFileName}`).toString();
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError(`reading ${componentName} meta version`));
    console.log(err);
    process.exit(0);
  }
  return version;
}

/**
 * Check for the existence of a file path.
 * Terminates the application if an error is caught.
 *
 * @param {String} path Path to test.
 * @returns {Boolean} true if it exists, false otherwise.
 */
function checkForExistence(path) {
  try {
    return fs.existsSync(path);
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('checking for existence of directory'));
    console.log(err);
    process.exit(0);
  }
}

/**
 * Copies directory or file to destination
 * Terminates the application if an error is caught.
 *
 * @param {String} from directory or file to be copied.
 * @param {String} to named destination.
 */
function copyFromTo(from, to) {
  try {
    fs.copySync(from, to);
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('copying new directory/file from react-ui to project'));
    console.log(err);
    process.exit(0);
  }
}

/**
 * Creates a meta version file in the project path to track ejected version of component.
 *
 * @param {String} path Path of the new meta file.
 */
function createMetaVersionFile(path) {
  try {
    fs.writeFileSync(path, reactUiVersion);
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('creating meta version file.'));
    console.log(err);
  }
}

/**
 * Compares the directory contents of two project components folders for various types of differences.
 *
 * @param {String} c1 First component directory.
 * @param {String?} c2 Second component directory.
 * @returns {Object} Information on differences between the two directories. See documentation of dirCompare.
 */
function compareDirectories(c1, c2) {
  return dirCompare.compareSync(c1, c2, { compareContent: true });
}

/**
 * Runs the git merge-file utility function to analyze differences between two files and creates merge markers in the project file for manual resolution.
 * Terminates the application if an error is caught.
 *
 * @param {String} reactUiFilePath Path to the react-ui component file.
 * @param {*} projectFilePath Path to the project component file.
 */
function gitMergeFileUtility(reactUiFilePath, projectFilePath) {
  const emptyFileName = 'emptyfile'; // Required because git's merge-file utility performs a three way merge.
  try {
    fs.writeFileSync(emptyFileName, '');
    try {
      execSync(
        `git merge-file -L local -L empty -L react-ui -q ${projectFilePath} ${emptyFileName} ${reactUiFilePath}`
      );
    } catch (supress) {
      // execSync always returns exit code 1, supress it.
    }
    fs.unlinkSync(emptyFileName);
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('Running git merge file utility'));
    console.log(err);
    process.exit(0);
  }
}

/**
 * Check if a folder is empty
 *
 * @param {*} dirFolderPath Path to the component folder.
 */
function isEmptyDir(dirFolderPath) {
  return fs.readdirSync(dirFolderPath).length === 0;
}

/**
 * Copies the react-ui component into a temporary directory, then it will rename the occurences
 * of the old component's name with the new component's name.
 *
 * @param {String} oldComponentName The original name of the react-ui component.
 * @param {String} newComponentName The ejected custom name of the react-ui component.
 * @param {String?} intermediaryFolder Temporary folder path to hold the renamed copy
 */
function createRenamedIntermediary(oldComponentName, newComponentName, intermediaryFolder = intermediaryFolderPath) {
  try {
    const destination = intermediaryFolder + newComponentName + '/';

    fs.copySync('./src/components/' + oldComponentName, destination);

    const findFilesToRename = fs.readdirSync(destination).filter(file => file.includes(oldComponentName));

    const oldToNewFilesMap = findFilesToRename.map(oldFileName => ({
      oldFileName,
      newFileName: oldFileName.replace(oldComponentName, newComponentName)
    }));

    oldToNewFilesMap.forEach(fileMap => {
      fs.renameSync(destination + fileMap.oldFileName, destination + fileMap.newFileName);
    });

    oldToNewFilesMap.forEach(fileMap => {
      const fileData = fs.readFileSync(destination + fileMap.newFileName, 'utf-8');
      const renamedFileData = fileData.replace(new RegExp(oldComponentName, 'g'), newComponentName);
      fs.writeFileSync(destination + fileMap.newFileName, renamedFileData);
    });
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('Creating renamed intermediary folder'));
    console.log(err);
    process.exit(0);
  }
}

/**
 * Deletes the intermediary directory
 *
 * @param {String} intermediaryFolder Intermediary folder path to delete
 */
function deleteRenamedIntermediary(intermediaryFolder = intermediaryFolderPath) {
  try {
    fs.rmdirSync(intermediaryFolder, { recursive: true });
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('Deleting intermediary folder'));
    console.log(err);
    process.exit(0);
  }
}
