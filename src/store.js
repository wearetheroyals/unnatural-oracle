import { writable, derived } from 'svelte/store';

export const useMockData = writable();
export const isLoading = writable(false);
export const contentItemIndex = writable([]);
export const hasContentItemIndex = derived(
  contentItemIndex,
  $contentItemIndex => $contentItemIndex.length > 0
);
