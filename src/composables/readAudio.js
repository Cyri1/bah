import { Howl } from 'howler';
import { useConvertPath } from './convertPath';
import { useStoryStore } from '../stores/StoryStores';

export function useReadAudioActiveSlide() {
  const storyStore = useStoryStore();
  console.log(storyStore.swiper.realIndex);
  console.log(storyStore.activeSlides[storyStore.swiper.realIndex].storyName);
  var convertedPath = useConvertPath(
    storyStore.activeSlides[storyStore.swiper.realIndex].storyName +
      '/assets/' +
      storyStore.activeSlides[storyStore.swiper.realIndex].audio
  );
  var activeAudioSlideHowl = new Howl({ src: [convertedPath] });

  console.log('read audio active slide');
  activeAudioSlideHowl.play();
}

export function useRreadAudioActiveSlideSet() {
  console.log('useRreadAudioActiveSlideSet');
}

export function useReadAudioStory() {
  console.log('useReadAudioStory');
}
