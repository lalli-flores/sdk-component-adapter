import license from 'rollup-plugin-license';
import visualizer from 'rollup-plugin-visualizer';
import {terser} from 'rollup-plugin-terser';

/**
 * The configuration for the SDK adapter is very straightforward since:
 * - Project doesn't have dependencies
 */

const moduleName = 'webex-sdk-component-adapter';
const ESModulePath = `dist/es/${moduleName}`;
const UMDModulePath = `dist/umd/${moduleName}`;

const plugins = [
  license({
    banner: `
    Webex Component System.
    Copyright (c) <%= moment().format('YYYY') %> Cisco Systems, Inc and its affiliates.

    This source code is licensed under the MIT license found in the LICENSE file in the root directory of this source tree.
    `,
  }),
];

// Peer dependencies to exclude from bundle
const external = [
  /^rxjs/,
  /webex/,
];

// UMD global/window names for peer dependencies
const globals = {
  '@webex/common': 'Webex',
  '@webex/component-adapter-interfaces': 'WebexComponentAdapterInterfaces',
  rxjs: 'rxjs',
  'rxjs/operators': 'rxjs.operators',
  webex: 'Webex',
};

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: `${ESModulePath}.es.js`,
        format: 'es',
        sourcemap: true,
      },
      {
        file: `${ESModulePath}.es.min.js`,
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins: [
      ...plugins,
      visualizer({
        filename: 'docs/bundle-analysis-esm.html',
        title: 'Webex SDK Component Adapter Library ESM Bundle Analysis',
      }),
    ],
    external,
  },
  {
    input: 'src/index.js',
    output: [
      {
        file: `${UMDModulePath}.umd.js`,
        format: 'umd',
        sourcemap: true,
        name: 'WebexSDKComponentAdapter',
        globals,
      },
      {
        file: `${UMDModulePath}.umd.min.js`,
        format: 'umd',
        sourcemap: true,
        name: 'WebexSDKComponentAdapter',
        globals,
        plugins: [terser()],
      },
    ],
    plugins: [
      ...plugins,
      visualizer({
        filename: 'docs/bundle-analysis-umd.html',
        title: 'Webex SDK Component Adapter Library UMD Bundle Analysis',
      }),
    ],
    external,
  },
];
