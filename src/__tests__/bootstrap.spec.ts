/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-new */

import { bootstrap } from '../bootstrap';
import { ChromeExtensionOperator } from '../core/extension/ChromeExtensionOperator';

import { PlaybackRateManager } from '../core/playback/PlaybackRateManager';

jest.mock('../core/extension/ChromeExtensionOperator');
jest.mock('../core/playback/PlaybackRateManager');

test('should call bootstrap sideEffects', () => {
  bootstrap();

  expect(ChromeExtensionOperator).toHaveBeenCalled();
  expect(ChromeExtensionOperator).toHaveBeenCalledWith();

  expect(PlaybackRateManager).toHaveBeenCalled();
  expect(PlaybackRateManager).toHaveBeenCalledWith();
});
