import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="image-card" [class.featured]="isFeatured()">
      <img 
        [ngSrc]="image().url" 
        [alt]="image().alt" 
        fill 
        [priority]="priority()" 
      />
      <div class="image-overlay">
        <span>{{ image().alt }}</span>
      </div>
    </div>
  `,
  styles: [`
    .image-card { 
      position: relative; 
      border-radius: 8px; 
      overflow: hidden; 
      box-shadow: 0 2px 5px rgba(0,0,0,0.1); 
      height: 200px; /* Default height */
    }
    
    .image-card.featured { 
      grid-column: span 2; 
      grid-row: span 2; 
      height: 416px; 
    }
    
    /* The directive applies 'position: absolute' to the img. 
       We ensure it fills the card and maintains aspect ratio. */
    .image-card img {
      object-fit: cover; 
    }
    
    .image-overlay { 
      position: absolute; 
      bottom: 0; 
      background: rgba(0,0,0,0.6); 
      color: white; 
      width: 100%; 
      padding: 0.5rem; 
      font-size: 0.85rem; 
      opacity: 0; 
      transition: opacity 0.2s; 
      z-index: 1; /* Ensure text sits above the image */
    }
    .image-card:hover .image-overlay { opacity: 1; }
  `]
})
export class ImageItem {
  image = input.required<Image>();
  isFeatured = input<boolean>(false);
  // Default to false. Set to true only for images in the initial viewport.
  priority = input<boolean>(false);
}