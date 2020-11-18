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
import { setPreviousPlaybackRate } from './setPreviousPlaybackRate';
import { setPreviousSavedTime } from './setPreviousSavedMinutes';

class PlaybackRateManager {
  private PREVIOUS_RATE_STORAGE_KEY = 'previousRate';
  private SAVED_MINUTES_STORAGE_KEY = 'savedMinutes';

  document: Document;
  playbackRateSlider: HTMLElement;
  playbackRateOutput: HTMLElement;
  savedMinutesTracker: HTMLElement;
  extensionOperator: ExtensionOperator;

  public execute() {
    this.playbackRateSlider = this.document.getElementById(
      'playbackRateSlider'
    );
    this.playbackRateOutput = this.document.getElementById(
      'playbackRateOutput'
    );
    this.savedMinutesTracker = this.document.getElementById(
      'savedMinutesTracker'
    );

    this.checkForSavedState(this.PREVIOUS_RATE_STORAGE_KEY, (result: any) => {
      setPreviousPlaybackRate(
        result,
        this.playbackRateSlider,
        this.playbackRateOutput
      );
    });

    this.checkForSavedState(this.SAVED_MINUTES_STORAGE_KEY, (result: any) => {
      setPreviousSavedTime(result, this.savedMinutesTracker);
    });

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

  private checkForSavedState(key: string, callbackFunction: Function): void {
    this.extensionOperator.getLocalStorage((result: any) => {
      callbackFunction(result);
    }, key);
  }

  private changeRate(value: string | number): void {
    this.extensionOperator.setLocalStorage(
      () => {
        this.playbackRateOutput.innerHTML = `${Number(value).toFixed(1)}x`;
        this.executePlaybackRateChange(value);
      },
      this.PREVIOUS_RATE_STORAGE_KEY,
      value
    );

    this.changeTrackedTime(value);
  }

  private changeTrackedTime(speedRate: string | number): void {
    chrome.tabs.executeScript(
      {
        code: `
          function getContentDuration() {
            const videoPlayerList = document.getElementsByTagName('video');

            if (!videoPlayerList.length) {
              alert('Video not found');
              return;
            }
            const duration = videoPlayerList[videoPlayerList.length - 1].duration;
            return duration;
          }
    
          getContentDuration();
        `,
      },
      ([duration]) => {
        const minutes = duration / 60;
        const resolvedMinutes = minutes - minutes / Number(speedRate);

        this.savedMinutesTracker.innerHTML = `${
          resolvedMinutes > 0 ? '+' : ''
        }${Number(resolvedMinutes).toFixed(0)} minutes`;

        this.extensionOperator.setLocalStorage(
          () => {},
          this.SAVED_MINUTES_STORAGE_KEY,
          resolvedMinutes
        );
      }
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
