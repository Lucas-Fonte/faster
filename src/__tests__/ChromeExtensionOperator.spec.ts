/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable operator-linebreak */

import { ChromeExtensionOperator } from '../core/extension/ChromeExtensionOperator';

jest.mock('../core/extension/ChromeExtensionOperator');

describe('This is testing ChromeExtensionOperator', () => {
  test('validate ChromeExtensionOperator methods', () => {
    const chromeExtensionOperator = new ChromeExtensionOperator();

    expect(chromeExtensionOperator).toHaveProperty('getLocalStorage');
    expect(chromeExtensionOperator).toHaveProperty('setLocalStorage');
    expect(chromeExtensionOperator).toHaveProperty('executeScript');
  });

  // test('run ChromeExtensionOperator methods', () => {
  //   const chromeExtensionOperator = new ChromeExtensionOperator();

  //   chromeExtensionOperator.executeScript('code');
  //   chromeExtensionOperator.getLocalStorage(() => {}, 'key');
  //   chromeExtensionOperator.setLocalStorage(() => {}, 'key', 'value');

  //   const mockChromeExtensionOperator =
  //     ChromeExtensionOperator.mock.instances[0];
  //   const mockExecuteScript = mockChromeExtensionOperator.executeScript;
  //   const mockGetLocalStorage = mockChromeExtensionOperator.getLocalStorage;
  //   const mockSetLocalStorage = mockChromeExtensionOperator.setLocalStorage;

  //   expect(mockExecuteScript).toHaveBeenCalledWith('code');
  //   expect(mockGetLocalStorage).toHaveBeenCalledWith(() => {}, 'key');
  //   expect(mockSetLocalStorage).toHaveBeenCalledWith(() => {}, 'key', 'value');
  // });
});
