<template>
  <ion-page>
    <ion-content :color="storyStore.isBoxMode ? 'dark' : storyStore.theme + 'prim'" :fullscreen="true">
      <ion-grid class="ion-no-padding full-height">
        <ion-row class="top-row">
          <ion-col size="10">
            <AudioRange v-show="storyStore.timelineVisible && !storyStore.slidesVisible">
            </AudioRange>
          </ion-col>
          <ion-col size="2">
            <ion-button class="preferences" :color="storyStore.isBoxMode ? 'medium' : storyStore.theme + 'sec'" icon-only
              @pointerdown="storeClickTs($event._vts)" @pointerup="prefButton($event._vts)" size="small">
              <ion-icon :icon="settingsOutline" size="small"></ion-icon>
            </ion-button>
          </ion-col>
        </ion-row>
        <ion-row class="middle-row ion-text-center">
          <ion-col size="2" class="ion-align-self-center" v-show="!storyStore.isBoxMode">
            <ion-button class="big-buttons" :color="storyStore.theme + 'sec'" @click="homeButton" icon-only size="large">
              <ion-icon :icon="home" size="large"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col size="2" class="ion-align-self-end" v-show="storyStore.isBoxMode">
            <ion-button color="medium" class="box-buttons-big" @click="homeButton" icon-only size="large">
              <ion-icon :icon="home" size="large"></ion-icon>
            </ion-button>
            <ion-button color="medium" class="box-buttons-big" :disabled="!storyStore.slidesVisible" @click="storyStore.swiper.slidePrev()" icon-only size="large">
              <ion-icon :icon="arrowBack" size="large"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col class="ion-align-self-center" size="8">
            <swiper :loop="true" v-show="storyStore.slidesVisible" :modules="modules" :effect="'flip'" @swiper="onSwiper"
              @realIndexChange="useReadAudioActiveSlide()">
              <swiper-slide v-for="(slide, index) in storyStore.activeSlides" :key="index">
                <ion-img @click="storeActiveStoryIndex(index), handleSlideClick(slide.okTransition)"
                  :src="useConvertPath(slide.name + '/assets/' + slide.image)">
                </ion-img>
              </swiper-slide>
            </swiper>
          </ion-col>
          <ion-col size="2" class="ion-align-self-center" v-show="!storyStore.isBoxMode">
            <ion-button v-show="!storyStore.isBoxMode" @click="pauseButton" class="big-buttons"
              :color="storyStore.theme + 'sec'" icon-only size="large">
              <ion-icon :icon="pauseSharp" size="large" v-show="!storyStore.howlerIsPlaying"></ion-icon>
              <ion-icon :icon="playOutline" size="large" v-show="storyStore.howlerIsPlaying"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col class="ion-align-self-end" size="2" v-show="storyStore.isBoxMode">
            <ion-button v-show="storyStore.isBoxMode" @click="pauseButton" class="box-buttons-small" color="medium" icon-only size="large">
              <ion-icon :icon="pauseSharp" size="large" v-show="!storyStore.howlerIsPlaying"></ion-icon>
              <ion-icon :icon="playOutline" size="large" v-show="storyStore.howlerIsPlaying"></ion-icon>
            </ion-button>
            <ion-button v-show="storyStore.isBoxMode" :disabled="!storyStore.slidesVisible" @click="slideClick()" class="box-buttons-small" color="medium" icon-only size="large">
              <ion-icon :icon="checkmark" size="large"></ion-icon>
            </ion-button>
            <ion-button v-show="storyStore.isBoxMode" :disabled="!storyStore.slidesVisible" @click="storyStore.swiper.slideNext()" color="medium" class="box-buttons-big" icon-only size="large">
              <ion-icon :icon="arrowForward" size="large"></ion-icon>
            </ion-button>
            <Console :data="console.value"  type="log" />
          </ion-col>
        </ion-row>
        <ion-row class="bottom-row">
          <ion-col size="6">
            <ion-img v-show="!storyStore.isBoxMode" class="img-theme1"
              :src="'./assets/theme/' + storyStore.theme + '1.png'"></ion-img>
          </ion-col>
          <ion-col size="6">
            <ion-img v-show="!storyStore.isBoxMode" class="img-theme2"
              :src="'./assets/theme/' + storyStore.theme + '2.png'"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { onMounted, onBeforeMount } from "vue";
import { useRouter } from 'vue-router';
import AudioRange from '../components/AudioRange.vue'
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
import { home, playOutline, pauseSharp, settingsOutline, arrowForward, arrowBack, checkmark } from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-flip";
import "@ionic/vue/css/ionic-swiper.css";
import { EffectFlip } from "swiper";
import { useConvertPath } from '../composables/convertPath';
import { usePermissionsCheck } from '../composables/permissionsCheck';
import { useReadAudioActiveSlide, useReadAudioActiveSlideSet, useReadAudioStory, initHowlers } from '../composables/readAudio';
import { findNextStageNodes, findNextActionNode, detectTypeOfStageNode, displaySlideSet } from '../composables/handleSlideClick';
import { useStoryStore } from '../stores/StoryStores';
import { Console, DataAPI } from "vue-console-feed"
import "vue-console-feed/style.css"

const storyStore = useStoryStore();
const console = new DataAPI(false, 0) // if you use API set option to true, argument 2 offset deep location

const modules = [EffectFlip];
const router = useRouter();
onBeforeMount(() => {
  initHowlers();
  storyStore.setPreferences()
})

onMounted(() => {
  usePermissionsCheck().then((result) => {
    if (!result) {
      (async () => {
        const alert = await alertController.create({
          header: 'Permissions insuffisantes',
          subHeader: 'L\'application à besoin de permissions supplémentaires pour fonctionner.',
          message: `Veuillez accorder l'autorisation "<strong>Autoriser la gestion de tous les fichiers</strong>".`,
          buttons: [
            {
              text: 'Ouvrir les paramètres de l\'appli',
              handler: () => {
                window.cordova.plugins.settings.open("application_details", function () { })
              },
            },
            {
              text: 'OK',
            },
          ],
          cssClass: 'alert-size',
        });
        await alert.present();
      })();
    }
  })
  storyStore.fillStoriesIndex()
})


router.afterEach((to) => {
  if (to.name === 'Home') {
    storyStore.fillStoriesIndex()
  }
})

storyStore.$subscribe((mutation) => {
  if (mutation.events?.key === 'errors') {
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
var prefDownTS;
function storeClickTs(ts) {
  prefDownTS = ts
}

function homeButton() {
  storyStore.activeAudioSlideHowl.stop()
  storyStore.activeAudioSlideSetHowl.stop()
  storyStore.storyAudioHowl.unload()
  storyStore.howlerIsPlaying = false
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

function prefButton(prefUpTS) {
  console.log(prefUpTS - prefDownTS);
  if ((prefUpTS - prefDownTS) > 200) {

    oldOkTransition = null
    storyStore.activeAudioSlideHowl.stop()
    storyStore.activeAudioSlideSetHowl.stop()
    storyStore.storyAudioHowl.unload()
    storyStore.howlerIsPlaying = false
    storyStore.storyAudioHowl._queue = []
    storyStore.storyAudioHowl._src = [null]
    storyStore.slidesVisible = true
    router.push('/preferences/download')
  }
}

function pauseButton() {
  if (storyStore.storyAudioHowl.playing()) {
    storyStore.storyAudioHowl.pause()
    storyStore.howlerIsPlaying = true
  }
  else {
    storyStore.storyAudioHowl.play()
    storyStore.howlerIsPlaying = false
  }

}
function slideClick() {
  document.getElementsByClassName('swiper-slide-active')[0].getElementsByTagName("ion-img")[0].click()
}

function onSwiper(swiper) {
  storyStore.swiper = swiper
}

function storeActiveStoryIndex(index) {
  if (storyStore.activeStoryIndex === null) {
    storyStore.activeStoryIndex = index;
  }
}

var oldOkTransition;
function handleSlideClick(okTransition) {
  console.log('////HANDLING CLICK////')
  if ((okTransition?.actionNode === oldOkTransition?.actionNode) && (okTransition?.optionIndex === oldOkTransition?.optionIndex)) {
    console.log('preventing home button loop')
    console.log('actionNode :')
    console.log(okTransition?.actionNode)
    console.log('old actionNode :')
    console.log(oldOkTransition?.actionNode)
    console.log('/*/*/*/*/*/*/*/*/*/*/*/*')
    console.log('optionIndex :')
    console.log(okTransition?.optionIndex)
    console.log('old optionIndex :')
    console.log(oldOkTransition?.optionIndex)
    storyStore.homeTransition = null
    oldOkTransition = null
    homeButton()
    return
  }
  console.log(okTransition)
  console.log(oldOkTransition)
  oldOkTransition = okTransition;
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
    setInterval(function () {
      storyStore.howlerCurrentPos = storyStore.storyAudioHowl.seek()
    }, 1000)
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

<style>
.top-row {
  height: 10%;
}

.middle-row {
  height: 80%;
}

.bottom-row {
  height: 10%;
}

.full-height {
  height: 100vh;
}

.alert-size {
  --min-width: 90%;
}

.img-theme1 {
  position: absolute;
  bottom: 0px;
  left: 10px;
  z-index: -1;
}

.img-theme2 {
  position: absolute;
  bottom: 0px;
  right: 10px;
  z-index: -1;
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

.box-buttons-big {
  height: 120px;
  width: 100%;
}

.box-buttons-small {
  height: 60px;
  width: 100%;
}
</style>
