import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Gallery } from './components/gallery/gallery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, Gallery],
  template: `
    <app-header />
    <app-gallery />
  `
})
export class App {}