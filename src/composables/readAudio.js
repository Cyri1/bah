import { Howl } from 'howler';
import { useConvertPath } from './convertPath';
import { useStoryStore } from '../stores/StoryStores';
import { useDefaultBrightness, useCustomBrightness} from '../composables/brightness'

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
    console.log('returned');
    return;
  }
  var convertedPath = useConvertPath(
    storyStore.activeSlides[storyStore.swiper.realIndex]?.name +
      '/assets/' +
      storyStore.activeSlides[storyStore.swiper.realIndex]?.audio
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
    storyStore.activeSlides[storyStore.swiper.realIndex]?.name +
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
  storyStore.isAudioActiveSlideSetPlaying = false;
  var convertedPath = useConvertPath(
    storyStore.activeSlides[storyStore.swiper.realIndex].name +
      '/assets/' +
      audio
  );
  storyStore.storyAudioHowl.once('load', function () {
    storyStore.storyDuration = storyStore.storyAudioHowl.duration()
    console.log(storyStore.storyDuration);
  })
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
  var playlist = storyStore.selectedStories;
  storyStore.storyAudioSleepModeSlideHowl.stop();

  console.log('Loaded playlist list : ');
  console.log(playlist);

  var i = 0;
  storyStore.storyAudioSleepModeHowl.on('end', function () {
    i++;
    if (i === playlist.length) {
      console.log('Playlist end');
      useDefaultBrightness()
      return;
    } else {
      console.log('Playlist next audio');
      storyStore.storyAudioSleepModeHowl.stop();
      storyStore.storyAudioSleepModeHowl.unload();
      storyStore.storyAudioSleepModeHowl._queue = [];
      storyStore.storyAudioSleepModeHowl._src = playlist[i];
      storyStore.storyAudioSleepModeHowl.load();
      storyStore.storyAudioSleepModeHowl.play();
    }
  });

  if (i === 0) {
    console.log('Playlist first audio');
    (async () => {
      useCustomBrightness(0.1)
    })();

    // nothing else
    storyStore.storyAudioSleepModeHowl.stop();
    storyStore.storyAudioSleepModeHowl.unload();
    storyStore.storyAudioSleepModeHowl._queue = [];
    storyStore.storyAudioSleepModeHowl._src = playlist[0];
    storyStore.storyAudioSleepModeHowl.load();
    storyStore.storyAudioSleepModeHowl.play();
  }
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

export function useCountTime() {
  const storyStore = useStoryStore();
  storyStore.sleepModeTotalTime = 0
  for (let audio of storyStore.selectedStories) {
    let howlCounter = new Howl({
      src: [audio],
      html5: true,
      onload: () => {
        storyStore.sleepModeTotalTime += howlCounter.duration();
      },
    });
  }
}
