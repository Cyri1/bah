import { Howl } from 'howler';
import { useConvertPath } from './convertPath';
import { useStoryStore } from '../stores/StoryStores';

export function initHowlers() {
  const storyStore = useStoryStore();
  storyStore.activeAudioSlideHowl = new Howl({ src: [null], html5: true })
  storyStore.activeAudioSlideSetHowl = new Howl({ src: [null], html5: true, autoplay: true })
  storyStore.storyAudioHowl = new Howl({ src: [null], html5: true })
}

export function useReadAudioActiveSlide() {
  const storyStore = useStoryStore();
  var convertedPath = useConvertPath(storyStore.activeSlides[storyStore.swiper.realIndex].storyName + '/assets/' +
  storyStore.activeSlides[storyStore.swiper.realIndex].audio
  );
  console.log(convertedPath);
  console.log('read audio active slide');
  storyStore.activeAudioSlideHowl.unload();
  storyStore.activeAudioSlideHowl._queue = []
  storyStore.activeAudioSlideHowl._src = convertedPath
  console.log(storyStore.activeAudioSlideHowl);
  storyStore.activeAudioSlideHowl.load();
  storyStore.activeAudioSlideHowl.play();
}

export function useReadAudioActiveSlideSet(audio) {
  const storyStore = useStoryStore();
  var convertedPath = useConvertPath(storyStore.activeSlides[storyStore.swiper.realIndex].storyName + '/assets/' + audio);
  storyStore.activeAudioSlideHowl.stop();
  console.log('useReadAudioActiveSlideSet');
  storyStore.activeAudioSlideSetHowl.unload();
  storyStore.activeAudioSlideSetHowl._queue = []
  storyStore.activeAudioSlideSetHowl._src = convertedPath
  storyStore.activeAudioSlideSetHowl.load();
  storyStore.activeAudioSlideSetHowl.play();
}

export function useReadAudioStory(audio) {
  const storyStore = useStoryStore();
  var convertedPath = useConvertPath(storyStore.activeSlides[storyStore.swiper.realIndex].storyName + '/assets/' + audio);

  storyStore.activeAudioSlideHowl.stop();
  storyStore.activeAudioSlideSetHowl.stop();
  console.log('useReadAudioStory');
  storyStore.storyAudioHowl.unload();
  storyStore.storyAudioHowl._queue = []
  storyStore.storyAudioHowl._src = convertedPath
  storyStore.storyAudioHowl.load();
  storyStore.storyAudioHowl.play();
}
