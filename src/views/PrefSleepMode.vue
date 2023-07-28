<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button class="ion-margin-start" default-href="../home"></ion-back-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button size="large" :disabled="storyStore.sleepModeTotalTime > 0 ? false : true" slot="end" @click="playStories()">{{ formatSeconds(storyStore.sleepModeTotalTime) }}<ion-icon color="success" :icon="play" /></ion-button>
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
              <input type="checkbox" @click="selectStory(story, node[0], $event)" class="checkbox-input"
                :id="node[0] + '-' + index" />
              <label :for="node[0] + '-' + index">
                <img :src="useConvertPath(node[0] + '/assets/' + story.icon)" />
              </label>
            </span>
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </ion-content>
    <ion-modal ref="modalIsOpen">
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
import { onMounted, ref } from "vue";

const storyStore = useStoryStore();
const modalIsOpen = ref(false);

onMounted(() => {
  useListStoryNodes()
  storyStore.selectedStories = []
  storyStore.sleepModeTotalTime = 0
})

function formatSeconds(ts) {
  const heures = Math.floor(parseInt(ts) / 3600);
  const minutes = Math.floor((parseInt(ts) % 3600) / 60);
  const secondesRestantes = parseInt(ts) % 60;

  const heuresFormat = heures < 10 ? `0${heures}` : heures;
  const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
  const secondesFormat = secondesRestantes < 10 ? `0${secondesRestantes}` : secondesRestantes;

  return `${heuresFormat}:${minutesFormat}:${secondesFormat}`;
}

function selectStory(story, name, event) {

  var audioPath = useConvertPath(name + '/assets/' + story.audio)
  var audioSlidePath = useConvertPath(name + '/assets/' + story.audioSlide)

  if (!event.srcElement.parentElement.classList.contains('selectedWrapper')) {
    event.srcElement.parentElement.classList.add('selectedWrapper');
    storyStore.selectedStories.push(audioPath)
    useReadAudioSleepModeSlide(audioSlidePath)
  }
  else {
    event.srcElement.parentElement.classList.remove('selectedWrapper');
    let index = storyStore.selectedStories.indexOf(audioPath);
    storyStore.selectedStories.splice(index, 1);
  }
  useCountTime()
}


function playStories() {
  useReadAudioSleepModeStories()
  modalIsOpen.value.$el.present();
}

function stopStories() {
  modalIsOpen.value.$el.dismiss();
  storyStore.storyAudioSleepModeHowl.unload()
  storyStore.selectedStories = []
  storyStore.sleepModeTotalTime = 0
  const checkboxInputs = document.querySelectorAll('input.checkbox-input');
  checkboxInputs.forEach(input => {
    input.removeAttribute('checked');
  });

  const selectedWrappers = document.querySelectorAll('.selectedWrapper');
  selectedWrappers.forEach(el => {
    el.classList.remove('selectedWrapper')
  });
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

.selectedWrapper> label:before {
  transform: scale(1);
  z-index: 1
}

.selectedWrapper>label img {
  transform: scale(0.8);
  z-index: -1;
  box-shadow: 9px 6px 8px orange;
}

.full-height {
  min-height: 100%;
}
</style>