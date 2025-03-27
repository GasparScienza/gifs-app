import { Component } from '@angular/core';
import { GifsSideMenuOptionsComponent } from "./gifs-side-menu-options/gifs-side-menu-options.component";
import { GifsSideMenuHeaderComponent } from "./gifs-side-menu-header/gifs-side-menu-header.component";

@Component({
  selector: 'app-gifs-side-menu',
  imports: [GifsSideMenuOptionsComponent, GifsSideMenuHeaderComponent],
  templateUrl: './gifs-side-menu.component.html',
  styleUrl: './gifs-side-menu.component.css'
})
export class GifsSideMenuComponent {

}
