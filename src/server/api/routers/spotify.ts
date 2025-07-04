import { SpotifyPage } from "@/lib/spotify";
import { FilterUndefined } from "@/lib/utils";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  LikedSongSchema,
  PlaylistSchema,
  type LikedSong,
} from "@/types/spotify";
import type SpotifyWebApi from "spotify-web-api-node";
import z from "zod";

function SpotifyCTX(ctx: { spotify: SpotifyWebApi | null }) {
  if (!ctx.spotify) {
    throw new Error("Missing spotify api");
  }

  return ctx.spotify;
}

export const spotifyRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const spotify = SpotifyCTX(ctx);

    const t = spotify.getMe();

    return t;
  }),
  getConfiguredPlaylists: protectedProcedure.query(async ({ ctx }) => {
    const spotify = SpotifyCTX(ctx);

    const playlists = await SpotifyPage((opts) =>
      spotify.getUserPlaylists(opts),
    );

    const owned = playlists.filter((i) => i.owner.id === ctx.spotifyUserId);
    const configured = owned.filter((i) =>
      i.description?.includes("LIKED-SONG-CONFIGURED"),
    );

    const trimmedPlaylists = PlaylistSchema.array().parse(
      configured.map((i) => ({
        id: i.id,
        imageUrl: i.images[0]?.url,
        name: i.name,
      })),
    );

    const allSongsPromises = await Promise.all(
      trimmedPlaylists
        .map((i) => i.id)
        .map((i) => SpotifyPage((opts) => spotify.getPlaylistTracks(i, opts))),
    );

    const alreadySavedURIs = allSongsPromises
      .flatMap((i) => i.flatMap((i) => i.track?.uri))
      .filter(FilterUndefined);

    return { playlists: trimmedPlaylists, alreadySavedURIs };
  }),
  getLikedSongs: protectedProcedure.query(async ({ ctx }) => {
    const spotify = SpotifyCTX(ctx);

    const songs = await SpotifyPage(({ limit, offset }) =>
      spotify.getMySavedTracks({ limit, offset }),
    );

    const likedSongs: LikedSong[] = LikedSongSchema.array().parse(
      songs.map((i) => ({
        artist: i.track.artists[0]?.name,
        id: i.track.id,
        imageUrl: i.track.album.images[0]?.url,
        name: i.track.name,
        uri: i.track.uri,
      })),
    );

    return likedSongs;
  }),
  addLikedSongToPlaylist: protectedProcedure
    .input(
      z.object({
        songURI: LikedSongSchema.shape.id,
        playlistId: PlaylistSchema.shape.id,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const spotify = SpotifyCTX(ctx);

      await spotify.addTracksToPlaylist(input.playlistId, [input.songURI]);
    }),
  playTrack: protectedProcedure
    .input(
      z.object({
        songURI: LikedSongSchema.shape.uri,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const spotify = SpotifyCTX(ctx);

      await spotify.play({
        uris: [input.songURI],
      });
    }),
});
