# 🎉 Boda Mercedes & Pablo - Website Deployed!

## Status: ✅ Live on GitHub Pages

Your wedding website is now live and ready! The complete redesign from the `rampatra` template to the modern `undangan` template has been successfully completed.

## 🌐 Access Your Website

**Live URL:** https://pablovicentem.github.io/Boda-Mercedes-y-Pablo/

## ✨ Features Implemented

### Design & Layout
- **Modern Bootstrap 5 Framework** - Responsive grid system and components
- **AOS Animations** - Smooth fade-up, zoom, and scroll animations on all sections
- **Custom Color Scheme** - Pink/burgundy theme matching wedding aesthetics
- **Fully Responsive** - Perfect on desktop, tablet, and mobile devices

### Key Sections
1. **Hero Section** - Eye-catching envelope animation with floating hearts
2. **Mempelai (Couple)** - Beautiful card layout with couple information
3. **Acara (Events)** - Ceremony and reception details with timeline
4. **Galería (Gallery)** - Wedding photo showcase with hover effects
5. **Ucapan (RSVP)** - Functional form for guest confirmations
6. **Footer** - Social media links and final wishes

### Interactive Features
- ✅ **RSVP Form** - Captures guest confirmations with localStorage
- ✅ **Confetti Animation** - Celebratory effect on form submission
- ✅ **Smooth Scrolling** - Navigation links scroll smoothly to sections
- ✅ **Form Validation** - Required fields validation
- ✅ **Success Messages** - User-friendly feedback after submission

## 📁 Project Structure

```
Boda-Mercedes-y-Pablo/
├── index.html              # Main wedding website
├── css/
│   └── style.css          # Custom styling (358 lines)
├── js/
│   └── main.js            # Form handling & animations
├── package.json           # NPM configuration (for future builds)
├── vite.config.js         # Build tool config
└── [documentation files]
```

## 🔧 Technical Stack

- **HTML5** - Semantic structure
- **Bootstrap 5.3.8** - CSS framework via CDN
- **CSS3** - Custom animations and responsive design
- **JavaScript (Vanilla)** - Form handling and interactivity
- **Libraries:**
  - AOS 2.3.4 - Scroll animations
  - Font Awesome 6.5.1 - Icons
  - Canvas Confetti 1.9.3 - Celebratory effects
  - Google Fonts - Typography

## 📊 Form Data

RSVP responses are stored in browser's localStorage and include:
- Guest name, email, phone
- Number of attendees
- Attendance confirmation
- Personal message for the couple

To access stored data in browser console:
```javascript
JSON.parse(localStorage.getItem('rsvps'))
```

## 🚀 Local Testing

To run locally:
```bash
cd /Users/MSR/Documents/repoboda/Boda-Mercedes-y-Pablo
python3 -m http.server 8000
# Visit http://localhost:8000
```

## 📝 Customization Guide

### Change Wedding Details
Edit in `index.html`:
- Couple names: Search for "Mercedes" and "Pablo"
- Date: "20 de diciembre de 2025"
- Venue/Times: In the **Acara** section
- Images: Update Unsplash URLs in gallery

### Update Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --primary: #d95a7a;      /* Main pink */
    --secondary: #f5a5ac;    /* Light pink */
    --accent: #ffc4d1;       /* Accent pink */
    --dark: #2c3e50;         /* Dark text */
    --light: #f8f9fa;        /* Light bg */
}
```

### Modify Animations
- Adjust timing: Change `duration: 800` in `js/main.js` AOS.init()
- Add effects: Update data-aos attributes in HTML sections
- Speed: Modify CSS animation durations in `style.css`

## 💾 Recent Changes

- ✅ Replaced entire HTML structure with Bootstrap 5 layout
- ✅ Rewrote CSS (358 lines) with modern animations
- ✅ Created `js/main.js` with form handling and confetti
- ✅ Added AOS scroll animations to all sections
- ✅ Implemented RSVP form with localStorage
- ✅ Pushed to GitHub and deployed

## 🔄 Git History

Latest commits:
1. Complete website redesign with undangan template
2. Previous commits with original rampatra template

To view full history:
```bash
git log --oneline
```

## 🎯 Next Steps (Optional)

1. **Backend Integration** - Connect RSVP form to database/email service
2. **Custom Images** - Replace Unsplash gallery with real wedding photos
3. **Analytics** - Add Google Analytics to track visitors
4. **DNS** - Connect custom domain (if desired)
5. **Email Notifications** - Get notified when guests RSVP

## 📧 Support

For questions about the website structure or customization, refer to:
- `README.md` - General information
- `PERSONALIZACION.md` - Customization guide
- `TECNICO.md` - Technical documentation

---

**Website Status:** 🟢 Live and Operational
**Last Updated:** December 20, 2025
**Deploy Platform:** GitHub Pages
**Build Tool:** Vite (configured, CDN-based for now)

¡Que disfrutes tu boda! 💕
