import { Howl } from 'howler';

export function useReadAudioActiveSlide(swiper) {
  var activeAudioSlideHowl;
  console.log(swiper);
  var audioFile;
  activeAudioSlideHowl = new Howl({src: [audioFile]});

  console.log(activeAudioSlideHowl);
  console.log("read audio active slide");
  // activeAudioSlideHowl.play();
}





export function useRreadAudioActiveSlideSet() {
  console.log('useRreadAudioActiveSlideSet');
}

export function useReadAudioStory() {
  console.log('useReadAudioStory');
}
