import { useStoryStore } from '../stores/StoryStores';
import { Capacitor } from '@capacitor/core';

export function useConvertPath(path) {
  const storyStore = useStoryStore();

  var fullPath = storyStore.storagePath + path;
  var convertedPath = Capacitor.convertFileSrc(fullPath);
  return convertedPath;
}
