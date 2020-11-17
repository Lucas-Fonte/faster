const playbackRateSlider = document.getElementById('playbackRateSlider');
const playbackRateOutput = document.getElementById('playbackRateOutput');
playbackRateOutput.innerHTML =
  Number(playbackRateSlider.value).toFixed(1) + 'x';

playbackRateSlider.oninput = function () {
  playbackRateOutput.innerHTML = Number(this.value).toFixed(1) + 'x';
  executePlaybackRateChange(this.value);
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
