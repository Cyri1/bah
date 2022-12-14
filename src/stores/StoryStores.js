import { defineStore } from 'pinia';
import { storiesIndex } from '../data/storiesIndex';
import { Preferences } from '@capacitor/preferences';

export const useStoryStore = defineStore('StoryStore', {
  state: () => {
    return {
      stories: [],
      theme: null,
      contributorPwd: null,
      timelineVisible: null,
      unofficialStore: [],
      downloadedPacks: [],
      installedPacks: [],
      isLoading: false,
      isDone: false,
      howlerIsPlaying: false,
      howlerDuration: 0,
      howlerCurrentPos: 0,
      errors: [],
      activeSlides: [],
      activeStoryIndex: null,
      isAudioActiveSlideSetPlaying: false,
      swiper: {},
      slidesVisible: true,
      homeTransition: null,
      activeAudioSlideHowl: {},
      activeAudioSlideSetHowl: {},
      storyAudioHowl: {},
    };
  },
  actions: {
    fillStoriesIndex() {
      storiesIndex()
        .then((result) => {
          if (result.errors) {
            console.log(result.data);
            this.errors = result.data;
          } else {
            this.stories = result.data;
          }
        })
        .then(() => {
          this.fillIndexSlides();
        })
        .then(() => {
          this.swiper.slideToLoop(0, 100, false);
          this.swiper.emit('realIndexChange');
        });
    },
    fillIndexSlides() {
      //create array of stagesnodes containing squareOne
      var indexSlides = [];
      for (var story of this.stories) {
        for (var stageNode of story.stageNodes) {
          if (stageNode.squareOne) {
            stageNode.name = story.name;
            indexSlides.push(stageNode);
          }
        }
      }
      this.activeSlides = indexSlides;
    },
    setPreferences() {
      Preferences.get({ key: 'theme' }).then((result) => {
        if (!result.value) {
          this.theme = 'lunii';
        } else {
          this.theme = result.value;
        }
      })
      Preferences.get({ key: 'timelineVisible' }).then((result) => {
        console.log(result);
        if (result.value === null) {
          this.timelineVisible = false
        } else {
          this.timelineVisible = JSON.parse(result.value.toLowerCase())
        }
      });
    },
    async loadUnofficialStoreData() {
      let contributorPwd = await Preferences.get({ key: 'contributorPwd' });
      let response = await fetch(
        'https://unofficial-store.000webhostapp.com/data.php?pwd=' +
          contributorPwd.value
      );
      let data = await response.json();
      this.unofficialStore = data;
    },
  },
});
