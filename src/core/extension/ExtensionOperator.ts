/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

interface ExtensionOperator {
  getLocalStorage: (callbackFunction: Function, key: string) => void;
  setLocalStorage: (
    callbackFunction: Function,
    key: string,
    value: any
  ) => void;
  executeScript: (code: string) => void;
}

export { ExtensionOperator };
