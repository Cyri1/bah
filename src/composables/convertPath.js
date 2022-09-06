import { Directory } from '@capacitor/filesystem';
import { Capacitor } from "@capacitor/core";
import { ref } from 'vue';

const basePath = "/storage/emulated/0/";
const directory = Directory.Documents;

export function useConvertPath(path) {
    const convertedPath = ref(null);
    var fullPath = basePath + directory + "/packs/" + path
    convertedPath.value = Capacitor.convertFileSrc(fullPath)
    return convertedPath.value;
  }