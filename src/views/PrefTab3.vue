<template>
  <ion-page>
    <ion-content class="ion-padding ion-margin-bottom" color="light">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Paramètres de l'interface :</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label>Afficher la timeline :</ion-label>
              <ion-toggle slot="end" @ionChange="activeTimeline" :checked="storyStore.timelineVisible"></ion-toggle>
            </ion-item>
            <ion-item>
              <ion-label>Choix du thème :</ion-label>
              <ion-select @ionChange="changeTheme" placeholder="Choisissez un thème">
                <ion-select-option value="lunii">Lunii</ion-select-option>
                <ion-select-option value="spiderman">Spiderman</ion-select-option>
                <ion-select-option value="rdn">Reine des neiges</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Paramètres du store :</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label position="floating">Mot de passe contributeur :</ion-label>
              <ion-input @ionBlur="changeContributorPwd" type="password" :value="storyStore.contributorPwd"
                placeholder="Entrer le mot de passe"></ion-input>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonList,
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
  storyStore.theme = event.srcElement.value;
}

function changeContributorPwd(event) {
  Preferences.set({
    key: 'contributorPwd',
    value: event.srcElement.value,
  })
  storyStore.contributorPwd = event.srcElement.value

  Preferences.get({ key: 'contributorPwd' }).then((result) => {
    console.log(result);
  });

}

function activeTimeline(event) { 
  Preferences.set({
    key: 'timelineVisible',
    value: String(event.detail.checked),
  })
  storyStore.timelineVisible = event.detail.checked
}

</script>