const execSync = require('child_process').execSync;
const fs = require('fs-extra');
const dirCompare = require('dir-compare');
const chalk = require('chalk');

const reactUiVersion = process.env.npm_package_version;
const metaVersionFileName = '.ReactUIMetaVersion';

const reactUiComponentDirectory = './src/components';
const projectRootDirectory = '../../..';
let projectComponentDirectory = `${projectRootDirectory}/src/components`;

const chalkRUIPrefix = chalk.bgCyanBright.black('react-ui:');
const chalkError = description => chalk.red(`Fatal error occured while ${description}.`);
const chalkComponent = componentName => chalk.yellow(componentName);
const chalkRUI = chalk.green('react-ui');
const chalkProject = chalk.cyan('project');

/**
 * Application entry point.
 */
(function() {
  const projectPackageData = getProjectPackageData();
  if (projectPackageData.ejectPath) {
    projectComponentDirectory = `${projectRootDirectory}/${projectPackageData.ejectPath}`;
  }
  validatePackageComponentList(projectPackageData.components);
  projectPackageData.components.forEach(component => {
    copyComponentUtility(component);
  });
  console.log(); // New line at program completion for better formatting seperation.
})();

/**
 * Gets react-ui specific configuration data from projects package.json.
 * If no configuration data is present, or catches an error, forcefully terminates the application.
 *
 * @returns {object} Object containing the optional eject-path and components list.
 */
function getProjectPackageData() {
  let packageJson;
  try {
    packageJson = fs.readJsonSync(`${projectRootDirectory}/package.json`);
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('reading project package.json'));
    console.log(err);
    process.exit(0);
  }

  if (
    !packageJson['react-ui'] ||
    !packageJson['react-ui'].eject ||
    !packageJson['react-ui'].components ||
    !packageJson['react-ui'].components.length
  ) {
    console.log(chalkRUIPrefix, chalk.red('Ejecting is not configured, skipping copy-component-utility.\n'));
    process.exit(0);
  }

  try {
    if (
      packageJson['react-ui']['eject-path'] &&
      !fs.existsSync(`${projectRootDirectory}/${packageJson['react-ui']['eject-path']}`)
    ) {
      console.log(
        chalkRUIPrefix,
        chalkError(`validating eject-path, '${packageJson['react-ui']['eject-path']}' does not exist`)
      );
      process.exit(0);
    }
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('checking for existence of eject-path.'));
    console.log(err);
    process.exit(0);
  }

  return { ejectPath: packageJson['react-ui']['eject-path'], components: packageJson['react-ui'].components };
}

/**
 * Validates the package.json component list against the supported react-ui components.
 * Terminates the application when an unsupported component is detected, or an error is caught.
 *
 * @param {Array} packageComponents Array of components to validate.
 */
function validatePackageComponentList(packageComponents) {
  let supportedComponents;
  try {
    supportedComponents = fs.readdirSync(reactUiComponentDirectory);
  } catch (err) {
    console.log(chalkRUIPrefix, chalkError('reading contents of react-ui directory'));
    console.log(err);
    process.exit(0);
  }

  packageComponents.forEach(packageComponent => {
    if (!supportedComponents.some(supportedComponent => supportedComponent === packageComponent)) {
      console.log(
        chalkRUIPrefix,
        chalkError(`validating package component list, '${packageComponent}' does not exist`)
      );
      process.exit(0);
    }
  });
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
 */
function copyComponentUtility(componentName) {
  console.log(chalkRUIPrefix, 'Running copy component utility for', chalkComponent(componentName) + '.');

  if (!checkForExistence(`${projectComponentDirectory}/${componentName}`)) {
    console.log(chalkRUIPrefix, '-- Copied', chalkComponent(componentName), 'from', chalkRUI, 'to', chalkProject + '.');
    copyFromTo(`${reactUiComponentDirectory}/${componentName}`, `${projectComponentDirectory}/${componentName}`);
    createMetaVersionFile(`${projectComponentDirectory}/${componentName}/${metaVersionFileName}`);
    return;
  }

  if (getComponentsMetaVersion(componentName) === reactUiVersion) {
    console.log(
      chalkRUIPrefix,
      `-- Already using the latest version of ${chalkComponent(componentName)}, skipping copy component utility.`
    );
    return;
  }

  const compareResults = compareComponentFromReactUiToProject(componentName);
  if (compareResults.differences === 0) {
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
  compareResults.diffSet.forEach(set => {
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
      copyFromTo(`${set.path1}/${set.name1}`, `${projectComponentDirectory}/${componentName}${pathString}${set.name1}`);
    }
  });
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
 * Compares the directory contents of react-ui and project components for various types of differences.
 *
 * @param {String} componentName Component to compare between react-ui and project.
 * @returns {Object} Information on differences between the two directories. See documentation of dirCompare.
 */
function compareComponentFromReactUiToProject(componentName) {
  return dirCompare.compareSync(
    `${reactUiComponentDirectory}/${componentName}`,
    `${projectComponentDirectory}/${componentName}`,
    {
      compareContent: true
    }
  );
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
