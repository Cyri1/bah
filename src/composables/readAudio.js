import { Howl } from 'howler';
import { useConvertPath } from './convertPath';
import { useStoryStore } from '../stores/StoryStores';

export function initHowlers() {
  const storyStore = useStoryStore();
  storyStore.activeAudioSlideHowl = new Howl({ src: [null] })
  storyStore.activeAudioSlideSetHowl = new Howl({ src: [null] })
  storyStore.storyAudioHowl = new Howl({ src: [null] })
}

export function useReadAudioActiveSlide() {
  const storyStore = useStoryStore();
  var convertedPath = useConvertPath(
    storyStore.activeSlides[storyStore.swiper.realIndex].storyName +
      '/assets/' +
      storyStore.activeSlides[storyStore.swiper.realIndex].audio
  );
  // console.log(storyStore.activeAudioSlideHowl);
  console.log('read audio active slide');
  storyStore.activeAudioSlideHowl._src = convertedPath
  storyStore.activeAudioSlideHowl.load();
  storyStore.activeAudioSlideHowl.play();
}

export function useReadAudioActiveSlideSet(audio) {
  const storyStore = useStoryStore();
  var convertedPath = useConvertPath(
    storyStore.activeSlides[storyStore.swiper.realIndex].storyName +
      '/assets/' + audio
  );
  console.log('useReadAudioActiveSlideSet');
  storyStore.activeAudioSlideSetHowl._src = convertedPath
  storyStore.activeAudioSlideSetHowl.load();
  storyStore.activeAudioSlideSetHowl.play();
}

export function useReadAudioStory() {
  console.log('useReadAudioStory');
}
