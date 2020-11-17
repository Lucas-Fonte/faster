/* eslint-disable import/prefer-default-export */
/* eslint-disable operator-linebreak */
/* eslint-disable keyword-spacing */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class PlaybackRateManager {
  playbackRateSlider: HTMLElement;

  playbackRateOutput: HTMLElement;

  constructor() {
    this.playbackRateSlider = document.getElementById('playbackRateSlider');
    this.playbackRateOutput = document.getElementById('playbackRateOutput');
    this.checkForPreviousValue();

    this.playbackRateSlider.oninput = ({ target }) => {
      this.changeRate((<HTMLInputElement>target).value);
    };
  }

  private checkForPreviousValue(): void {
    chrome.storage.local.get(['previousRate'], (result) => {
      const currentRate =
        result.previousRate ||
        Number((<HTMLInputElement>this.playbackRateSlider).value).toFixed(1);
      this.playbackRateOutput.innerHTML = `${currentRate}x`;
      (<HTMLInputElement>this.playbackRateSlider).value = currentRate;
    });
  }

  private changeRate(value: string | number): void {
    chrome.storage.local.set({ previousRate: value }, () => {
      this.playbackRateOutput.innerHTML = `${Number(value).toFixed(1)}x`;
      this.executePlaybackRateChange(value);
    });
  }

  private executePlaybackRateChange(playbackRate: string | number) {
    chrome.tabs.executeScript(
      {
        code: `
      function setPlaybackSpeedFaster() {
        let playbackRate = ${playbackRate};
        const [videoPlayer] = document.getElementsByTagName('video');
        
        if (!videoPlayer) {
          alert('Video not found');
          return;
        }
        videoPlayer.playbackRate = playbackRate;
      }    
  
      setPlaybackSpeedFaster();
      `,
      },
      () => chrome.runtime.lastError
    );
  }
}

export { PlaybackRateManager };
