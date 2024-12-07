import { getStoredResults, setStoredResults, appendNewResults, clearStoredResults } from '../utils/storage_utils.js';

// Define the rule to add custom headers
const rule = {
  id: 1,
  priority: 1,
  action: {
    type: 'modifyHeaders',
    requestHeaders: [
      { header: 'X-Bluesky-Checker', operation: 'set', value: 'true' },
      { header: 'X-Extension-Version', operation: 'set', value: '1.0.0' }
    ]
  },
  condition: {
    urlFilter: 'https://public.api.bsky.app/*',
    resourceTypes: ['xmlhttprequest']
  }
};

// Register the rule on extension installation
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [rule],
    removeRuleIds: [1] // Remove any existing rule with the same ID
  });

  // Initialize 'results' if it doesn't exist
  chrome.storage.local.get(['results'], (result) => {
    if (!result.results) {
      chrome.storage.local.set({ results: [] }, () => {
        if (chrome.runtime.lastError) {
          console.error('Error initializing results:', chrome.runtime.lastError);
        } else {
          console.log('Initialized results in storage.');
        }
      });
    }
  });
});

// Listen to web requests and add custom headers
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    // Add custom headers
    details.requestHeaders.push(
      { name: 'X-Bluesky-Checker', value: 'true' },
      { name: 'X-Extension-Version', value: '1.0.0' }
    );
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ['https://public.api.bsky.app/*'] },
  ['requestHeaders', 'extraHeaders', 'blocking']
);