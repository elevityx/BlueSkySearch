// render_results.js

export function renderResults(results) {
    const resultsContainer = document.getElementById("resultsContainer");
    if (!resultsContainer) {
      console.error("resultsContainer element not found");
      return;
    }
    
    resultsContainer.innerHTML = "";
    results.forEach(function (actor) {
      if (!actor) return;
  
      const actorCard = document.createElement("div");
      actorCard.className = "flex items-start space-x-3 p-3 bg-gray-800 rounded-lg shadow-sm";
  
      actorCard.innerHTML = `
        <img src="${actor.avatar || 'https://via.placeholder.com/50'}" alt="${actor.displayName || 'No Display Name'}" class="w-16 h-16 rounded-full">
        <div>
          <h3 class="text-lg font-semibold">${actor.displayName || 'No Display Name'}</h3>
          <p class="text-sm text-gray-400">${actor.description || 'No description available.'}</p>
          <a href="https://bsky.app/profile/${actor.handle}" target="_blank" class="text-blue-500 hover:underline">@${actor.handle}</a>
          <div class="mt-2 text-gray-300">
            <p>Posts: ${actor.postsCount || 'N/A'}</p>
            <p>Followers: ${actor.followersCount || 'N/A'}</p>
            <p>Following: ${actor.followsCount || 'N/A'}</p>
          </div>
        </div>
      `;
  
      resultsContainer.appendChild(actorCard);
    });
  }
  