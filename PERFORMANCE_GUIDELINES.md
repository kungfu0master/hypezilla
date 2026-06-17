# CORE REQUIREMENTS – PERFORMANCE FIRST

## Performance Philosophy
The website must feel extremely fast, lightweight, and premium on all devices. Every design and development decision should prioritize speed, responsiveness, accessibility, and user experience.

## Performance Targets
- Google PageSpeed Mobile Score: 90+
- Google PageSpeed Desktop Score: 95+
- Largest Contentful Paint (LCP): < 2.5 seconds
- Cumulative Layout Shift (CLS): < 0.1
- First Contentful Paint (FCP): < 1.8 seconds
- Time to Interactive (TTI): As fast as possible
- Fully Responsive across Mobile, Tablet, Laptop, and Desktop

## Development Rules
- Use modern semantic HTML5 structure
- Optimize all images using WebP/AVIF formats
- Implement lazy loading for images below the fold
- Use optimized font loading with preload strategy
- Minimize CSS and JavaScript bundles
- Enable code splitting and dynamic imports
- Use server-side rendering (SSR) or static generation where applicable
- Implement proper caching strategies
- Use compressed assets (Gzip/Brotli)
- Prioritize above-the-fold content loading
- Reduce render-blocking resources

## Strictly Avoid
❌ Heavy page builders
❌ Unnecessary JavaScript libraries
❌ Multiple sliders/carousels running simultaneously
❌ Excessive animations
❌ Auto-playing background videos
❌ Large GIF files
❌ Heavy third-party widgets
❌ Unoptimized images
❌ Large icon libraries if only a few icons are used
❌ Excessive DOM elements
❌ Scroll-jacking effects

## Animation Guidelines
- Use subtle, elegant micro-interactions only
- Prefer CSS animations over JavaScript animations
- Trigger animations only when elements enter the viewport
- Keep animation duration between 200ms–600ms
- Respect reduced-motion accessibility settings
- Never sacrifice performance for visual effects

## Technical Stack Preference
- React + Next.js (App Router)
- Tailwind CSS
- Framer Motion (light usage only)
- Optimized Image Component
- Static Generation wherever possible
- Edge-friendly deployment (Vercel)

## User Experience Requirements
- Instant navigation feel
- Smooth scrolling
- Mobile-first design approach
- Touch-friendly UI elements
- Fast form submissions
- Zero layout shifts during loading
- Clean loading states and skeleton screens

## Final Quality Standard
The website should look premium and modern while maintaining exceptional performance. Every section must justify its existence. If a feature negatively impacts loading speed or Core Web Vitals, it should be redesigned or removed.
Rule: Performance > Visual Effects. Speed is a feature.

---

# Mobile Experience (Highest Priority)

The website must be designed mobile-first, as most users will visit from smartphones.
- All pages must work flawlessly on Android and iPhone devices.
- No lag, stuttering, frame drops, or delayed interactions on mobile devices.
- Smooth scrolling experience throughout the website.
- All buttons, forms, menus, and navigation elements must be thumb-friendly.
- Touch interactions should feel instant with minimal input delay.
- Mobile navigation must open and close smoothly without affecting performance.
- Images, videos, and animations must be optimized specifically for mobile networks.
- Content should never overflow or break on small screens.
- Maintain consistent spacing, typography, and layout across all screen sizes.

Ensure excellent usability on:
- 320px mobile screens
- 375px mobile screens
- 768px tablets
- 1024px laptops
- 1440px+ desktops

## Mobile Performance Targets
- Mobile PageSpeed Score: 90+
- No visible lag during scrolling
- No layout shifts while content loads
- Touch response time should feel instant
- Smooth 60 FPS animations where applicable
- Fast loading even on average 4G networks

## Mobile Optimization Rules
❌ No heavy animations on mobile
❌ No large autoplay videos
❌ No unnecessary JavaScript execution
❌ No oversized images
❌ No elements causing horizontal scrolling
❌ No popups that block the mobile experience

✅ Lightweight assets only
✅ Optimized image delivery
✅ Mobile-first responsive design
✅ Fast tap interactions
✅ Performance-first development approach
