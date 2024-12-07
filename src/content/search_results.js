// search_results.js

export async function searchLocalResults(query) {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['results'], (result) => {
        if (chrome.runtime.lastError) {
          return reject(chrome.runtime.lastError);
        }
        const storedResults = result.results || [];
        if (!query) {
          resolve(storedResults);
          return;
        }
        const filteredResults = storedResults.filter(actor =>
          actor.displayName.toLowerCase().includes(query.toLowerCase()) ||
          actor.handle.toLowerCase().includes(query.toLowerCase()) ||
          (actor.description && actor.description.toLowerCase().includes(query.toLowerCase()))
        );
        resolve(filteredResults);
      });
    });
  }
  