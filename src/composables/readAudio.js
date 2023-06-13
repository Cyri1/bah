import { Howl } from 'howler';
import { useConvertPath } from './convertPath';
import { useStoryStore } from '../stores/StoryStores';

export function initHowlers() {
  const storyStore = useStoryStore();
  storyStore.activeAudioSlideHowl = new Howl({ src: [null], html5: true });
  storyStore.activeAudioSlideSetHowl = new Howl({
    src: [null],
    html5: true,
    autoplay: true,
  });
  storyStore.storyAudioHowl = new Howl({ src: [null], html5: true });
  storyStore.storyAudioSleepModeHowl = new Howl({ src: [null], html5: true });
  storyStore.storyAudioSleepModeSlideHowl = new Howl({
    src: [null],
    html5: true,
  });
}

export function useReadAudioActiveSlide() {
  console.log('read audio active slide');
  const storyStore = useStoryStore();
  if (
    storyStore.isAudioActiveSlideSetPlaying ||
    storyStore.activeSlides.length === 0
  ) {
    return;
  }
  var convertedPath = useConvertPath(
    storyStore.activeSlides[storyStore.swiper.realIndex].name +
      '/assets/' +
      storyStore.activeSlides[storyStore.swiper.realIndex].audio
  );
  storyStore.activeAudioSlideHowl.stop();
  storyStore.activeAudioSlideHowl.unload();
  storyStore.activeAudioSlideHowl._queue = [];
  storyStore.activeAudioSlideHowl._src = convertedPath;
  storyStore.activeAudioSlideHowl.load();
  storyStore.activeAudioSlideHowl.play();
}

export function useReadAudioActiveSlideSet(audio) {
  console.log('read audio active slide set');
  const storyStore = useStoryStore();
  storyStore.isAudioActiveSlideSetPlaying = true;
  var convertedPath = useConvertPath(
    storyStore.activeSlides[storyStore.swiper.realIndex].name +
      '/assets/' +
      audio
  );
  storyStore.activeAudioSlideHowl.stop();
  storyStore.activeAudioSlideSetHowl.unload();
  storyStore.activeAudioSlideSetHowl._queue = [];
  storyStore.activeAudioSlideSetHowl._src = convertedPath;
  storyStore.activeAudioSlideSetHowl.load();
  storyStore.activeAudioSlideSetHowl.play();
}

export function useReadAudioStory(audio) {
  console.log('read story');
  const storyStore = useStoryStore();

  var convertedPath = useConvertPath(
    storyStore.activeSlides[storyStore.swiper.realIndex].name +
      '/assets/' +
      audio
  );
  storyStore.activeAudioSlideHowl.stop();
  storyStore.activeAudioSlideSetHowl.stop();
  storyStore.storyAudioHowl.unload();
  storyStore.storyAudioHowl._queue = [];
  storyStore.storyAudioHowl._src = convertedPath;
  storyStore.storyAudioHowl.load();
  storyStore.storyAudioHowl.play();
}

export function useReadAudioSleepModeStories() {
  const storyStore = useStoryStore();
  console.log('Playing audio list : ');
  console.log(storyStore.selectedStories);

  var playlist = storyStore.selectedStories;
  storyStore.storyAudioSleepModeHowl.stop();
  storyStore.storyAudioSleepModeHowl.unload();
  storyStore.storyAudioSleepModeHowl._queue = [];
  storyStore.storyAudioSleepModeHowl._src = playlist;

  function autoplay(i, playlist) {
    storyStore.storyAudioSleepModeHowl.once('end',function () {
      if (i + 1 == playlist.length) {
        console.log('Playlist end');
      } else {
        console.log('Playlist end');
        autoplay(i + 1, playlist);
      }
    });
    storyStore.storyAudioSleepModeHowl.load();
    storyStore.storyAudioSleepModeHowl.play();
  }
  autoplay(0, playlist);
}

export function useReadAudioSleepModeSlide(audio) {
  const storyStore = useStoryStore();
  storyStore.storyAudioSleepModeSlideHowl.stop();
  storyStore.storyAudioSleepModeSlideHowl.unload();
  storyStore.storyAudioSleepModeSlideHowl._queue = [];
  storyStore.storyAudioSleepModeSlideHowl._src = audio;
  storyStore.storyAudioSleepModeSlideHowl.load();
  storyStore.storyAudioSleepModeSlideHowl.play();
}
