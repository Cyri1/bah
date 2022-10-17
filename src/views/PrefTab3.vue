<template>
  <ion-page>
    <ion-content class="ion-padding ion-margin-bottom">
      <ion-title color="danger">Under construction</ion-title>
      <button @click="debug" v-show="false" color="primary">
        log prefs
      </button>
      <ion-item>
        <ion-label position="floating">Mot de passe contributeur :</ion-label>
        <ion-input @ionBlur="changeContributorPwd" type="password" :value="storyStore.contributorPwd"
          placeholder="Entrer le mot de passe"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Choix du thème :</ion-label>
        <ion-select @ionChange="changeTheme" placeholder="Choisissez un thème">
          <ion-select-option value="lunii">Lunii</ion-select-option>
          <ion-select-option value="spiderman">Spiderman</ion-select-option>
          <ion-select-option value="rdn">Reine des neiges</ion-select-option>
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
import { onMounted } from "vue";
import { Preferences } from '@capacitor/preferences';
import { useStoryStore } from '../stores/StoryStores';
const storyStore = useStoryStore();


onMounted(() => {
  Preferences.get({ key: 'contributorPwd' }).then((result) => {
    storyStore.contributorPwd = result.value;
  })
})


function changeTheme(event) {
  Preferences.set({
    key: 'theme',
    value: event.srcElement.value,
  })
  console.log(event);
}

function changeContributorPwd(event) {
  Preferences.set({
    key: 'contributorPwd',
    value: event.srcElement.value,
  })
  storyStore.contributorPwd = event.srcElement.value
  console.log(storyStore.contributorPwd);
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