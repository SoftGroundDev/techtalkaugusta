# Full-Screen Carousel

A responsive, full-screen image carousel built with SvelteKit.

## Features

- **Full-screen display**: Takes up the entire viewport
- **Auto-play**: Automatically advances slides every 5 seconds
- **Keyboard navigation**: 
  - Left/Right arrows to navigate
  - Spacebar to pause/resume auto-play
  - Escape to exit carousel
- **Touch/Click controls**: Navigation arrows and dot indicators
- **Responsive design**: Works on desktop and mobile
- **Accessibility**: Proper ARIA labels and keyboard support

## How to Add Your Images

1. **Place your PNG files** in the `/static/carousel-images/` folder (or any subfolder in `/static/`)

2. **Update the images array** in `/src/routes/carousel/+page.svelte`:
   ```typescript
   let images: string[] = [
     '/carousel-images/your-image-1.png',
     '/carousel-images/your-image-2.png',
     '/carousel-images/your-image-3.png',
     // Add more images as needed
   ];
   ```

3. **Access the carousel** by navigating to `/carousel` in your browser

## Example Usage

```typescript
// In +page.svelte, replace the empty images array with:
let images: string[] = [
  '/carousel-images/slide1.png',
  '/carousel-images/slide2.png',
  '/carousel-images/slide3.png',
];
```

## Controls

- **Play/Pause button**: Top-right corner
- **Close button**: Next to play/pause (returns to previous page)
- **Navigation arrows**: Left and right sides (only visible with multiple images)
- **Dot indicators**: Bottom center (shows current image and allows direct navigation)

## Customization

You can customize the carousel by modifying:
- **Auto-play timing**: Change the interval in the `startAutoPlay()` function
- **Styling**: Update the CSS variables and classes
- **Transition effects**: Modify the CSS transitions
- **Image sizing**: Adjust `object-fit` property for different image display modes

## URL Structure

The carousel is available at: `http://localhost:5173/carousel` (or your domain + `/carousel`)