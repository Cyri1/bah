import { useStoryStore } from '../stores/StoryStores';

export function findNextStageNodes(okTransition) {
  // okTransition : {
  // actionNode: "f9dba8f9-e6b3-4cc0-ab8a-0449863bfc2a"
  // optionIndex: 0
  // }
  const storyStore = useStoryStore();
  console.log(okTransition);
  console.log(storyStore.stories[storyStore.activeStoryIndex]);
  console.log(storyStore.stories[storyStore.activeStoryIndex].actionNodes);

  for (var actionNode of storyStore.stories[storyStore.activeStoryIndex]
    .actionNodes) {
    if (actionNode.id === okTransition.actionNode) {
      console.log(actionNode.options[okTransition.optionIndex]);
return stageNodeIds;
    }
  }
}
