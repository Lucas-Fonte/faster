const playbackRateSlider = document.getElementById('playbackRateSlider');
const playbackRateOutput = document.getElementById('playbackRateOutput');

chrome.storage.local.get(['previousRate'], (result) => {
  const currentRate =
    result.previousRate || Number(playbackRateSlider.value).toFixed(1);
  playbackRateOutput.innerHTML = currentRate + 'x';
  playbackRateSlider.value = currentRate;
});

playbackRateSlider.oninput = function () {
  chrome.storage.local.set({ previousRate: this.value }, () => {
    playbackRateOutput.innerHTML = Number(this.value).toFixed(1) + 'x';
    executePlaybackRateChange(this.value);
  });
};

const executePlaybackRateChange = (playbackRate) => {
  chrome.tabs.executeScript({
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
  });
};
