import { Component, signal, computed } from '@angular/core';
import { Image } from '../../models/image.model';
import { ImageItem } from '../item-image/item-image';
import { CdkDropList, CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [ImageItem, CdkDropList, CdkDrag],
  template: `
    <div class="p-8 font-sans select-none max-w-7xl mx-auto">
      
      <!-- Batch Action Bar Section -->
      @if (hasSelection()) {
        <div class="mb-6 flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl animate-fade-in shadow-xs">
          <div class="flex items-center gap-2 text-blue-800 font-medium">
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white text-xs">
              {{ selectedCount() }}
            </span>
            <span>Selected Images</span>
          </div>
          <div class="flex gap-3">
            <button 
              type="button"
              (click)="clearSelection()"
              class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel Selection
            </button>
            <button 
              type="button"
              (click)="deleteSelectedImages()"
              class="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-xs transition-colors"
            >
              Delete Selected
            </button>
          </div>
        </div>
      }

      <!-- Main Drag & Drop Image Grid -->
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
            [isSelected]="isCardSelected(img.id)"
            (delete)="deleteImage($event)"
            (toggleSelect)="toggleImageSelection($event)"
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

  // Reactive hash-set tracking for O(1) membership evaluations
  selectedIds = signal<Set<string>>(new Set<string>());

  // Memoized computations derived reactively from selectedIds changes
  selectedCount = computed(() => this.selectedIds().size);
  hasSelection = computed(() => this.selectedCount() > 0);

  isCardSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  toggleImageSelection(id: string): void {
    this.selectedIds.update(currentSet => {
      const nextSet = new Set(currentSet); // Cloned wrapper to push value-type changes safely
      if (nextSet.has(id)) {
        nextSet.delete(id);
      } else {
        nextSet.add(id);
      }
      return nextSet;
    });
  }

  clearSelection(): void {
    this.selectedIds.set(new Set<string>());
  }

  deleteSelectedImages(): void {
    const count = this.selectedCount();
    const confirmed = window.confirm(`Are you sure you want to delete ${count} selected images?`);
    
    if (confirmed) {
      const selection = this.selectedIds();
      // O(N) optimized linear array update pass
      this.images.update(currentImages => 
        currentImages.filter(img => !selection.has(img.id))
      );
      this.clearSelection();
    }
  }

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
      // Scrub ID clean from the tracking selection if it was deleted individually
      this.selectedIds.update(currentSet => {
        const nextSet = new Set(currentSet);
        nextSet.delete(id);
        return nextSet;
      });
    }
  }
}