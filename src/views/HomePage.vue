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
              @swiper="onSwiper">
              <swiper-slide v-for="(slide, index) in storyStore.activeSlides" :key="index">
                <ion-img @click="storeActiveStoryIndex(index), handleSlideClick(slide.actionNode)"
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
// import { useReadAudioActiveSlide, useRreadAudioActiveSlideSet, useReadAudioStory } from '../composables/readAudio';
import { useStoryStore } from '../stores/StoryStores';
import { useReadAudioActiveSlide } from '../composables/readAudio';
const storyStore = useStoryStore();

const modules = [EffectFlip];

onMounted(() => {
  storyStore.fillStoriesIndex()
  storyStore.$subscribe((mutation) => {
    if (mutation.events.key == "stories" && mutation.events.type == "set") {
      storyStore.fillIndexSlides()
      console.log('test');
    }
  })

  storyStore.swiper.on('realIndexChange', function (swiper) {
    var convertedPath = useConvertPath(storyStore.activeSlides[swiper.realIndex].storyName + '/assets/' + storyStore.activeSlides[swiper.realIndex].audio)
    useReadAudioActiveSlide(convertedPath)
  });

});


function debug() {
  console.log(storyStore.stories);
  // console.log(storyStore.activeSlides);
  // console.log(storyStore.slidesVisible);
}

function onSwiper(swiper) {
  storyStore.swiper = swiper
  // var convertedPath = useConvertPath(storyStore.activeSlides[swiper.realIndex].storyName + '/assets/' + storyStore.activeSlides[swiper.realIndex].audio)
  // useReadAudioActiveSlide(convertedPath)
}

// function storeActiveStoryIndex(index) {
//   if (activeStoryIndex.value !== null) {
//     activeStoryIndex.value = index;
//   }
// }
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
