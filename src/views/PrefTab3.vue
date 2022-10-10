<template>
  <ion-page>
    <ion-content class="ion-padding ion-margin-bottom">
      <ion-title color="danger">Under construction</ion-title>
      <button @click="debug" v-show="true" color="primary">
        log prefs
      </button>
      <ion-item>
        <ion-label position="floating">Mot de passe contributeur :</ion-label>
        <ion-input placeholder="Entrer le mot de passe"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Choix du thème :</ion-label>
        <ion-select @ionChange="changeTheme" placeholder="Make a Selection">
          <ion-select-option value="lunii">Lunii</ion-select-option>
          <ion-select-option value="spiderman">Spiderman</ion-select-option>
          <ion-select-option value="reine_des_neiges">Reine_des_neiges</ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item>
        <ion-label>Option XXX</ion-label>
        <ion-toggle slot="end"></ion-toggle>
      </ion-item>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import {
  IonContent,
  IonPage,
  IonTitle,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonToggle,
  IonInput,
} from "@ionic/vue";
import { Preferences } from '@capacitor/preferences';
import { useStoryStore } from '../stores/StoryStores';
const storyStore = useStoryStore();

function changeTheme(event) {
  Preferences.set({
    key: 'theme',
    value: event.detail.value,
  })
  console.log(event);
}

function debug() {
  console.log(storyStore.theme);
}


</script>
  
<style scoped>
ion-content {
  --background: #f8f8f8;
  --color: black;
}
</style>