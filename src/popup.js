document.getElementById('changeRate').addEventListener('click', () => {
  chrome.tabs.executeScript({
    code: `
    function setPlaybackSpeedFaster() {
      const DEFAULT_PLAYBACK_RATE = 1.5;
      let playbackRate = DEFAULT_PLAYBACK_RATE;
      playbackRate = prompt('Please enter the desired playback rate', playbackRate);
      const [videoPlayer] = document.getElementsByTagName('video');
      
      if (!videoPlayer) {
        alert('Video not found');
        return;
      }
      playbackRate = Number(playbackRate);
      videoPlayer.playbackRate = playbackRate;
    }    

    setPlaybackSpeedFaster();
    `,
  });
});
