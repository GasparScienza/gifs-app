import { Component, inject, Injectable, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interfaces';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export default class SearchPageComponent {

  gifService = inject(GifService);

  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGif(query).subscribe((resp) => {
      this.gifs.set(resp);
    })
  }
}
