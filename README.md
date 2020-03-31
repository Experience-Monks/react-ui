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

## Basic Usage

```
import React from 'react';
import { BaseLink } from '@jam3/react-ui';
```

# Eject Usage

The components in this library can be ejected for advanced customization while maintaining version control.
This functionality is achieved by npm post install hook that runs src/scripts/copy-component-utility.js
To use it, simply define some react-ui specific properties at the bottom of your project's local package.json.

```
"react-ui": {
  "eject": true,
  "eject-path": "./src/components",
  "components": [
    "BaseButton",
    "VideoPlayer"
  ]
}
```

eject: Enables the ejection of components, if ommited the script will not be called.
eject-path: Specifies a custom path for the components to be ejected to, if ommited defaults to src/components.
components: A list of components to eject into your project.

For more information, please refer to [Usage](USAGE.md) in our documentation.

## Contributing

Please make sure to read the [contributing guide](CONTRIBUTING.md) before making a pull request.

## Changelog

Detailed changes for each release are documented in the [release notes](CHANGELOG.md).

## Licence

@jam3/react-ui is open source and released under the MIT Licence.
