import { defineStore } from 'pinia';
import { storiesIndex } from '../data/storiesIndex';

export const useStoryStore = defineStore('StoryStore', {
  state: () => {
    return {
      stories: [],
      unofficialStore: [],
      downloadedPacks: [],
      installedPacks: [],
      isLoading: false,
      isDone: false,
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
      storiesIndex().then((result) => {
        if (result.errors) {
          console.log(result.data);
          this.errors = result.data;
        } else {
          this.stories = result.data;
        }
      }).then(()=>{
        this.fillIndexSlides()
      }).then(()=>{
        this.swiper.slideToLoop(0, 100, false)
        this.swiper.emit('realIndexChange')
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
    async loadUnofficialStoreData() {
      let response = await fetch('https://unofficial-store.000webhostapp.com/jajznebjkzae5a1ze514c5sw1ca.php');
      let data = await response.json();
      this.unofficialStore = data
    },
  },
});
