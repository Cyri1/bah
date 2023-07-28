import { useStoryStore } from '../stores/StoryStores';
import { detectTypeOfStageNode } from './handleSlideClick';

export function useListStoryNodes() {
  var nodeList = [];
  const storyStore = useStoryStore();
  storyStore.sortedStories = []
  for (var story of storyStore.stories) {
    for (var stageNode of story.stageNodes) {
      if (stageNode.image) {
        if (detectTypeOfStageNode(stageNode)?.type === 'displaySlideSet') {
          var okTransition = detectTypeOfStageNode(stageNode)?.okTransition;
          var audioSlide = stageNode.audio;
          console.log('slide set node : ');
          console.log(stageNode);
          for (var actionNode of story.actionNodes) {
            if (actionNode.id === okTransition.actionNode) {
              var nextStageNodes =
                actionNode.options[
                  okTransition.optionIndex < 0 ? 0 : okTransition.optionIndex
                ];
              for (var stageNodedisplaySlideSet of story.stageNodes) {
                if (stageNodedisplaySlideSet.uuid === nextStageNodes) {
                  if (
                    detectTypeOfStageNode(stageNodedisplaySlideSet)?.type ===
                    'audioStory'
                  ) {
                    stageNodedisplaySlideSet.name = story.name;
                    stageNodedisplaySlideSet.icon = stageNode.image;
                    stageNodedisplaySlideSet.audioSlide = audioSlide;
                    nodeList.push(stageNodedisplaySlideSet);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  const sortedStories = nodeList.reduce(
    (entryMap, e) => entryMap.set(e.name, [...entryMap.get(e.name)||[], e]),
    new Map());
    storyStore.sortedStories = sortedStories
}
