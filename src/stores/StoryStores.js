import { defineStore } from 'pinia';
import { storiesIndex } from '../data/storiesIndex';

export const useStoryStore = defineStore('StoryStore', {
  state: () => {
    return {
      stories: [],
      activeSlides: [],
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
        console.log(story);
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
