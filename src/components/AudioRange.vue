
<template>
    <ion-grid>
        <ion-row>
            <ion-col size="2">
                <ion-badge class="margin-10" :color="storyStore.theme + 'sec'">
                    {{ new Date(storyStore.howlerCurrentPos * 1000).toISOString().substring(14, 19)}}/
                {{ new Date(storyStore.storyDuration * 1000).toISOString().substring(14, 19)}}
                </ion-badge>
            </ion-col>
            <ion-col>
                <ion-range class="audio-timeline" :pin="false" :max="storyStore.storyDuration-2"
                    :value="parseInt(storyStore.howlerCurrentPos)" @ionKnobMoveStart="onIonKnobMoveStart"
                    @ionKnobMoveEnd="onIonKnobMoveEnd" :color="storyStore.theme + 'sec'">
                </ion-range>
            </ion-col>
        </ion-row>
    </ion-grid>
</template>

<script setup>
import {
    IonRange,
    IonBadge,
    IonGrid,
    IonCol,
    IonRow,
} from "@ionic/vue";
import { useStoryStore } from '../stores/StoryStores';

const storyStore = useStoryStore();

function onIonKnobMoveStart() {
    console.log(storyStore.storyAudioHowl);
    if (storyStore.storyAudioHowl.playing()) {
        storyStore.storyAudioHowl.pause()
        storyStore.howlerIsPlaying = true
    }
}

function onIonKnobMoveEnd({ detail }) {
    console.log(storyStore.storyDuration);
    storyStore.storyAudioHowl.seek(detail.value)
    storyStore.storyAudioHowl.play()
    storyStore.howlerIsPlaying = false
}

</script>

<style scoped>
ion-range::part(pin) {
    top: 50px !important;
    margin: 2px;
    z-index: 999;
}

.range-has-pin {
    padding-top: 0px !important;
    border-radius: 50%;
}

.audio-timeline {
    --bar-height: 8px;
    --bar-border-radius: 8px;
    --knob-size: 40px;
}

.margin-10 {
    margin-left: 10px;
    margin-top: 10px;
}
</style>