import Wrapper from "@/components/organize/wrapper";
import { api } from "@/trpc/server";

export default async function Page() {
  const [likedSongs, { playlists, alreadySavedURIs }] = await Promise.all([
    api.spotify.getLikedSongs(),
    api.spotify.getConfiguredPlaylists(),
  ]);
  const uris = new Set(alreadySavedURIs);

  return (
    <Wrapper
      likedSongs={likedSongs.filter((i) => !uris.has(i.uri))}
      playlists={playlists}
    />
  );
}
