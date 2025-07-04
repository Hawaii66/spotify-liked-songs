import z from "zod";

export const LikedSongSchema = z.object({
  name: z.string(),
  imageUrl: z.string().url(),
  artist: z.string(),
  id: z.string().brand("liked-song-id"),
  uri: z.string().brand("liked-song-uri"),
});
export type LikedSong = z.infer<typeof LikedSongSchema>;

export const PlaylistSchema = z.object({
  id: z.string().brand("playlist-id"),
  name: z.string(),
  imageUrl: z.string(),
});
export type Playlist = z.infer<typeof PlaylistSchema>;
