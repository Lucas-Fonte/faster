/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/prefer-default-export */
/* eslint-disable operator-linebreak */
/* eslint-disable keyword-spacing */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

import { ExtensionOperator } from '../extension/ExtensionOperator';

class PlaybackRateManager {
  private STORAGE_KEY = 'previousRate';

  document: Document;
  playbackRateSlider: HTMLElement;
  playbackRateOutput: HTMLElement;
  extensionOperator: ExtensionOperator;

  public execute() {
    this.playbackRateSlider = this.document.getElementById(
      'playbackRateSlider'
    );
    this.playbackRateOutput = this.document.getElementById(
      'playbackRateOutput'
    );
    this.checkForPreviousValue();

    this.playbackRateSlider.oninput = ({ target }) => {
      this.changeRate((<HTMLInputElement>target).value);
    };
  }

  public setDOM(document: Document) {
    this.document = document;
  }

  public setExtensionOperator(extensionOperator: ExtensionOperator) {
    this.extensionOperator = extensionOperator;
  }

  private checkForPreviousValue(): void {
    this.extensionOperator.getLocalStorage((result: any) => {
      const currentRate =
        result.previousRate ||
        Number((<HTMLInputElement>this.playbackRateSlider).value).toFixed(1);
      this.playbackRateOutput.innerHTML = `${currentRate}x`;
      (<HTMLInputElement>this.playbackRateSlider).value = currentRate;
    }, this.STORAGE_KEY);
  }

  private changeRate(value: string | number): void {
    this.extensionOperator.setLocalStorage(
      () => {
        this.playbackRateOutput.innerHTML = `${Number(value).toFixed(1)}x`;
        this.executePlaybackRateChange(value);
      },
      this.STORAGE_KEY,
      value
    );
  }

  private executePlaybackRateChange(playbackRate: string | number) {
    const code = `
        function setPlaybackSpeedFaster() {
          let playbackRate = ${playbackRate};
          const videoPlayerList = document.getElementsByTagName('video');

          if (!videoPlayerList.length) {
            alert('Video not found');
            return;
          }
          videoPlayerList[videoPlayerList.length - 1].playbackRate = playbackRate;
        }
  
        setPlaybackSpeedFaster();
        `;
    this.extensionOperator.executeScript(code);
  }
}

export { PlaybackRateManager };
