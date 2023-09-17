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

  const options = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data)
  }

  const options2 = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const fetchResponse = await fetch(`https://hostmyscripts.000webhostapp.com/stats.php`, options);
    await fetchResponse;
  } catch (e) {
    console.log(e);
  }

  try {
    const fetchResponse = await fetch(`https://api.github.com/repos/cyri1/bah/releases/latest`, options2);
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
})();

</script>