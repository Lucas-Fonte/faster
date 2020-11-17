/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-new */
import { ChromeExtensionOperator } from './core/extension/ChromeExtensionOperator';
import { PlaybackRateManager } from './core/playback/PlaybackRateManager';

const bootstrap = (): void => {
  const playbackRateManager = new PlaybackRateManager();
  playbackRateManager.setDOM(document);
  playbackRateManager.setExtensionOperator(new ChromeExtensionOperator());

  playbackRateManager.execute();
};

bootstrap();

export { bootstrap };
