// storage_utils.js

/**
 * Function to get stored results
 */
export function getStoredResults() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['results'], (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(result.results || []);
    });
  });
}

/**
 * Function to set stored results
 */
export function setStoredResults(results) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ results }, () => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve();
    });
  });
}

/**
 * Function to append new results to stored results, ensuring latest are first
 */
export async function appendNewResults(newResults) {
  const storedResults = await getStoredResults();
  const existingHandles = new Set(storedResults.map(actor => actor.handle));

  // Filter newResults to exclude duplicates
  const filteredNewResults = newResults.filter(actor => !existingHandles.has(actor.handle));

  // Prepend the filtered new results to stored results
  const combinedResults = [...filteredNewResults, ...storedResults];

  await setStoredResults(combinedResults);
  return combinedResults;
}

/**
 * Function to clear stored results
 */
export function clearStoredResults() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove('results', () => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve();
    });
  });
}
