/* eslint-disable no-new */
import { PlaybackRateManager } from './core/PlaybackRateManager';

const bootstrap = (): void => {
  new PlaybackRateManager();
};

bootstrap();
