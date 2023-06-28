import { defineStore } from 'pinia';
import { storiesIndex } from '../data/storiesIndex';
import { Preferences } from '@capacitor/preferences';

export const useStoryStore = defineStore('StoryStore', {
  state: () => {
    return {
      stories: [],
      unfavoriteStories: [],
      theme: null,
      contributorPwd: null,
      timelineVisible: null,
      storiesListModalIsOpen: false,
      remoteStoriesLists: [],
      sortedStories: [],
      selectedStories: [],
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
      sleepModeTotalTime: 0,
      storyAudioSleepModeHowl: {},
      storyAudioSleepModeSlideHowl: {},
    };
  },
  actions: {
    fillStoriesIndex() {
      storiesIndex()
        .then((result) => {
          if (result.errors) {
            this.errors = result.data;
          } else {
            var arr = this.unfavoriteStories;
            var filteredData = result.data.filter(function (el) {
              return !arr.includes(el.name);
            });
            this.stories = filteredData;
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
      });
      Preferences.get({ key: 'timelineVisible' }).then((result) => {
        if (result.value === null) {
          this.timelineVisible = false;
        } else {
          this.timelineVisible = JSON.parse(result.value.toLowerCase());
        }
      });
      Preferences.get({ key: 'unfavoriteStories' }).then((result) => {
        if (result.value === null) {
          this.unfavoriteStories = [];
        } else {
          this.unfavoriteStories = JSON.parse(result.value);
        }
      });
    },
    async loadUnofficialStoreData() {
      let lists = await Preferences.get({ key: 'storiesLists' });
      console.log('lists: ');
      console.log(lists);

      let response = await fetch(
        'https://hostmyscripts.000webhostapp.com/data.php?pwd=contribz'
      );
      let data = await response.json();
      this.unofficialStore = data;
    },
  },
});
