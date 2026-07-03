```markdown
# Image Gallery

An interactive image gallery built with Angular, Tailwind CSS and PrimeNG.

## Description

This application displays a set of images in a responsive layout with key features:

- Responsive grid adapted for mobile/tablet/desktop
- Featured image
- Individual image deletion
- Multi-selection and bulk deletion
- Drag-and-drop reordering
- Accessible and modern interface

## Technologies

- Angular
- Tailwind CSS
- PrimeNG
- Angular CDK (drag-and-drop)
- TypeScript

## Installation

```bash
cd /Users/hectorkuma/Documents/programming/it-sprint4-images-gallery/image-gallery
npm install
```

## Run in development

```bash
npm start
```

or if you prefer using Angular CLI directly:

```bash
ng serve
```

Then open:

```text
http://localhost:4200
```

## Testing

```bash
ng test
```

## Project structure

- `src/app/`
  - `components/gallery/`
  - `components/item-image/`
  - `components/header/`
  - `models/image.model.ts`

Each component is organized with its template, styles, and tests.

## Main features

- Responsive grid with featured image
- Image deletion with confirmation
- Multi-selection with batch deletion
- Drag-and-drop image reordering
- Use of `signals` for reactive state

## Notes

- The project is designed following Angular best practices
- Uses standalone components and optimized change detection
- Includes basic unit tests for components
