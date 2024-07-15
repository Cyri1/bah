import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { useStoryStore } from '../stores/StoryStores';

export function useLowBrightness() {
  return useCustomBrightness(0.0)
}

export function useHighBrightness() {
  return useCustomBrightness(1)
}

export function useDefaultBrightness() {
  return useCustomBrightness(1)
}

export function useCustomBrightness(brightness) {
  const storyStore = useStoryStore();
  if (!storyStore.isDynamicBrightness) {
    brightness = -1
  }
  ScreenBrightness.setBrightness({ brightness }).then()
}
