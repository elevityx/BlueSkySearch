import { getStoredResults, setStoredResults, appendNewResults, clearStoredResults } from '../utils/storage_utils.js';
import { searchBlueskyUser } from '../content/search_bluesky.js';
import { renderResults } from '../content/render_results.js';
import { enrichActorDetails } from '../content/enrich_actors.js';

document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchButton");
  const backButton = document.getElementById("backButton");
  const clearResultsButton = document.getElementById("clearResultsButton");
  const resultsContainer = document.getElementById("resultsContainer");
  const usernameInput = document.getElementById("usernameInput");
  const viewAllButton = document.getElementById("viewAllButton");

  // New Elements for View All Button
  const viewAllButtonText = document.getElementById("viewAllButtonText");
  const viewAllSpinner = document.getElementById("viewAllSpinner");

  const resultCountContainer = document.createElement("div");
  resultCountContainer.className = "text-center text-sm text-gray-400 mt-2";
  resultsContainer.parentNode.appendChild(resultCountContainer);

  // Load saved results from chrome.storage.local
  let results = [];

  (async function initialize() {
    try {
      results = await getStoredResults();
      if (results.length > 0) {
        renderResults(results.slice(0, 10));
        resultCountContainer.innerText = `Showing ${Math.min(results.length, 10)} of ${results.length} results`;
      } else {
        resultsContainer.innerHTML = "<p class='text-center text-gray-500'>No results available.</p>";
      }
    } catch (error) {
      console.error("Error initializing popup:", error);
    }
  })();

  searchButton.addEventListener("click", async function () {
    const username = usernameInput.value.trim();
    if (!username) {
      alert("Please enter a username.");
      return;
    }

    // Disable buttons during processing
    searchButton.disabled = true;
    backButton.disabled = true;
    clearResultsButton.disabled = true;
    viewAllButton.disabled = true;
    searchButton.innerText = "Checking...";

    // Update View All Button to "Loading..."
    viewAllButtonText.innerText = "Loading...";
    viewAllSpinner.classList.remove("hidden");

    try {
      const actors = await searchBlueskyUser(username);
      if (actors.length === 0) {
        alert("No Bluesky account found.");
      } else {
        const timestamp = Date.now();
        const newResults = actors.map(actor => ({
          ...actor,
          timestamp,
        }));

        // Use appendNewResults to properly manage new results
        results = await appendNewResults(newResults);
        renderResults(results.slice(0, 10));
        resultCountContainer.innerText = `Showing ${Math.min(results.length, 10)} of ${results.length} results`;

        // Enrich the actor data with additional information
        for (let actor of newResults) {
          results = await enrichActorDetails(actor.handle, results);
        }

        // Update the storage with enriched results
        await setStoredResults(results);
        renderResults(results.slice(0, 10));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
    } finally {
      // Re-enable buttons after processing
      searchButton.disabled = false;
      backButton.disabled = false;
      clearResultsButton.disabled = false;
      viewAllButton.disabled = false; // Re-enable View All Results button
      searchButton.innerText = "Check Bluesky";

      // Reset View All Button text and hide spinner
      viewAllButtonText.innerText = "View All Results";
      viewAllSpinner.classList.add("hidden");
    }
  });

  backButton.addEventListener("click", function () {
    usernameInput.value = "";
  });

  clearResultsButton.addEventListener("click", async function () {
    results = [];
    await clearStoredResults();
    resultsContainer.innerHTML = "<p class='text-center text-gray-500'>No results available.</p>";
    resultCountContainer.innerText = "";
  });

  viewAllButton.addEventListener("click", function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("../html/results.html") });
  });

  // Style buttons at the bottom to be bigger
  clearResultsButton.className = "bg-red-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-red-600";
  viewAllButton.className = "bg-green-500 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-600 flex items-center justify-center space-x-2";
});
