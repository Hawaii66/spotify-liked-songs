import type { Playlist } from "@/types/spotify";
import Droppable from "./droppable";
import Image from "next/image";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  playlists: Playlist[];
};

const IMAGE_SIZE = 260;

export default function Playlists({ playlists }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Playlists</CardTitle>
        <CardDescription>
          {
            'Add "LIKED-SONG-CONFIGURED" to the playlists description for it to show up here'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap content-start items-start justify-start gap-4">
          {playlists
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((playlist) => (
              <Droppable key={playlist.id} id={playlist.id}>
                {({ isOver }) => (
                  <Card
                    className={clsx(
                      "transition-all",
                      isOver && "scale-105 rotate-3",
                    )}
                  >
                    <CardHeader>
                      <CardTitle>{playlist.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        src={playlist.imageUrl}
                        alt={`background image for ${playlist.name}`}
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        className={"rounded-3xl object-cover"}
                        style={{
                          width: IMAGE_SIZE,
                          height: IMAGE_SIZE,
                        }}
                      />
                    </CardContent>
                  </Card>
                )}
              </Droppable>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
