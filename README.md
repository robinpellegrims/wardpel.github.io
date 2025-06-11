# Ward Pellegrims Coaching Website - Next.js Version

This is the modernized version of Ward Pellegrims' coaching website, converted from static HTML to Next.js with Tailwind CSS.

## Features

- **Modern React/Next.js Architecture**: Component-based structure with TypeScript
- **Tailwind CSS Styling**: Utility-first CSS framework for consistent styling
- **Responsive Design**: Mobile-first approach with responsive navigation
- **Internationalization**: Support for English and Dutch languages
- **Contact Form**: EmailJS integration for contact form submissions
- **Static Export**: Optimized for static hosting (GitHub Pages, Vercel, etc.)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## Deployment

### GitHub Pages
1. Build the static export: `npm run build`
2. Deploy the `out` folder to GitHub Pages

### Vercel
1. Connect your repository to Vercel
2. Vercel will automatically build and deploy

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── Header.tsx      # Navigation header
│   ├── About.tsx       # About section
│   ├── Coaching.tsx    # Coaching services
│   ├── Projects.tsx    # Projects showcase
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
└── context/           # React contexts
    └── TranslationContext.tsx  # i18n context
```

## Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS
- **EmailJS**: Client-side email service
- **React Icons**: Icon library
- **Custom i18n**: Simple translation system

## Migration Notes

This project maintains all the functionality of the original HTML site while providing:
- Better maintainability through component structure
- Type safety with TypeScript
- Modern development experience
- Optimized performance
- Better SEO capabilities