<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { useStoryStore } from './stores/StoryStores';
import { usePopup } from './composables/popup';

const storyStore = useStoryStore();

(async function () {
  const deviceId = await Device.getId();
  const deviceInfo = await Device.getInfo();
  const appInfo = await App.getInfo();

  let data = {
    deviceId: deviceId.identifier,
    sdk: deviceInfo.androidSDKVersion,
    isVirtual: deviceInfo.isVirtual,
    manufacturer: deviceInfo.manufacturer,
    model: deviceInfo.model,
    name: deviceInfo.name,
    os: deviceInfo.operatingSystem,
    osVersion: deviceInfo.osVersion,
    webViewVersion: deviceInfo.webViewVersion,
    appBuild: appInfo.build,
    appVersion: appInfo.version
  };

  const stats = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data)
  }

  const appVersion = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const popup = {
    method: 'GET',
  }

  try {
    const fetchResponse = await fetch(`https://hostmyscripts.000webhostapp.com/stats.php`+'?'+Date.now(), stats);
    await fetchResponse;
  } catch (e) {
    console.log(e);
  }

  try {
    const fetchResponse = await fetch(`https://api.github.com/repos/cyri1/bah/releases/latest`+'?'+Date.now(), appVersion);
    await fetchResponse;
    let response = await fetchResponse.json();
    let gitVersion = response.tag_name
    storyStore.deviceInfos = {
      deviceId: deviceId.identifier,
      appVersion: appInfo.version,
      gitVersion: gitVersion
    }
    
    if (gitVersion === appInfo.version) {
      storyStore.IsUpToDate = true;
    }
  } catch (e) {
    console.log(e);
  }

  try {
    const fetchResponse = await fetch(`https://gist.githubusercontent.com/Cyri1/ec56bb526a7de9182b8dbb04ef549479/raw/popup.json`+'?'+Date.now(), popup);
    await fetchResponse;
    storyStore.popup = await fetchResponse.json();
    await usePopup()
  } catch (e) {
    console.log(e);
  }
  
})();

</script>