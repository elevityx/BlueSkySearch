// enrich_actors.js

export async function enrichActorDetails(handle, results) {
    const profileUrl = `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(handle)}`;
    try {
      const response = await fetch(profileUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch actor profile data.");
      }
      const profileData = await response.json();
      const updatedResults = results.map(actor => {
        if (actor.handle === handle) {
          return {
            ...actor,
            postsCount: profileData.postsCount,
            followersCount: profileData.followersCount,
            followsCount: profileData.followsCount,
          };
        }
        return actor;
      });
      return updatedResults;
    } catch (error) {
      console.error(`Error enriching actor details for ${handle}:`, error);
      return results;
    }
  }
  