# Social Commerce Documentation

## Quick Setup Guide

### 1. Facebook Integration

**Required Steps:**
1. Replace `YOUR_PIXEL_ID` in all HTML files with your actual Facebook Pixel ID
2. Replace `YOUR_FACEBOOK_APP_ID` with your Facebook App ID
3. Set up Facebook Commerce Manager and product catalog

**Files to Update:**
- `index.html` (line ~275)
- `facebook-exclusive.html` (line ~385)
- `assets/js/social-integration.js` (line ~45)

### 2. TikTok Integration

**Required Steps:**
1. Replace `YOUR_TIKTOK_PIXEL_ID` in all HTML files with your actual TikTok Pixel ID
2. Set up TikTok Business Account and TikTok Shop (where available)

**Files to Update:**
- `index.html` (line ~285)
- `tiktok-exclusive.html` (line ~505)
- `assets/js/social-integration.js` (line ~50)

### 3. Product Configuration

**Update Product Data:**
Edit the products array in `assets/js/app.js` starting at line ~20 to add your actual products.

### 4. Image Assets

**Required Images:**
- `assets/images/og-image.jpg` (1200x630px) - Default Open Graph image
- `assets/images/facebook-exclusive-og.jpg` (1200x630px) - Facebook exclusive page
- `assets/images/tiktok-exclusive-og.jpg` (1200x630px) - TikTok exclusive page
- `assets/images/favicon.ico` - Website favicon
- Product images in `assets/images/products/` directory

### 5. Analytics Setup

**Google Analytics (Optional):**
Add your Google Analytics tracking code to all HTML files in the `<head>` section.

**Facebook Analytics:**
Automatically tracked through Facebook Pixel integration.

**TikTok Analytics:**
Automatically tracked through TikTok Pixel integration.

## Testing Your Setup

1. **Open Browser Developer Tools**
2. **Load index.html in your browser**
3. **Check Console for any errors**
4. **Test social sharing functions**
5. **Verify pixel firing using browser extensions:**
   - Facebook Pixel Helper (Chrome Extension)
   - TikTok Pixel Helper (if available)

## Support

For technical support or questions about implementation, please refer to:
- Facebook Business Help Center
- TikTok Business Help Center
- GitHub Issues for this repository