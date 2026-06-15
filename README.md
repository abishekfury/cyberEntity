# CYBERENTITYZ - Ethical Hacking Society

![Version](https://img.shields.io/badge/version-1.0.0-orange)
![Status](https://img.shields.io/badge/status-production%20ready-green)

> Professional cybersecurity training institute website with modern design and smooth animations

---

## 🎯 Overview

CYBERENTITYZ is a cutting-edge, single-page application showcasing a premier cybersecurity training institute. The website features:

- **Modern Design**: Sleek black & orange color scheme with Japanese typography elements
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Responsive Layout**: Optimized for all devices (mobile, tablet, desktop)
- **SEO Optimized**: Meta tags, sitemap, robots.txt included
- **Performance Focused**: Compressed assets, browser caching configured

---

## 📁 Project Structure

```
cyberEntity/
├── index.html              # Main homepage
├── 404.html               # Custom error page
├── .htaccess              # Apache server configuration
├── robots.txt             # Search engine crawler instructions
├── sitemap.xml            # SEO sitemap
├── DEPLOYMENT-CHECKLIST.md # Pre-launch verification guide
├── README.md              # This file
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Main stylesheet
│   │   └── portfolio-page.css  # Service pages stylesheet
│   │
│   ├── js/
│   │   ├── script.js           # Core functionality
│   │   ├── animations.js       # GSAP animations & scroll effects
│   │   └── portfolio-page.js   # Service pages interactions
│   │
│   └── images/
│       ├── 1.png - 5.png       # Hero section images
│       └── favicon.png         # Website icon (⚠️ needs creation)
│
└── work/
    ├── Global-Training.html     # Certification training details
    ├── Skill-Programs.html      # Skills training details  
    ├── Pearson-VUE.html         # Test center information
    ├── Service-Academia.html    # Academic services
    └── Service-Organiztions.html # Enterprise services
```

---

## 🚀 Quick Start

### Local Development

1. **Clone or download** the repository
2. **Navigate** to the project directory
3. **Start a local server**:

```bash
# Using Python 3
python3 -m http.server 8080

# Using PHP
php -S localhost:8080

# Using Node.js (http-server)
npx http-server -p 8080
```

4. **Open browser** to `http://localhost:8080`

### Testing

- Test all navigation links
- Test mobile responsiveness
- Check animations on scroll
- Verify work item cards navigate correctly
- Test 404 page by accessing invalid URL

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript ES6+** - Vanilla JS, no frameworks

### Libraries & Plugins
- **GSAP 3.12.5** - Professional-grade animation
- **ScrollTrigger** - Scroll-based animations
- **Lenis 1.0.42** - Smooth scroll functionality
-c

### Build Tools
- No build process required (vanilla stack)
- Optional: Minification for production

---

## ⚙️ Configuration

### Domain Setup

Update domain references in:
- `sitemap.xml` - Line 12, 23, 30, etc.
- `robots.txt` - Line 15
- `index.html` - Meta tags (lines 13-24)

```bash
# Find and replace
find . -type f -name "*.xml" -o -name "*.txt" -o -name "*.html" | xargs sed -i 's/cyberentityz.com/YOUR-DOMAIN.com/g'
```

### Contact Information

Update in `index.html`:
- Phone: Search for `tel:09500551090`
- Email: Search for `info@cyberentityz.com`
- Address: Located in about section

---

## 📊 Features

### Homepage Sections

1. **Split Hero** - Dual-panel hero with slideshow
2. **Hero Typography** - Large-scale animated text
3. **Featured Work** - Service cards with hover previews
4. **Certifications** - Comprehensive service breakdown
5. **Stats** - Achievement metrics
6. **Reviews** - Google testimonials
7. **About** - Company background
8. **Why Choose Us** - Key advantages
9. **Experience** - Years of service
10. **Clients** - Partner logos
11. **FAQ** - Common questions
12. **Contact** - Footer with contact info

### Animations

- **Scroll Progress Bar** - Visual scroll indicator
- **Text Line Reveals** - Staggered word animations
- **Section Fade-Ins** - Progressive reveals
- **Parallax Layers** - Multi-depth scrolling
- **Image Reveals** - Directional entrance effects
- **Hover Effects** - Interactive card tilts

### Responsive Design

- **Desktop**: Full experience with all animations
- **Tablet**: Optimized layout, reduced animations
- **Mobile**: Touch-friendly, simplified interactions

---

## 🔒 Security

Configured in `.htaccess`:

- ✅ Prevents clickjacking (X-Frame-Options)
- ✅ Blocks MIME type sniffing
- ✅ XSS protection enabled
- ✅ Hides sensitive files (.htaccess, .git, .env)
- ✅ Disables directory listing
- ✅ Ready for HTTPS redirect (commented)

---

## 🎨 Customization

### Colors

Edit CSS variables in `assets/css/style.css`:

```css
:root {
  --black: #000000;
  --white: #ffffff;
  --red: #ff4500;      /* Primary accent */
  --gray: rgba(255, 255, 255, 0.4);
}
```

### Typography

Fonts are loaded from Google Fonts:
- **Inter** (300-900 weights) - Body text
- **Noto Sans JP** (400, 700, 900) - Japanese elements

### Images

Replace images in `assets/images/`:
- Hero images: `1.png` through `5.png`
- Maintain aspect ratios for best results

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full Support |
| Firefox | 88+ | ✅ Full Support |
| Safari | 14+ | ✅ Full Support |
| Edge | 90+ | ✅ Full Support |
| Mobile Safari | 14+ | ✅ Full Support |
| Chrome Mobile | 90+ | ✅ Full Support |

---

## 🚢 Deployment

### Pre-Deployment

1. **Review** `DEPLOYMENT-CHECKLIST.md`
2. **Create** favicon.png (32x32 or 180x180px)
3. **Test** on multiple devices/browsers
4. **Validate** HTML/CSS
5. **Check** performance (PageSpeed Insights)

### Hosting Requirements

- Apache server with:
  - `mod_rewrite` enabled
  - `mod_deflate` enabled
  - `mod_expires` enabled
  - `mod_headers` enabled
- PHP not required (static site)
- SSL certificate recommended

### Upload Files

```bash
# Via FTP/SFTP
# Upload all files to public_html or www directory

# Via Git (recommended)
git init
git add .
git commit -m "Initial commit"
git push origin main
```

### Post-Deployment

1. Test 404 page: `yourdomain.com/invalid-page`
2. Verify sitemap: `yourdomain.com/sitemap.xml`
3. Check robots.txt: `yourdomain.com/robots.txt`
4. Submit sitemap to Google Search Console
5. Enable HTTPS redirect in `.htaccess`

---

## 🐛 Known Issues & Fixes

### ✅ Fixed
- Lenis scope error (variable hoisting)
- 404 page not displaying
- About section not centered
- Missing SEO meta tags

### ⚠️ Before Launch
- [ ] Create favicon.png
- [ ] Test on all target browsers
- [ ] Verify contact information
- [ ] Set up email forwarding

---

## 📈 Performance

### Optimization Applied
- GZIP compression enabled
- Browser caching configured
- Image lazy loading (via scroll reveal)
- CSS/JS loaded appropriately
- Reduced motion support

### Recommendations
- Convert images to WebP format
- Minify CSS/JS for production
- Use CDN for external libraries
- Enable HTTP/2 on server

---

## 📞 Support & Contact

**CYBERENTITYZ**
- **Location**: Chennai, Tamil Nadu, India
- **Phone**: 09500551090
- **Email**: info@cyberentityz.com
- **Website**: https://cyberentityz.com

---

## 📄 License

Copyright © 2026 CYBERENTITYZ. All rights reserved.

---

## 🤝 Contributing

This is a client project. For inquiries about modifications or enhancements, please contact CYBERENTITYZ directly.

---

## 📚 Documentation

- **DEPLOYMENT-CHECKLIST.md** - Pre-launch verification steps
- **.htaccess** - Server configuration details
- **sitemap.xml** - SEO structure
- **robots.txt** - Crawler guidelines

---

**Built with ❤️ for CYBERENTITYZ**

*Last Updated: April 27, 2026*

