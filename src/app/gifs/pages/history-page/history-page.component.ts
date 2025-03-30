import { Component, computed, effect, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list/gif-list.component";
import { GifService } from '../../services/gif.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-history-page',
  imports: [GifListComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export default class HistoryPageComponent {

  gifService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params["query"])
    )
  );

  gifsByKey = computed(() => this.gifService.gethistoryGifs(this.query()));

}
