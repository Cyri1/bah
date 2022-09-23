import { useStoryStore } from '../stores/StoryStores';

// audio: "a4b2b5315493e6987923b35f2572734ecbf7fd6f.mp3"
// controlSettings:
    // autoplay: true
    // home: true
    // ok: true
    // pause: false
    // wheel: false
// homeTransition: null
// image: null
// okTransition:
    // actionNode: "48e6f7ce-4bc1-4572-87f2-4cab78783fe3"
    // optionIndex: 0
// uuid: "1ff09caf-a485-4582-a461-f2f8510ac011"

export function findNextStageNodes(okTransition) {
  const storyStore = useStoryStore();
  for (var actionNode of storyStore.stories[storyStore.activeStoryIndex]
    .actionNodes) {
    if (actionNode.id === okTransition.actionNode) {
      return actionNode.options[okTransition.optionIndex];
    }
  }
}

export function findNextActionNode(nextStageNodes) {
  const storyStore = useStoryStore();
  // console.log(nextStageNodes)
  for (var stageNode of storyStore.stories[storyStore.activeStoryIndex]
    .stageNodes) {
      if (stageNode.uuid === nextStageNodes) {
        return stageNode;
      }
  }
}

export function detectTypeOfStageNode(actionNode) {
  if(actionNode.controlSettings.autoplay === true && actionNode.controlSettings.pause === false) {
    return { type : 'audioSlideSet', okTransition : actionNode.okTransition };
  }
  else if(actionNode.controlSettings.autoplay === false && actionNode.image !== null) {
    return { type : 'displaySlideSet', okTransition : actionNode.okTransition }
  }
  else if(actionNode.controlSettings.autoplay === true && actionNode.controlSettings.pause === true) {
    return { type : 'audioStory', okTransition : actionNode.okTransition }
  }
}

export function displaySlideSet(okTransition) {
  const storyStore = useStoryStore();
  var actionNodeIds = [];
  for (var actionNode of storyStore.stories[storyStore.activeStoryIndex].actionNodes) {
    if (actionNode.id === okTransition.actionNode) {
      actionNodeIds = actionNode.options
    }
  }

  var stageNodeIds = [];
  for (var stageOption of actionNodeIds) {
    for (var stageNode of storyStore.stories[storyStore.activeStoryIndex]
      .stageNodes) {
      if (stageNode.uuid === stageOption) {
        stageNode.name = storyStore.stories[storyStore.activeStoryIndex].name;
        stageNodeIds.push(stageNode);
      }
    }
  }
  storyStore.activeSlides = stageNodeIds
}
