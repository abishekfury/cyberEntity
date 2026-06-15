# 🚀 CYBERENTITYZ - DEPLOYMENT CHECKLIST
## Pre-Launch Verification Guide

---

## ✅ 1. REQUIRED FILES & STRUCTURE

### Core Files
- [x] **index.html** - Main homepage
- [x] **404.html** - Custom error page
- [x] **.htaccess** - Server configuration
- [x] **robots.txt** - Search engine instructions
- [x] **sitemap.xml** - SEO sitemap

### Assets Structure
```
assets/
  ├── css/
  │   ├── style.css
  │   └── portfolio-page.css
  ├── js/
  │   ├── script.js
  │   ├── animations.js
  │   └── portfolio-page.js
  └── images/
      ├── 1.png
      ├── 2.png
      ├── 3.png
      ├── 4.png
      ├── 5.png
      └── favicon.png (⚠️ NEEDS TO BE CREATED)
```

### Service Pages
- [x] work/Global-Training.html
- [x] work/Skill-Programs.html
- [x] work/Pearson-VUE.html
- [x] work/Service-Academia.html
- [x] work/Service-Organiztions.html

---

## ⚠️ 2. ITEMS TO FIX/CREATE BEFORE LAUNCH

### High Priority
1. **Create Favicon** 
   - [ ] Create favicon.png (32x32 or 180x180px)
   - [ ] Place in: `assets/images/favicon.png`
   - [ ] Consider creating full icon set (16x16, 32x32, 180x180, 192x192)

2. **Update Domain References**
   - [ ] Update all `https://cyberentityz.com` in:
     - sitemap.xml
     - robots.txt
     - index.html (Open Graph tags)
   - [ ] If using different domain, do a find-replace

3. **Phone Number Verification**
   - [ ] Verify phone number: `09500551090`
   - [ ] Confirm it's in the correct format for your region
   - [ ] Test that all `tel:` links work

4. **Email Address**
   - [ ] Verify email: `info@cyberentityz.com`
   - [ ] Ensure email account is set up and receiving

---

## 🔧 3. TECHNICAL CHECKS

### Browser Testing
- [ ] Chrome (latest version)
- [ ] Firefox (latest version)
- [ ] Safari (desktop & mobile)
- [ ] Edge (latest version)

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (iPad Pro, iPad Mini)
- [ ] Mobile (iPhone 14, Samsung Galaxy)
- [ ] Test portrait & landscape modes

### Functionality Testing
- [ ] All navigation links work
- [ ] Smooth scrolling works on all sections
- [ ] Mobile menu opens/closes correctly
- [ ] Work item cards clickable and navigate correctly
- [ ] Contact forms (if any) submit properly
- [ ] Phone links work on mobile
- [ ] Email links open mail client
- [ ] All images load correctly
- [ ] 404 page displays on wrong URLs
- [ ] Back button from 404 page works

### Performance
- [ ] Run Google PageSpeed Insights
- [ ] Check images are optimized (use WebP if possible)
- [ ] Verify GZIP compression is working
- [ ] Test on slow 3G connection
- [ ] Ensure CSS/JS files are minified (optional)

### SEO Checks
- [ ] Title tags are unique and descriptive
- [ ] Meta descriptions are compelling
- [ ] Images have alt attributes
- [ ] Heading structure (H1, H2, H3) is logical
- [ ] Open Graph tags are present
- [ ] Twitter Cards are configured
- [ ] robots.txt is accessible: `yourdomain.com/robots.txt`
- [ ] sitemap.xml is accessible: `yourdomain.com/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

### Security
- [ ] Force HTTPS (uncomment in .htaccess when SSL ready)
- [ ] Security headers are set (X-Frame-Options, etc.)
- [ ] No sensitive files exposed (.env, .git, etc.)
- [ ] Test SQL injection on any forms
- [ ] Test XSS vulnerabilities

### Accessibility
- [ ] Test with screen reader
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG standards
- [ ] ARIA labels are present where needed
- [ ] Focus indicators are visible

---

## 🌐 4. HOSTING SETUP

### Before Upload
- [ ] Backup all files locally
- [ ] Create a Git repository (recommended)
- [ ] Document any custom configurations

### SSL Certificate
- [ ] Obtain SSL certificate (Let's Encrypt, Cloudflare, etc.)
- [ ] Install SSL on server
- [ ] Uncomment HTTPS redirect in .htaccess:
  ```apache
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  ```

### DNS Configuration
- [ ] Point domain to hosting server
- [ ] Configure www redirect (www → non-www or vice versa)
- [ ] Set up email DNS records (MX, SPF, DKIM)
- [ ] Wait for DNS propagation (24-48 hours)

### Server Requirements
- [ ] PHP 7.4+ (if needed)
- [ ] Apache with mod_rewrite enabled
- [ ] mod_deflate enabled (for compression)
- [ ] mod_expires enabled (for caching)
- [ ] mod_headers enabled (for security headers)

---

## 📊 5. POST-LAUNCH

### Monitoring Setup
- [ ] Set up Google Analytics
- [ ] Configure Google Search Console
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Create 301 redirects for old URLs (if migrating)

### Social Media
- [ ] Test Open Graph tags on Facebook Debugger
- [ ] Test Twitter Card on Twitter Card Validator
- [ ] Share on social media platforms

### Backups
- [ ] Set up automated backups
- [ ] Document backup restore procedure
- [ ] Test backup restoration

---

## 🐛 6. KNOWN ISSUES FIXED

### ✅ Fixed Issues
- [x] **Lenis scope error** - Variable moved to global scope
- [x] **404 page not showing** - .htaccess created with ErrorDocument
- [x] **Work item links** - Clickable via JavaScript handlers
- [x] **About section centering** - CSS updated for centered layout
- [x] **Missing SEO files** - robots.txt and sitemap.xml created
- [x] **No meta tags** - Open Graph and Twitter Cards added
- [x] **Security headers missing** - Added in .htaccess

---

## 📝 7. OPTIONAL ENHANCEMENTS

### Performance
- [ ] Convert images to WebP format
- [ ] Implement lazy loading for images
- [ ] Use a CDN (Cloudflare, AWS CloudFront)
- [ ] Minify CSS and JavaScript
- [ ] Combine CSS/JS files to reduce requests

### Features
- [ ] Add Google Maps integration (for location)
- [ ] Implement live chat widget
- [ ] Add newsletter signup form
- [ ] Create blog section
- [ ] Add testimonials slider animation
- [ ] Implement dark mode toggle

### Advanced
- [ ] Set up PWA (Progressive Web App)
- [ ] Add structured data (JSON-LD)
- [ ] Implement A/B testing
- [ ] Set up heatmap tracking (Hotjar, Crazy Egg)
- [ ] Add service worker for offline functionality

---

## 🎯 8. FINAL PRE-LAUNCH CHECKLIST

Before you click "Publish":

1. [ ] All images loading correctly
2. [ ] No console errors in browser
3. [ ] Mobile view looks perfect
4. [ ] All forms tested and working
5. [ ] Contact information is correct
6. [ ] Legal pages present (Privacy, Terms) if needed
7. [ ] Favicon displays correctly
8. [ ] 404 page accessible and functional
9. [ ] Performance score > 85 on PageSpeed
10. [ ] No broken links (use broken link checker)

---

## 📞 IMPORTANT CONTACT INFO TO VERIFY

- **Phone**: 09500551090
- **Email**: info@cyberentityz.com
- **Address**: CHENNAI, TAMIL NADU (verify exact address)
- **Website**: https://cyberentityz.com

---

## 🎉 LAUNCH!

Once all items are checked:
1. Upload files via FTP/SFTP
2. Clear server cache
3. Test live site immediately
4. Monitor for 24 hours
5. Announce launch!

---

## 📚 USEFUL TOOLS

- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **Google Search Console**: https://search.google.com/search-console
- **Broken Link Checker**: https://www.brokenlinkcheck.com/
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **SSL Test**: https://www.ssllabs.com/ssltest/

---

**Last Updated**: April 27, 2026
**Status**: ⚠️ READY - Create favicon before launch
