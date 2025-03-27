import { GifMapper } from './../mapper/gif.mapper';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { gif } from '../interfaces/gif.interfaces';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient)

  trendingGif = signal<gif[]>([]);
  trendingGifLoanding = signal(true);

  constructor() {
    this.laodTrendingGifs();
  }
  laodTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: 0
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGif.set(gifs);
      this.trendingGifLoanding.set(false);
      console.log({ gifs });
    })
  }

  searchGif(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        q: query,
        limit: 20,
        offset: 0
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items))
    );
  }
}
