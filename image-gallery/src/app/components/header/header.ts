import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="mb-10 ml-8 max-w-2xl font-sans">
      <!-- Title with high contrast and subtle text spacing -->
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl bg-linear-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text">
        AuraGallery
      </h1>
      
      <!-- Subtitle with perfect micro-typography line spacing -->
      <p class="mt-3 text-lg leading-relaxed text-gray-500 antialiased font-normal">
        A curated minimal space to organize, view, and reorder visual moments seamlessly.
      </p>
    </header>
  `,
  styles: []
})
export class Header {}