import { Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

const basePath = '/storage/emulated/0/';
const directory = Directory.Documents;

export function useConvertPath(path) {
  var fullPath = basePath + directory + '/packs/' + path;
  var convertedPath = Capacitor.convertFileSrc(fullPath);
  return convertedPath;
}
