// results.js

import { getStoredResults, setStoredResults, appendNewResults, clearStoredResults } from '../utils/storage_utils.js';
import { enrichActorDetails } from '../content/enrich_actors.js';
import { renderResults } from '../content/render_results.js';
import { searchBlueskyUser } from '../content/search_bluesky.js';
import { searchLocalResults } from '../content/search_results.js';

document.addEventListener("DOMContentLoaded", function () {
  const resultsContainer = document.getElementById("resultsContainer");
  const clearResultsButton = document.getElementById("clearResultsButton");
  const searchButton = document.getElementById("searchButton");
  const searchButtonText = document.getElementById("searchButtonText");
  const searchSpinner = document.getElementById("searchSpinner");
  const searchInput = document.getElementById("searchInput");
  const localSearchCheckbox = document.getElementById("localSearchCheckbox");
  const viewAllButton = document.getElementById("viewAllButton");

  // Load saved results when the page loads
  loadResults();

  // Clear All Results button handler
  clearResultsButton.addEventListener("click", async function () {
    if (confirm("Are you sure you want to clear all saved results?")) {
      try {
        await clearStoredResults();
        resultsContainer.innerHTML = "<p class='text-center text-gray-500'>No results available.</p>";
      } catch (error) {
        console.error("Error clearing results:", error);
        alert("Error clearing results. Please try again.");
      }
    }
  });

  // Search Button Handler
  searchButton.addEventListener("click", async function () {
    // Disable the search button and show searching indicator
    searchButton.disabled = true;
    searchButtonText.innerText = "Searching...";
    searchSpinner.classList.remove("hidden");

    try {
      await handleSearch();
    } finally {
      // Re-enable the search button and reset text
      searchButton.disabled = false;
      searchButtonText.innerText = "Search";
      searchSpinner.classList.add("hidden");
    }
  });

  // View All Results Button Handler
  viewAllButton.addEventListener("click", function () {
    viewAllResults();
  });

  async function loadResults() {
    try {
      const storedResults = await getStoredResults();
      if (storedResults.length > 0) {
        renderResults(storedResults);
      } else {
        resultsContainer.innerHTML = "<p class='text-center text-gray-500'>No results available.</p>";
      }
    } catch (error) {
      console.error("Error retrieving results:", error);
      alert("Error retrieving results. Please try again.");
    }
  }

  async function viewAllResults() {
    try {
      const storedResults = await getStoredResults();
      if (storedResults.length > 0) {
        renderResults(storedResults);
      } else {
        resultsContainer.innerHTML = "<p class='text-center text-gray-500'>No results available.</p>";
      }
    } catch (error) {
      console.error("Error retrieving results:", error);
      alert("Error retrieving results. Please try again.");
    }
  }

  async function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      alert("Please enter a search term.");
      return;
    }

    try {
      let results;
      if (localSearchCheckbox.checked) {
        results = await searchLocalResults(query);
      } else {
        const actors = await searchBlueskyUser(query);
        if (actors.length > 0) {
          const timestamp = Date.now();
          const newResults = actors.map(actor => ({
            ...actor,
            timestamp,
          }));

          // Append new results to the existing results
          results = await appendNewResults(newResults);

          // Enrich the actor data with additional information
          for (let actor of newResults) {
            results = await enrichActorDetails(actor.handle, results);
          }

          // Update the storage with enriched results
          await setStoredResults(results);
        } else {
          results = [];
        }
      }
      renderResults(results);
    } catch (error) {
      console.error("Error during search:", error);
      alert("Failed to perform search. Please try again.");
    }
  }
});
