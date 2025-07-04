interface Response<T> {
  body: T;
  headers: Record<string, string>;
  statusCode: number;
}

export async function SpotifyPage<T>(
  func: (opts: {
    limit: number;
    offset: number;
  }) => Promise<Response<SpotifyApi.PagingObject<T>>>,
) {
  let playlists: T[] = [];

  const limit = 50;
  let offset = 0;

  while (true) {
    const res = await func({
      limit,
      offset,
    });

    playlists = playlists.concat(res.body.items);

    if (res.body.items.length === 0) {
      break;
    }

    offset += limit;
  }

  return playlists;
}
