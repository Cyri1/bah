<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button class="ion-margin-start" default-href="../home"></ion-back-button>
        </ion-buttons>
        <ion-title>Préférences :</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding ion-margin-bottom" color="light">
      <ion-card>
        <ion-card-header>
          <ion-card-title>Paramètres de l'interface :</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-toggle slot="end" @ionChange="activeTimeline" :checked="storyStore.timelineVisible">Afficher la timeline</ion-toggle>
            </ion-item>
            <ion-item>
              <ion-toggle slot="end" @ionChange="activeButtonsMode" :checked="storyStore.isButtonsMode">Contrôle par boutons</ion-toggle>
            </ion-item>
            <ion-item>
              <ion-select label="Choix du thème :" @ionChange="changeTheme" placeholder="Choisissez un thème">
                <ion-select-option value="lunii">Lunii</ion-select-option>
                <ion-select-option value="spiderman">Spiderman</ion-select-option>
                <ion-select-option value="rdn">Reine des neiges</ion-select-option>
                <ion-select-option value="3dbox">Mode boîte impression 3D</ion-select-option>
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
          <ion-button size="small" @click="storiesListModalIsOpen(true)">Ajouter une liste d'histoires au
            store</ion-button>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-modal :is-open="storyStore.storiesListModalIsOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Ajouter des histoires au store</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="storiesListModalIsOpen(false)">Fermer</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-input id="url" label="URL de la liste d'histoire :" label-placement="floating"
            placeholder="Copier l'url ici..."></ion-input>
        </ion-item>
        <ion-button size="small" @click="addList">Ajouter</ion-button>
        <ion-item v-for="(url, index) in storyStore.remoteStoriesLists" :key="index">
          <ion-label class="ion-text-wrap">
            <ion-button size="small" color="danger" @click="remList(index)" shape="round">X</ion-button> {{ url }}
          </ion-label>
        </ion-item>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>
  
<script setup>
import {
  IonHeader,
  IonModal,
  IonLabel,
  IonInput,
  IonButtons,
  IonBackButton,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonCard,
  IonButton,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/vue";
import { Preferences } from '@capacitor/preferences';
import { useStoryStore } from '../stores/StoryStores';

const storyStore = useStoryStore();

function changeTheme(event) {
  Preferences.set({
    key: 'theme',
    value: event.srcElement.value,
  })
  storyStore.theme = event.srcElement.value;
}

function storiesListModalIsOpen(isOpen) {
  storyStore.storiesListModalIsOpen = isOpen
}

function addList() {
  storyStore.remoteStoriesLists.push(document.getElementById('url').value)
  document.getElementById('url').value = '';

  Preferences.set({
    key: 'storiesLists',
    value: JSON.stringify(storyStore.remoteStoriesLists),
  })
  Preferences.get({ key: 'storiesLists' }).then((result) => {
    console.log(result);
  });

}

function remList(index) {
  storyStore.remoteStoriesLists.splice(index, 1)

  Preferences.set({
    key: 'storiesLists',
    value: JSON.stringify(storyStore.remoteStoriesLists),
  })
}

function activeTimeline(event) {
  Preferences.set({
    key: 'timelineVisible',
    value: String(event.detail.checked),
  })
  storyStore.timelineVisible = event.detail.checked
}

function activeButtonsMode(event) {
  Preferences.set({
    key: 'isButtonsMode',
    value: String(event.detail.checked),
  })
  storyStore.isButtonsMode = event.detail.checked
}

</script>
