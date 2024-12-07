// search_bluesky.js

export async function searchBlueskyUser(username) {
    const apiUrl = `https://public.api.bsky.app/xrpc/app.bsky.actor.searchActors?q=${encodeURIComponent(username)}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch data from Bluesky API.");
    }
    const data = await response.json();
    return data.actors || [];
  }
  
  