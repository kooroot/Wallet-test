# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Gauss Wallet Demo** - a mobile-first web application that serves as a UI/UX demonstration for a cryptocurrency wallet interface. It's a static site built with vanilla HTML, CSS, and JavaScript, without any build process or framework dependencies.

## Development Commands

```bash
# Start local development server
npm start
# or
npm run dev
# Both commands run: python -m http.server 8000

# View the site locally
# Open http://localhost:8000 in your browser
```

## Architecture

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, vanilla JavaScript
- **Styling**: Custom CSS with CSS variables for theming
- **Fonts**: JetBrains Mono from Google Fonts
- **Deployment**: GitHub Pages via GitHub Actions

### Key Design Patterns

1. **Single Page Application Pattern**: Despite being static HTML files, the app uses JavaScript navigation between pages to simulate an SPA experience.

2. **Mobile-First Design**: All interfaces are designed for 360px width first, with responsive breakpoints at 768px (tablet) and 1024px (desktop).

3. **State Management**: Uses localStorage for persisting user data across pages:
   - `hasCompletedOnboarding`: Track if user has completed initial setup
   - `userEmail`: Store user's email
   - `userPIN`: Store user's PIN (in demo only)

4. **Navigation Flow**:
   ```
   index.html (splash) → email-input.html → pin-setup.html → main.html
                      ↘ create.html / import.html ↗
   ```

### File Organization

- **`/css/style.css`**: Single stylesheet containing all styles. Uses CSS custom properties for consistent theming.
- **`/js/`**: Separate JavaScript files for each major functionality (app.js, email-auth.js, password-setup.js, pin-setup.js)
- **`/pages/`**: Individual HTML pages for different screens
- **Root HTML files**: index.html serves as the entry point

### Important Implementation Details

1. **Cyber Theme Variables** (defined in style.css:1-20):
   ```css
   --cyber-primary: #00FFB7
   --cyber-secondary: #00D4FF
   --cyber-background: #0A0A0A
   ```

2. **Touch Gestures**: The app implements swipe gestures for:
   - Opening drawer (swipe right)
   - Opening settings bottom sheet (swipe up)

3. **Authentication Methods**: Multiple auth options are presented but only email flow is implemented.

4. **No Backend Integration**: This is purely a frontend demo. All functionality is simulated client-side.

## Testing

Currently, there are no automated tests. When adding new features, manually test:
1. Mobile viewport (360px width)
2. Touch gestures on mobile devices
3. Navigation flow between pages
4. LocalStorage persistence

## Deployment

The project automatically deploys to GitHub Pages when pushing to the main branch. The deployment workflow is defined in `.github/workflows/deploy.yml`.

## Key Considerations

1. **Static Site Limitations**: This is a demo without real wallet functionality. Don't add features that require backend services unless converting to a full application.

2. **Mobile-First Priority**: Always design and test for mobile (360px) before considering larger screens.

3. **Consistent Theming**: Use existing CSS variables for colors and maintain the cyber/futuristic aesthetic.

4. **Page-Based Navigation**: Each screen is a separate HTML file. Maintain this pattern for consistency.

5. **No Dependencies**: The project intentionally avoids npm packages and frameworks. Continue using vanilla JavaScript unless there's a compelling reason to change.