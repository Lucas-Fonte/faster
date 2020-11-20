/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable operator-linebreak */

import { ExtensionOperator } from './ExtensionOperator';

class ChromeExtensionOperator implements ExtensionOperator {
  public getLocalStorage(callbackFunction: Function, key: string): void {
    chrome.storage.local.get([key], (result) => {
      callbackFunction(result);
    });
  }

  public setLocalStorage(
    callbackFunction: Function,
    key: string,
    value: any
  ): void {
    chrome.storage.local.set({ [key]: value }, () => {
      callbackFunction(value);
    });
  }

  public executeScript(code: string) {
    chrome.tabs.executeScript(
      {
        code,
      },
      () => chrome.runtime.lastError
    );
  }

  public executeScriptWithCallback(code: string, callbackFunction: Function) {
    chrome.tabs.executeScript(
      {
        code,
      },
      (result) => callbackFunction(result)
    );
  }
}

export { ChromeExtensionOperator };
