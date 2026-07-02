import { Component, signal } from '@angular/core';
import { Image } from '../../models/image.model';
import { ImageItem } from '../image-item/image-item';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ImageItem],
  template: `
    <div class="gallery-container">
      <div class="gallery-grid">
        @for (img of images(); track img.id; let first = $first) {
          <app-image-item 
            [image]="img" 
            [isFeatured]="first"
          />
        }
      </div>
    </div>
  `,
  styles: [`
    /* Temporary basic styles until Iteration 2 (Tailwind) */
    .gallery-container { padding: 2rem; font-family: sans-serif; }
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
  `]
})
export class Gallery {
  // Using an Angular Signal to store our mock data reactively
  images = signal<Image[]>([
    { id: '1', url: 'https://picsum.photos/id/10/600/600', alt: 'Seashore above a pine forest' },
    { id: '2', url: 'https://picsum.photos/id/16/600/600', alt: 'Rocky seashore view' },
    { id: '3', url: 'https://picsum.photos/id/28/600/600', alt: 'Forest hiking path' },
    { id: '4', url: 'https://picsum.photos/id/42/600/600', alt: 'Coffee served in a cozy coffee shop' },
    { id: '5', url: 'https://picsum.photos/id/48/600/600', alt: 'Laptop on a wooden table' },
    { id: '6', url: 'https://picsum.photos/id/54/600/600', alt: 'Scenic desert highway' },
  ]);
}