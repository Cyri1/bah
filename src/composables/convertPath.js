import { Directory } from '@capacitor/filesystem';
import { Capacitor } from "@capacitor/core";
import { ref } from 'vue';

const basePath = "/storage/emulated/0/";
const directory = Directory.Documents;

export function useConvertPath(file, storyName) {
    const convertedPath = ref(null);
    var path = basePath + directory + "/packs/" + storyName + "/assets/" + file
    convertedPath.value = Capacitor.convertFileSrc(path)
    return convertedPath.value;
  }