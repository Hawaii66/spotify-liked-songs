import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { auth, clerkClient } from "@clerk/nextjs/server";
import SpotifyWebApi from "spotify-web-api-node";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  const clerkAuth = await auth();

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
    headers: req.headers,
    auth: clerkAuth,
    spotify: spotifyApi,
    spotifyUserId,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
