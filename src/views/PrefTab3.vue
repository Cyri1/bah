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
          <ion-button v-show="true" slot="start" @click="setOpen(true)">Activer le mode sommeil</ion-button>
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
    <ion-modal :is-open="storyStore.sleepModeModalIsOpen">
      <ion-header>
        <ion-toolbar>
          <ion-title>Mode sommeil</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="setOpen(false)">Fermer</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-accordion-group>
          <ion-accordion v-for="(node, index) in storyStore.sortedStories" color="light" :key="index">
            <ion-item slot="header" color="light">
              <ion-label>{{ node[0] }}</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">
              <span class="wrapper" v-for="(story, index) in node[1]" :key="index">
                <input type="checkbox" @click="selectStory(useConvertPath(node[0] + '/assets/' + story.audio), $event)" class="checkbox-input" :id="node[0]+'-'+index" />
                <label :for="node[0]+'-'+index">
                  <img :src="useConvertPath(node[0] + '/assets/' + story.icon)" />
                </label>
              </span>
            </div>
          </ion-accordion>
        </ion-accordion-group>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>
  
<script setup>
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
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
  IonButton,
  IonAccordion,
  IonAccordionGroup,
} from "@ionic/vue";
import { onMounted } from "vue";
import { Preferences } from '@capacitor/preferences';
import { useStoryStore } from '../stores/StoryStores';
import { useListStoryNodes } from '../composables/listStoryNodes';
import { useConvertPath } from '../composables/convertPath';

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

function setOpen(isOpen) {
  useListStoryNodes()
  storyStore.sleepModeModalIsOpen = isOpen;
  console.log(storyStore.sortedStories);
}
function selectStory(audioPath, event) {
  console.log('selected = '+event.srcElement.checked);
  if(event.srcElement.checked) {
    console.log('adding = '+audioPath);
    storyStore.selectedStories.push(audioPath)
  }
  else {
    let index = storyStore.selectedStories.indexOf(audioPath);
    storyStore.selectedStories.splice(index, 1);
    console.log('removing = '+audioPath);

  }
  console.log(storyStore.selectedStories);
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

.wrapper> :checked+label:before {
  transform: scale(1);
  z-index: 1
}

.wrapper> :checked+label img {
  transform: scale(0.8);
  z-index: -1;
}
</style>