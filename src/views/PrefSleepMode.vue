<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="../home"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button size="large" slot="end" @click="playStories()">{{ new Date(storyStore.sleepModeTotalTime *
            1000).toISOString().substring(11, 16) }}<ion-icon color="success" :icon="play" /></ion-button>
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
    <ion-modal :is-open="storyStore.storyAudioSleepModeHowl.playing()">
      <ion-header>
        <ion-toolbar>
          <ion-title>Mode nuit en cours...</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-grid>
          <ion-row class="ion-align-items-center ion-justify-content-center full-height">
            <ion-button expand="block" size="large" shape="round" @click="stopStories()">STOP</ion-button>
          </ion-row>
        </ion-grid>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>
  
<script setup>
import { useListStoryNodes } from '../composables/listStoryNodes';
import { useConvertPath } from '../composables/convertPath';
import { useStoryStore } from '../stores/StoryStores';
import { useReadAudioSleepModeStories, useReadAudioSleepModeSlide, useCountTime } from '../composables/readAudio';
import {
  IonHeader,
  IonButtons,
  IonBackButton,
  IonButton,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonPage,
  IonIcon,
  IonModal,
  IonContent
} from "@ionic/vue";
import { play } from "ionicons/icons";
import { onMounted } from "vue";

const storyStore = useStoryStore();
onMounted(() => {
  useListStoryNodes()
  storyStore.selectedStories = []
  storyStore.sleepModeTotalTime = 0
})

function selectStory(audioPath, event) {
  if (event.srcElement.checked) {
    useCountTime(audioPath, 'add')
    storyStore.selectedStories.push(audioPath)
  }
  else {
    let index = storyStore.selectedStories.indexOf(audioPath);
    useCountTime(audioPath, 'remove')
    storyStore.selectedStories.splice(index, 1);
  }
  console.log(storyStore.selectedStories);
}

function readAudioSlide(audioPath, event) {
  if (event.srcElement.checked) {
    useReadAudioSleepModeSlide(audioPath)
  }
}

function playStories() {
  useReadAudioSleepModeStories()
}
function stopStories() {
  storyStore.storyAudioSleepModeHowl.stop()
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

.full-height {
  min-height: 100%;
}
</style>