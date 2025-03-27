import { Component, inject, Injectable, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gif.service';
import { gif } from '../../interfaces/gif.interfaces';
import { GifMapper } from '../../mapper/gif.mapper';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export default class SearchPageComponent {

  gifService = inject(GifService);

  gifs = signal<gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGif(query).subscribe((resp) => {
      this.gifs.set(resp);
    })
  }


}
