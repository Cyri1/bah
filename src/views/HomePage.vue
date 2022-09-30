<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-button class="preferences" icon-only color="warning" v-show="true"
          @click="() => router.push('/preferences/tab1')" size="small">
          <ion-icon :icon="settingsOutline" size="small"></ion-icon>
        </ion-button>
        <ion-row class="ion-align-items-center ion-justify-content-center main-row">
          <ion-col class="ion-align-items-center ion-text-center" size="2">
            <ion-button class="big-buttons" @click="homeButton" icon-only color="warning" size="large">
              <ion-icon :icon="home" size="large"></ion-icon>
            </ion-button>
            <button @click="debug" v-show="true" color="primary">
              log datas
            </button>
            <button @click="audioToEnd" v-show="true" color="primary">
              Audio to end
            </button>
          </ion-col>
          <ion-col size="8">
            <swiper :loop="true" v-show="storyStore.slidesVisible" :modules="modules" :effect="'flip'"
              @swiper="onSwiper" @realIndexChange="useReadAudioActiveSlide()">
              <swiper-slide v-for="(slide, index) in storyStore.activeSlides" :key="index">
                <ion-img @click="storeActiveStoryIndex(index), handleSlideClick(slide.okTransition)"
                  :src="useConvertPath(slide.name + '/assets/' + slide.image)">
                </ion-img>
              </swiper-slide>
            </swiper>
          </ion-col>
          <ion-col size="2">
            <ion-button @click="pauseButton" class="big-buttons" icon-only color="warning" size="large">
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
import { useRouter } from 'vue-router';
import {
  IonImg,
  IonButton,
  IonContent,
  IonPage,
  IonCol,
  IonGrid,
  IonRow,
  alertController,
  IonIcon,
} from "@ionic/vue";
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
import { useReadAudioActiveSlide, useReadAudioActiveSlideSet, useReadAudioStory, initHowlers } from '../composables/readAudio';
import { findNextStageNodes, findNextActionNode, detectTypeOfStageNode, displaySlideSet } from '../composables/handleSlideClick';
const storyStore = useStoryStore();
const modules = [EffectFlip];
const router = useRouter();

onMounted(() => {
  storyStore.fillStoriesIndex()
  initHowlers();
  window.screen.orientation.lock("landscape");
  window.plugins.insomnia.keepAwake();
});

storyStore.$subscribe((mutation) => {
  if (mutation.events.key === 'stories' && mutation.events.type === 'set') {
    storyStore.fillIndexSlides()
  }
  if (mutation.events.key === 'previousTranslate' && mutation.events.type === 'set' && mutation.events.oldValue === 0) {
    storyStore.swiper.slideToLoop(0, 100, false)
    storyStore.swiper.emit('realIndexChange')
  }
  if (mutation.events.key === 'errors') {
    (async () => {
      const alert = await alertController.create({
        header: 'Erreur(s) lors de la lecture des packs d\'histoires :',
        message: storyStore.errors.join('<br><br>'),
        buttons: ['OK'],
        cssClass: 'alert-size',
      });
      await alert.present();
    })();
  }
})



function debug() {
  console.log(storyStore.stories)
  console.log(storyStore.activeSlides)
  console.log(storyStore.swiper);
}

function audioToEnd() {
  console.log(storyStore.storyAudioHowl.seek())
  storyStore.storyAudioHowl.seek(storyStore.storyAudioHowl.duration() - 3)
}

function homeButton() {
  storyStore.activeAudioSlideHowl.stop()
  storyStore.activeAudioSlideSetHowl.stop()
  storyStore.storyAudioHowl.unload()
  storyStore.storyAudioHowl._queue = []
  storyStore.storyAudioHowl._src = [null]
  storyStore.slidesVisible = true
  if (storyStore.homeTransition === null) {
    storyStore.activeStoryIndex = null
    storyStore.fillIndexSlides()
    storyStore.swiper.slideToLoop(0, 0, true)
    storyStore.swiper.emit('realIndexChange')
  }
  else {
    handleSlideClick(storyStore.homeTransition)
  }
}

function pauseButton() {
  return storyStore.storyAudioHowl.playing() ? storyStore.storyAudioHowl.pause() : storyStore.storyAudioHowl.play();
}

function onSwiper(swiper) {
  storyStore.swiper = swiper
}

function storeActiveStoryIndex(index) {
  if (storyStore.activeStoryIndex === null) {
    storyStore.activeStoryIndex = index;
  }
}

function handleSlideClick(okTransition) {
  console.log('////HANDLING CLICK////')
  console.log('searching nextStageNode with okTransition...')
  console.log(okTransition)
  console.log('......................')
  var nextStageNodes = findNextStageNodes(okTransition)
  console.log('found nextStageNodes :')
  console.log(nextStageNodes)
  console.log('......................')
  console.log('searching nextActionNode with nextStageNodes...')
  var nextActionNode = findNextActionNode(nextStageNodes)
  console.log('found nextActionNode  :')
  console.log(nextActionNode)
  console.log('......................')
  console.log('detecting type of actionNode...')
  var typeOfActionNode = detectTypeOfStageNode(nextActionNode)
  console.log('detected type of action node :')
  console.log(typeOfActionNode)
  console.log('/////////////////////')

  if (typeOfActionNode.type === 'audioSlideSet') {
    useReadAudioActiveSlideSet(nextActionNode.audio)
    storyStore.homeTransition = nextActionNode.homeTransition
    storyStore.swiper.slideToLoop(0, 0, false)
    storyStore.activeAudioSlideSetHowl.once('end', function () {
      storyStore.isAudioActiveSlideSetPlaying = false
      storyStore.swiper.emit('realIndexChange')
    })
    handleSlideClick(nextActionNode.okTransition)
  }
  else if (typeOfActionNode.type === 'displaySlideSet') {
    displaySlideSet(okTransition)
    storyStore.slidesVisible = true
    storyStore.swiper.slideToLoop(0, 0, true)
  }
  else if (typeOfActionNode.type === 'endOfStory') {
    homeButton()
    storyStore.slidesVisible = true
  }
  else if (typeOfActionNode.type === 'audioStory') {
    useReadAudioStory(nextActionNode.audio)
    storyStore.slidesVisible = false
    storyStore.homeTransition = nextActionNode.homeTransition
    storyStore.storyAudioHowl.once('end', function () {
      if (nextActionNode.okTransition !== null) {
        handleSlideClick(nextActionNode.okTransition)
      } else {
        homeButton()
        storyStore.slidesVisible = true
      }
    })
  }
  else {
    console.log('no match')
  }
}

</script>

<style scoped>
ion-content {
  --background: #0ec6d2;
}

.main-row {
  height: 100vh;
}

.alert-size {
  --min-width: 90%;
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
