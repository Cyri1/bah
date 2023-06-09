<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="../home"></ion-back-button>
        </ion-buttons>
        <ion-title>Mes histoires :</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-margin-bottom" color="light">
      <ion-item color="light">
        <ion-text>Supprimez des packs d'histoires en cliquant sur <ion-icon color="danger" :icon="trash"></ion-icon> ou
          choisissez les packs qui apparaitront <ion-icon color="warning" :icon="bookmark"></ion-icon> ou non <ion-icon
            color="warning" :icon="bookmarkOutline"></ion-icon> dans le déroulé :
          <br>
          <br>
        </ion-text>
      </ion-item>
      <ion-item v-for="(file, index) in storyStore.installedPacks" color="light" :key="index">
        <ion-label>{{ file.name }}</ion-label>
        <ion-button @click="deleteStory(file.name)" slot="end" color="danger">
          <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
        </ion-button>
        <ion-button @click="unfavoriteStory(file.name)" slot="end"
          v-show="!storyStore.unfavoriteStories.includes(file.name)">
          <ion-icon slot="icon-only" color="warning" :icon="bookmark"></ion-icon>
        </ion-button>
        <ion-button @click="favoriteStory(file.name)" slot="end"
          v-show="storyStore.unfavoriteStories.includes(file.name)">
          <ion-icon slot="icon-only" color="warning" :icon="bookmarkOutline"></ion-icon>
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import { onMounted } from "vue";
import {
  IonHeader,
  IonButtons,
  IonBackButton,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonItem,
  IonButton,
  IonLabel,
  IonIcon,
  IonText,
} from "@ionic/vue";
import { useListInstalledPacks } from '../composables/listInstalledPacks';
import { trashOutline, bookmarkOutline, bookmark, trash } from "ionicons/icons";
import { useStoryStore } from '../stores/StoryStores';
import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory } from '@capacitor/filesystem';

const storyStore = useStoryStore();
onMounted(() => {
  useListInstalledPacks()
});

function unfavoriteStory(storyName) {
  storyStore.unfavoriteStories.push(storyName);
  Preferences.set({
    key: 'unfavoriteStories',
    value: JSON.stringify(storyStore.unfavoriteStories),
  })
}

function favoriteStory(storyName) {
  const newUnfavoriteStories = storyStore.unfavoriteStories.filter(function (value) {
    return value !== storyName;
  });
  storyStore.unfavoriteStories = newUnfavoriteStories
  Preferences.set({
    key: 'unfavoriteStories',
    value: JSON.stringify(storyStore.unfavoriteStories),
  })
}

function deleteStory(storyName) {
  try {
    Filesystem.rmdir({
      path: 'packs/' + storyName,
      directory: Directory.Documents,
      recursive: true,
    }).then(() => {
      console.log(storyStore.installedPacks);
      const newInstalledPacks = storyStore.installedPacks.filter(function (value) {
        return value.name !== storyName;
      });
      console.log(newInstalledPacks);
      storyStore.installedPacks = newInstalledPacks
    });
  } catch (err) {
    console.log('error removing packs dir ' + storyName);
  }
}

</script>
