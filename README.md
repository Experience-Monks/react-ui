# Jam3 React UI [![stable](http://hughsk.github.io/stability-badges/dist/stable.svg)](http://github.com/hughsk/stability-badges)

Repository for public react components in Jam3. These components are used out of the box in the [Jam3 SPA Generator](https://github.com/Jam3/nyg-jam3)

## Component Library

https://jam3.github.io/react-ui/

## Installation

@Jam3/React-UI is available as an npm package

[![NPM](https://nodei.co/npm/@jam3/react-ui.png)](https://www.npmjs.com/package/@jam3/react-ui)

```
npm install @jam3/react-ui
yarn add @jam3/react-ui
```

# Eject Usage

The components in this library to be ejected for advanced customization while maintaining version control.
This functionality is achieved by npm post install hook that runs src/scripts/copy-component-utility.js
To use it, simply create a `react-ui.json` file with the following properties.

```
{
  "eject": true,
  "eject-path": "./src/components",
  "components": [
    {
      "name": BaseButton",
      "newName": "PillButton"
    },
    "VideoPlayer"
  ]
}
```

eject: Enables the ejection of components, if ommited the script will not be called.
eject-path: Specifies a custom path for the components to be ejected to, if ommited defaults to src/components.
components: A list of components to eject into your project. Components can be defined as strings (simple mode)
or as objects (advanced mode). In advanced mode you can specify a new ejected name to be used in your project.

Every time `npm install` runs in your project, it will analyze react-ui for any updates to the base component,
if an update is detected, it will generate git merge markers with the new changes while preserving any ejected changes
made in the project.

For more information, please refer to [Usage](USAGE.md) in our documentation.

## Contributing

Please make sure to read the [contributing guide](CONTRIBUTING.md) before making a pull request.

## Changelog

Detailed changes for each release are documented in the [release notes](CHANGELOG.md).

## Licence

@jam3/react-ui is open source and released under the MIT Licence.
