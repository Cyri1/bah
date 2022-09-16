<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-button class="preferences" icon-only color="warning" v-show="false" size="small">
          <ion-icon :icon="settingsOutline" size="small"></ion-icon>
        </ion-button>
        <ion-row class="ion-align-items-center ion-justify-content-center main-row">
          <ion-col class="ion-align-items-center ion-text-center" size="2">
            <ion-button class="big-buttons" @click="stop" icon-only color="warning" size="large">
              <ion-icon :icon="home" size="large"></ion-icon>
            </ion-button>
            <button @click="debug" v-show="true" color="primary">
              log datas
            </button>
          </ion-col>
          <ion-col size="8">
            <swiper :loop="true" v-show="storyStore.slidesVisible" :modules="modules" :effect="'flip'"
              @swiper="onSwiper" @realIndexChange="onRealIndexChange">
              <swiper-slide v-for="(slide, index) in storyStore.activeSlides" :key="index">
                <ion-img @click="storeActiveStoryIndex(index), handleSlideClick(slide.okTransition)"
                  :src="useConvertPath(slide.storyName + '/assets/' + slide.image)">
                </ion-img>
              </swiper-slide>
            </swiper>
          </ion-col>
          <ion-col size="2">
            <ion-button @click="pause" class="big-buttons" icon-only color="warning" size="large">
              <ion-icon :icon="pauseSharp" size="large"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { onMounted } from "vue";
import {
  IonImg,
  IonButton,
  IonContent,
  IonPage,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/vue";
import { IonIcon } from "@ionic/vue";
import { home } from "ionicons/icons";
import { pauseSharp } from "ionicons/icons";
import { settingsOutline } from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-flip";
import "@ionic/vue/css/ionic-swiper.css";
import { EffectFlip } from "swiper";
import { useConvertPath } from '../composables/convertPath';
import { useStoryStore } from '../stores/StoryStores';
// import { useReadAudioActiveSlide, useReadAudioActiveSlideSet, useReadAudioStory } from '../composables/readAudio';
import { useReadAudioActiveSlide, useReadAudioActiveSlideSet, initHowlers } from '../composables/readAudio';
import { findNextStageNodes, findNextActionNode, detectTypeOfStageNode, displaySlideSet } from '../composables/handleSlideClick';
const storyStore = useStoryStore();

const modules = [EffectFlip];

onMounted(() => {
  storyStore.fillStoriesIndex()
  initHowlers();
});
storyStore.$subscribe((mutation) => {
  if (mutation.events.key === 'stories' && mutation.events.type === 'set') {
    storyStore.fillIndexSlides()
  }
  if (mutation.events.key === 'previousTranslate' && mutation.events.type === 'set') {
    storyStore.swiper.slideToLoop(0, 100, true)
    storyStore.swiper.emit('realIndexChange')
  }
})



function debug() {
  console.log(storyStore.stories)
  console.log(storyStore.activeSlides)
}



function onSwiper(swiper) {
  storyStore.swiper = swiper
}

function onRealIndexChange() {
  useReadAudioActiveSlide()
}

function storeActiveStoryIndex(index) {
    storyStore.activeStoryIndex = index;
}

function handleSlideClick(okTransition) {
  console.log('////HANDLING CLICK////')
  console.log(okTransition)
  var nextStageNodes = findNextStageNodes(okTransition)
  var nextActionNode = findNextActionNode(nextStageNodes)
  var typeOfActionNode = detectTypeOfStageNode(nextActionNode)
  if(typeOfActionNode.type === 'audioSlideSet') {
    console.log('audioSlideSet');
    // console.log('nextActionNode :')
    // console.log(nextActionNode)
    // console.log('nextStageNodes :')
    // console.log(nextStageNodes)
    useReadAudioActiveSlideSet(nextActionNode.audio)
    handleSlideClick(nextActionNode.okTransition)
    // console.log(typeOfActionNode.okTransition)
  }
  else if (typeOfActionNode.type === 'displaySlideSet') {
    console.log('displaySlideSet');
    displaySlideSet(okTransition)
  }
  else  {
    console.log('else');
  }
}

</script>

<style>
ion-content {
  --background: #0ec6d2;
}

.main-row {
  height: 100vh;
}

.preferences {
  position: absolute;
  top: 10px;
  right: 10px;
  --border-radius: 50%;
  --padding-start: 5px;
  --padding-end: 5px;
  --padding-bottom: 5px;
  --padding-top: 5px;
}

.big-buttons {
  transform: translateY(-50%);
  --border-radius: 50%;
  --padding-start: 35px;
  --padding-end: 35px;
  --padding-bottom: 45px;
  --padding-top: 45px;
}

ion-img::part(image) {
  filter: blur(1px);
  box-shadow: inset 0 0 0 1000px rgb(108, 255, 230);
}
</style>
