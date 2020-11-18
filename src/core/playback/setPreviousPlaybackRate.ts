/* eslint-disable import/prefer-default-export */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */

const setPreviousPlaybackRate = (
  result: any,
  playbackRateSlider: HTMLElement,
  playbackRateOutput: HTMLElement
) => {
  const currentRate =
    result.previousRate ||
    Number((<HTMLInputElement>playbackRateSlider).value).toFixed(1);
  playbackRateOutput.innerHTML = `${currentRate}x`;
  (<HTMLInputElement>playbackRateSlider).value = currentRate;
};

export { setPreviousPlaybackRate };
