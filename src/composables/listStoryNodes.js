import { useStoryStore } from '../stores/StoryStores';
import { detectTypeOfStageNode } from './handleSlideClick';

export function useListStoryNodes() {
  var nodeList = [];
  const storyStore = useStoryStore();
  for (var story of storyStore.stories) {
    for (var stageNode of story.stageNodes) {
      if (stageNode.image) {
        if (detectTypeOfStageNode(stageNode)?.type === 'displaySlideSet') {
          var okTransition = detectTypeOfStageNode(stageNode)?.okTransition;
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
  var parsednodeList = [];
  for (var node of nodeList) {
    parsednodeList.push({ name: node.name, node: node });
  }

  console.log(parsednodeList);
  let storiesTitle = [...new Set(parsednodeList.map(el => el.node.name))];

  for (var title of storiesTitle) {
    parsednodeList.map(function (node) {
      console.log(node);
      if (node.name === title) {
        console.log('yes');
      }
    })
  }

}
