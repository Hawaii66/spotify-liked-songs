"use client";

import {
  LikedSongSchema,
  PlaylistSchema,
  type LikedSong,
  type Playlist,
} from "@/types/spotify";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useState } from "react";
import LikedSongs from "./LikedSongs";
import Playlists from "./Playlists";
import { api } from "@/trpc/react";

type Props = {
  likedSongs: LikedSong[];
  playlists: Playlist[];
};

export default function Wrapper({ likedSongs: _likedSongs, playlists }: Props) {
  const [likedSongs, setLikedSongs] = useState(_likedSongs);
  const mutate = api.spotify.addLikedSongToPlaylist.useMutation();

  async function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      const playlistId = PlaylistSchema.shape.id.parse(event.over.id);
      const songURI = LikedSongSchema.shape.uri.parse(event.active.id);

      mutate.mutate({
        playlistId,
        songURI,
      });
      setLikedSongs((s) => s.filter((i) => i.uri !== songURI));
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-full w-full flex-row gap-4 p-4">
        <LikedSongs likedSongs={likedSongs} />
        <Playlists playlists={playlists} />
      </div>
    </DndContext>
  );
}
