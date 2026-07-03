import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Image } from '../../models/image.model';

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="group relative w-full overflow-hidden rounded-xl bg-gray-200 shadow-xs transition-all duration-300 hover:shadow-md"
      [class.lg:col-span-2]="isFeatured()"
      [class.lg:row-span-2]="isFeatured()"
      [class.h-96]="isFeatured()"
      [class.h-48]="!isFeatured()">
      <div class="relative w-full h-full">
        <img 
          [ngSrc]="image().url" 
          [alt]="image().alt" 
          fill 
          priority
          class="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        
        <!-- Delete Button -->
        <div class="absolute top-2 right-2 z-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
          <button
            type="button"
            aria-label="Delete image"
            (click)="onDeleteClick($event)"
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-red-600 shadow-xs backdrop-blur-xs transition-transform duration-200 hover:scale-110"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>

        <!-- Caption Context Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 flex items-end opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
          <span class="text-sm font-medium text-white truncate w-full">
            {{ image().alt }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ImageItem {
  image = input.required<Image>();
  isFeatured = input<boolean>(false);
  delete = output<string>();

  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.delete.emit(this.image().id);
  }
}