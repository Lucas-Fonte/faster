/* eslint-disable import/prefer-default-export */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */

const setPreviousSavedTime = (
  result: any,
  savedMinutesTracker: HTMLElement
) => {
  const currentTrackedTime =
    result.savedMinutes.toFixed(0) ||
    Number(savedMinutesTracker.innerHTML).toFixed(0);

  savedMinutesTracker.innerHTML = ` ${
    currentTrackedTime > 0 ? '+' : ''
  }${currentTrackedTime} minutes`;
};

export { setPreviousSavedTime };
