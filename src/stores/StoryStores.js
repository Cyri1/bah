import { defineStore } from 'pinia';
import { storiesIndex } from '../data/storiesIndex';

export const useStoryStore = defineStore('StoryStore', {
  state: () => {
    return {
      stories: [],
      activeSlides: [],
      activeStoryIndex: null,
      swiper: {},
      slidesVisible: true,
      activeAudioSlideHowl: {},
      activeAudioSlideSetHowl: {},
      storyAudioHowl: {},
    };
  },
  actions: {
    fillStoriesIndex() {
      storiesIndex().then((result) => {
        this.stories = result;
      });
    },
    fillIndexSlides() {
      //create array of stagesnodes containing squareOne
      var indexSlides = [];
      for (var story of this.stories) {
        for (var stageNode of story.stageNodes) {
          if (stageNode.squareOne) {
            stageNode.storyName = story.name;
            indexSlides.push(stageNode);
          }
        }
      }
      console.log(indexSlides);
      this.activeSlides = indexSlides;
    },
  },
});
