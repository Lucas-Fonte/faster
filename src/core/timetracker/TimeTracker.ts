/* eslint-disable no-tabs */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { ExtensionOperator } from '../extension/ExtensionOperator';

class TimeTracker {
  private SAVED_MINUTES_STORAGE_KEY = 'savedMinutes';

  extensionOperator: ExtensionOperator;

  savedMinutesTracker: HTMLElement;

  constructor(
    extensionOperator: ExtensionOperator,
    savedMinutesTracker: HTMLElement
  ) {
    this.extensionOperator = extensionOperator;
    this.savedMinutesTracker = savedMinutesTracker;
  }

  public changeTrackedTime(speedRate: string | number): void {
    this.extensionOperator.executeScriptWithCallback(
      `       
              function getContentDuration() {
                const videoPlayerList = document.getElementsByTagName('video');
    
                if (!videoPlayerList.length) {
                  alert('Video not found');
                  return;
                }
                const duration = videoPlayerList[videoPlayerList.length - 1].duration;

                return duration;
              }
        
              getContentDuration();`,
      ([duration]: [number]) => {
        this.executeTimeChange(duration, speedRate);
      }
    );
  }

  private executeTimeChange(duration: number, speedRate: string | number) {
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
}

export { TimeTracker };
