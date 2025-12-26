# RIDHI Nutrition Store

A premium e-commerce website for RIDHI Nutrition Store in Khurja, built with HTML, CSS (Tailwind), and JavaScript.

## Features

- Responsive design that works on all devices
- Dark mode theme with red/gold color scheme
- Product catalog with detailed views
- Shopping cart functionality
- WhatsApp integration for purchases
- Progressive Web App (PWA) support
- Offline capability with service worker

## Deployment to GitHub Pages

1. Create a new repository on GitHub (or use an existing one)
2. Push this code to the repository
3. Go to Repository Settings → Pages
4. Select "Deploy from a branch" 
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be available at `https://[your-username].github.io/[repository-name]/`

## Customization

Before deploying, make sure to update the following:

1. In `index.html`:
   - Update the `og:url` meta tag to your actual GitHub Pages URL
   - Update the WhatsApp number in the JavaScript code (search for `919557412283`)

2. In `manifest.json`:
   - Update the `start_url` to match your GitHub Pages URL

3. In `sw.js`:
   - No changes needed, but you can add more files to the cache if desired

## Directory Structure

```
├── index.html          # Main website file
├── 404.html            # Custom 404 page
├── manifest.json       # PWA manifest file
├── sw.js               # Service worker for offline support
├── data/
│   └── products.json   # Product data
├── images/
│   ├── p1.jpg
│   ├── p2.jpg
│   └── ...
└── README.md           # This file
```

## Product Management

To add or modify products, edit the `products/all-products.json` file. Each product should have:
- `id`: Unique identifier
- `name`: Product name
- `price`: Price in Indian Rupees (format: ₹X,XXX)
- `description`: Product description

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS
- JavaScript (ES6+)
- Font Awesome for icons
- Google Fonts (Oswald, Montserrat, Roboto)
- Service Worker API for offline support
- Web App Manifest for PWA functionality

## Browser Support

This website works on all modern browsers that support:
- ES6 JavaScript
- CSS3 features
- Service Workers (for offline functionality)
- Web App Manifest (for PWA features)

## License

This project is open source and available under the MIT License.