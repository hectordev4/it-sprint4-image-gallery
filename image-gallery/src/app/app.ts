import { Component } from '@angular/core';

import { Gallery } from './components/gallery/gallery';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Gallery],
  template: `
    <app-gallery />
  `
})
export class App {}