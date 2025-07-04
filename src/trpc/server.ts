import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";
import { auth, clerkClient } from "@clerk/nextjs/server";
import SpotifyWebApi from "spotify-web-api-node";
import { env } from "@/env";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  const clerkAuth = await auth();
  heads.set("x-trpc-source", "rsc");

  let spotifyApi: SpotifyWebApi | null = null;
  let spotifyUserId: string | null = null;

  if (clerkAuth) {
    const userId = clerkAuth.userId;
    if (userId) {
      const clerkRes = await (
        await clerkClient()
      ).users.getUserOauthAccessToken(userId, "spotify");
      const token = clerkRes.data[0]?.token ?? "";

      spotifyApi = new SpotifyWebApi({
        clientId: env.SPOTIFY_CLIENT_ID,
        clientSecret: env.SPOTIFY_CLIENT_SECRET,
        accessToken: token,
      });

      const spotifyUser = await spotifyApi.getMe();
      spotifyUserId = spotifyUser.body.id;
    }
  }

  return createTRPCContext({
    headers: heads,
    auth: clerkAuth,
    spotify: spotifyApi,
    spotifyUserId,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
