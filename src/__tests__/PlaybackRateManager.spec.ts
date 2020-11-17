/* eslint-disable no-console */
// @ts-nocheck
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable comma-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable operator-linebreak */

import { PlaybackRateManager } from '../core/playback/PlaybackRateManager';

const mockExecute = jest.fn();
jest.mock('../core/playback/PlaybackRateManager', () => ({
  PlaybackRateManager: jest.fn().mockImplementation(() => ({
    execute: mockExecute,
    setDOM: () => {},
    setExtensionOperator: () => {},
  })),
}));

describe('This is testing PlaybackRateManager', () => {
  test('validate ChromeExtensiPlaybackRateManageronOperator methods', () => {
    const playbackRateManager = new PlaybackRateManager();

    expect(playbackRateManager).toHaveProperty('setDOM');
    expect(playbackRateManager).toHaveProperty('setExtensionOperator');
    expect(playbackRateManager).toHaveProperty('execute');
  });

  test('run PlaybackRateManager methods', () => {
    const playbackRateManager = new PlaybackRateManager();
    playbackRateManager.execute();

    expect(mockExecute).toHaveBeenCalled();
  });
});
