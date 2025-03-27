import { Component, input } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item/gif-list-item.component";
import { gif } from '../../interfaces/gif.interfaces';

@Component({
  selector: 'app-gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',
  styleUrl: './gif-list.component.css'
})
export class GifListComponent {
  listImg = input.required<gif[]>();
}
