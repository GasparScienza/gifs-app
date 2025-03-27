import { Component } from '@angular/core';
import { routes } from '../../../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string,
  label: string,
  route: string,
  subLabel: string
}

@Component({
  selector: 'app-gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-options.component.html',
  styleUrl: './gifs-side-menu-options.component.css'
})
export class GifsSideMenuOptionsComponent {
  menuOptions: MenuOption[] = [
    {
      icon: "fa-solid fa-chart-line",
      label: "Trending",
      subLabel: "Gifs Populares",
      route: "/dashboard/trending"
    },
    {
      icon: "fa-solid fa-magnifying-glass",
      label: "Buscador",
      subLabel: "Buscar gifs",
      route: "/dashboard/search"
    }
  ]
}
