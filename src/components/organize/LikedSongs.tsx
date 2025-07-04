import type { LikedSong } from "@/types/spotify";
import Draggable from "./draggable";
import Image from "next/image";
import clsx from "clsx";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ArrowRight, ChevronRight, MoveRight, Play } from "lucide-react";

type Props = {
  likedSongs: LikedSong[];
};

const IMAGE_SIZE = 50;

export default function LikedSongs({ likedSongs }: Props) {
  const mutate = api.spotify.playTrack.useMutation();

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Liked Songs</CardTitle>
        <CardDescription>Your liked songs that can be sorted</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col items-start justify-start gap-2">
        {likedSongs.map((likedSong) => (
          <Draggable id={likedSong.uri} key={likedSong.id}>
            {({ isOver }) => (
              <Card
                className={clsx(
                  "z-50 flex w-full flex-row items-center justify-start gap-4 p-4 transition-all",
                  isOver && "scale-105 -rotate-3",
                )}
              >
                <Image
                  width={IMAGE_SIZE}
                  height={IMAGE_SIZE}
                  src={likedSong.imageUrl}
                  alt={`Image for ${likedSong.name}`}
                  className="rounded-lg object-cover shadow-lg"
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                  }}
                />
                <div className="flex w-full flex-col items-start justify-center">
                  <p className="w-full truncate text-left">{likedSong.name}</p>
                  <p className="max-w-48 truncate">- {likedSong.artist}</p>
                </div>
                <div
                  className="p-4"
                  onMouseDown={() => mutate.mutate({ songURI: likedSong.uri })}
                >
                  <Play />
                </div>
              </Card>
            )}
          </Draggable>
        ))}
      </CardContent>
    </Card>
  );
}
