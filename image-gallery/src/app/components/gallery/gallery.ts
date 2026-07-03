import { Component, signal } from '@angular/core';
import { Image } from '../../models/image.model';
import { ImageItem } from '../item-image/item-image';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ImageItem, CdkDropList, CdkDrag],
  template: `
    <div class="p-8 font-sans select-none">
      <div 
        cdkDropList 
        cdkDropListOrientation="mixed"
        (cdkDropListDropped)="onItemDropped($event)"
        class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 grid-flow-row-dense"
      >
        @for (img of images(); track img.id; let first = $first) {
          <app-image-item 
            cdkDrag
            [cdkDragStartDelay]="0"
            cdkDragPreviewClass="cdk-drag-preview"
            [image]="img" 
            [isFeatured]="first"
            (delete)="deleteImage($event)"
            class="cursor-grab active:cursor-grabbing transform-gpu transition-all"
          />
        } @empty {
          <div class="col-span-full text-center py-12 bg-white rounded-xl border border-gray-100">
            <p class="text-gray-400 font-medium">No images left in your gallery space.</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: []
})
export class Gallery {
  images = signal<Image[]>([
    { id: '1', url: 'https://picsum.photos/id/10/600/600', alt: 'Seashore above a pine forest' },
    { id: '2', url: 'https://picsum.photos/id/16/600/600', alt: 'Rocky seashore view' },
    { id: '3', url: 'https://picsum.photos/id/28/600/600', alt: 'Forest hiking path' },
    { id: '4', url: 'https://picsum.photos/id/42/600/600', alt: 'Coffee served in a cozy coffee shop' },
    { id: '5', url: 'https://picsum.photos/id/48/600/600', alt: 'Laptop on a wooden table' },
    { id: '6', url: 'https://picsum.photos/id/54/600/600', alt: 'Scenic desert highway' },
  ]);

  onItemDropped(event: CdkDragDrop<Image[]>): void {
    if (event.previousIndex === event.currentIndex) return;

    const items = [...this.images()];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.images.set(items);
  }

  deleteImage(id: string): void {
    const confirmed = window.confirm('Are you sure you want to remove this image?');
    if (confirmed) {
      this.images.update(currentImages => currentImages.filter(img => img.id !== id));
    }
  }
}