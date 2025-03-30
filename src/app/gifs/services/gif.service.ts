import { GifMapper } from './../mapper/gif.mapper';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interfaces';
import { map, tap } from 'rxjs';

const GIF_KEY = "History"

const loadToLocalStorage = () => {
  const gifsLocalStorage = localStorage.getItem(GIF_KEY) ?? `{}`;
  const gifs = JSON.parse(gifsLocalStorage);
  return gifs;
}


@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient)

  trendingGif = signal<Gif[]>([]);//[gif,gif,gif,gif,gif]
  trendingGifLoanding = signal(false);
  private trendingPage = signal<number>(0);

  //[[gif,gif,gif],[gif,gif,gif],[gif,gif,gif]]
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGif().length; i += 3) {
      groups.push(this.trendingGif().slice(i, i + 3));
    };

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadToLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  saveToLocalStorage = effect(() => {
    const gifString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, gifString)
  })

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    if (this.trendingGifLoanding()) return;
    this.trendingGifLoanding.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGif.update(currentGifs => [
        ...currentGifs,
        ...gifs
      ]);
      this.trendingPage.update((val) => val + 1);
      this.trendingGifLoanding.set(false);
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
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
      tap((items) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items,
        }))
      })
    );
  }
  gethistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }


}
