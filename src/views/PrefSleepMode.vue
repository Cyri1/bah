<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="../home"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
            <ion-button size="large" slot="end">test<ion-icon color="success" :icon="play" /></ion-button>
        </ion-buttons>
        <ion-title>Mode nuit :</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-margin-bottom" color="light">
      <ion-accordion-group>
        <ion-accordion v-for="(node, index) in storyStore.sortedStories" color="light" :key="index">
          <ion-item slot="header" color="light">
            <ion-label>{{ node[0] }}</ion-label>
          </ion-item>
          <div class="ion-padding" slot="content">
            <span class="wrapper" v-for="(story, index) in node[1]" :key="index">
              <input type="checkbox"
                @click="selectStory(useConvertPath(node[0] + '/assets/' + story.audio), $event), readAudioSlide(useConvertPath(node[0] + '/assets/' + story.audioSlide), $event)"
                class="checkbox-input" :id="node[0] + '-' + index" />
              <label :for="node[0] + '-' + index">
                <img :src="useConvertPath(node[0] + '/assets/' + story.icon)" />
              </label>
            </span>
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import { useListStoryNodes } from '../composables/listStoryNodes';
import { useConvertPath } from '../composables/convertPath';
import { useStoryStore } from '../stores/StoryStores';
import { useReadAudioSleepModeStory, useReadAudioSleepModeSlide } from '../composables/readAudio';
import {
  IonHeader,
  IonButtons,
  IonBackButton,
  IonButton,
  IonToolbar,
  IonTitle,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonPage,
  IonIcon,
  IonContent
} from "@ionic/vue";
import { play } from "ionicons/icons";

import { onMounted } from "vue";

const storyStore = useStoryStore();
onMounted(() => {
  useListStoryNodes()
  console.log(storyStore.sortedStories);
})

function selectStory(audioPath, event) {
  console.log('selected = ' + event.srcElement.checked);
  if (event.srcElement.checked) {
    console.log('adding = ' + audioPath);
    storyStore.selectedStories.push(audioPath)
  }
  else {
    let index = storyStore.selectedStories.indexOf(audioPath);
    storyStore.selectedStories.splice(index, 1);
    console.log('removing = ' + audioPath);

  }
  console.log(storyStore.selectedStories);
}

function readAudioSlide(audioPath, event) {
  useReadAudioSleepModeStory(audioPath)
  if (event.srcElement.checked) {
    useReadAudioSleepModeSlide(audioPath)
  }
}

</script>

<style scoped>
.wrapper>input[type="checkbox"] {
  display: none;
}

.wrapper>label {
  border: 1px solid #fff;
  padding: 2px;
  display: inline-block;
  position: relative;
  margin: 2px;
  cursor: pointer;
  width: 75px;
}

.wrapper>label img {
  height: 75px;
  width: 75px;
  transition-duration: 0.2s;
  transform-origin: 50% 50%;
}

.wrapper> :checked+label:before {
  transform: scale(1);
  z-index: 1
}

.wrapper> :checked+label img {
  transform: scale(0.8);
  z-index: -1;
  box-shadow: 9px 6px 8px orange;
}
</style>