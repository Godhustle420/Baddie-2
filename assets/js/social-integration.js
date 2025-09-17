// ==========================================
// Social Media Integration Module
// ==========================================

class SocialIntegration {
    constructor() {
        this.facebookSDKLoaded = false;
        this.tiktokSDKLoaded = false;
        this.init();
    }

    init() {
        this.loadFacebookSDK();
        this.loadTikTokSDK();
        this.setupSocialMetaTags();
        this.setupAdvancedTracking();
    }

    // Facebook SDK Integration
    loadFacebookSDK() {
        if (this.facebookSDKLoaded) return;

        window.fbAsyncInit = () => {
            FB.init({
                appId: 'YOUR_FACEBOOK_APP_ID', // Replace with actual Facebook App ID
                cookie: true,
                xfbml: true,
                version: 'v18.0'
            });

            this.facebookSDKLoaded = true;
            console.log('Facebook SDK loaded successfully');
            
            // Track Facebook SDK load
            this.trackSocialEvent('facebook_sdk_loaded');
        };

        // Load Facebook SDK script
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        document.head.appendChild(script);
    }

    // TikTok SDK Integration (Custom implementation)
    loadTikTokSDK() {
        // TikTok doesn't have an official SDK like Facebook, but we can implement custom functionality
        this.tiktokSDKLoaded = true;
        console.log('TikTok integration initialized');
        this.trackSocialEvent('tiktok_integration_loaded');
    }

    // Dynamic Open Graph Meta Tags
    setupSocialMetaTags() {
        this.updateMetaTags({
            title: 'Baddie Thrift Store - Curated Vintage Fashion',
            description: 'Discover unique vintage and secondhand fashion pieces at unbeatable prices',
            image: this.getDefaultOGImage(),
            url: window.location.href
        });
    }

    updateMetaTags(product = null) {
        const metaConfig = product ? {
            title: `${product.title} - Baddie Thrift Store`,
            description: `${product.description} - Only $${product.price.toFixed(2)}!`,
            image: this.getProductOGImage(product),
            url: window.location.href + `#product-${product.id}`,
            type: 'product',
            price: product.price,
            currency: 'USD',
            availability: 'in stock'
        } : {
            title: 'Baddie Thrift Store - Curated Vintage Fashion',
            description: 'Discover unique vintage and secondhand fashion pieces at unbeatable prices',
            image: this.getDefaultOGImage(),
            url: window.location.href,
            type: 'website'
        };

        // Update or create meta tags
        this.setMetaTag('og:title', metaConfig.title);
        this.setMetaTag('og:description', metaConfig.description);
        this.setMetaTag('og:image', metaConfig.image);
        this.setMetaTag('og:url', metaConfig.url);
        this.setMetaTag('og:type', metaConfig.type);
        this.setMetaTag('og:site_name', 'Baddie Thrift Store');

        // Twitter meta tags
        this.setMetaTag('twitter:title', metaConfig.title);
        this.setMetaTag('twitter:description', metaConfig.description);
        this.setMetaTag('twitter:image', metaConfig.image);
        this.setMetaTag('twitter:card', 'summary_large_image');

        // Product-specific meta tags
        if (product) {
            this.setMetaTag('product:price:amount', metaConfig.price);
            this.setMetaTag('product:price:currency', metaConfig.currency);
            this.setMetaTag('product:availability', metaConfig.availability);
            this.setMetaTag('product:condition', product.condition);
            this.setMetaTag('product:brand', 'Baddie Thrift Store');
            this.setMetaTag('product:category', product.category);
        }
    }

    setMetaTag(property, content) {
        let meta = document.querySelector(`meta[property="${property}"]`) || 
                  document.querySelector(`meta[name="${property}"]`);
        
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        
        meta.setAttribute('content', content);
    }

    // Advanced Facebook Sharing
    shareProductOnFacebook(product, customMessage = '') {
        if (!this.facebookSDKLoaded) {
            console.warn('Facebook SDK not loaded yet');
            return this.fallbackFacebookShare(product);
        }

        // Update meta tags for this specific product
        this.updateMetaTags(product);

        const shareParams = {
            method: 'share',
            href: window.location.href + `#product-${product.id}`,
            quote: customMessage || `Check out this amazing ${product.title} I found at Baddie Thrift Store! Only $${product.price.toFixed(2)} 💕 #ThriftFinds #SustainableFashion`
        };

        FB.ui(shareParams, (response) => {
            if (response && !response.error_message) {
                this.trackSocialEvent('facebook_share_success', {
                    product_id: product.id,
                    product_name: product.title,
                    share_type: 'product'
                });
                
                if (window.app) {
                    window.app.showNotification('Successfully shared on Facebook! 🎉', 'success');
                }
            } else {
                this.trackSocialEvent('facebook_share_error', {
                    product_id: product.id,
                    error: response?.error_message || 'Unknown error'
                });
            }
        });
    }

    fallbackFacebookShare(product) {
        const url = encodeURIComponent(window.location.href + `#product-${product.id}`);
        const quote = encodeURIComponent(`Check out this amazing ${product.title} I found at Baddie Thrift Store! Only $${product.price.toFixed(2)} 💕 #ThriftFinds #SustainableFashion`);
        
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`;
        window.open(shareUrl, 'facebook-share', 'width=600,height=400,scrollbars=yes,resizable=yes');
        
        this.trackSocialEvent('facebook_share_fallback', {
            product_id: product.id,
            product_name: product.title
        });
    }

    // Advanced TikTok Sharing
    shareProductOnTikTok(product, includeHashtags = true) {
        const baseText = `Found this amazing ${product.title} at Baddie Thrift Store! 💕✨`;
        const priceText = `Only $${product.price.toFixed(2)}`;
        const urlText = window.location.href + `#product-${product.id}`;
        
        const hashtags = includeHashtags ? [
            '#ThriftFinds',
            '#SustainableFashion', 
            '#BaddieStyle',
            '#VintageFinds',
            '#ThriftFlip',
            '#SecondhandFirst',
            '#OOTD',
            '#ThriftHaul'
        ].join(' ') : '';

        const shareText = `${baseText}\n${priceText}\n\n${hashtags}\n\n${urlText}`;

        // Try to use the Web Share API first (mobile devices)
        if (navigator.share) {
            navigator.share({
                title: `${product.title} - Baddie Thrift Store`,
                text: shareText,
                url: window.location.href + `#product-${product.id}`
            }).then(() => {
                this.trackSocialEvent('tiktok_share_native_success', {
                    product_id: product.id,
                    product_name: product.title
                });
                
                if (window.app) {
                    window.app.showNotification('Share link created! Perfect for TikTok! 📱✨', 'success');
                }
            }).catch((error) => {
                console.log('Native share failed:', error);
                this.copyTikTokShareText(shareText, product);
            });
        } else {
            this.copyTikTokShareText(shareText, product);
        }
    }

    copyTikTokShareText(shareText, product) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                this.trackSocialEvent('tiktok_share_clipboard_success', {
                    product_id: product.id,
                    product_name: product.title
                });
                
                if (window.app) {
                    window.app.showNotification('TikTok content copied! Ready to paste in your TikTok 🎬✨', 'success');
                }
            }).catch(() => {
                this.showTikTokShareModal(shareText, product);
            });
        } else {
            this.showTikTokShareModal(shareText, product);
        }
    }

    showTikTokShareModal(shareText, product) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <span class="modal-close" onclick="this.closest('.modal').remove()">&times;</span>
                <h3 style="color: var(--primary-pink); margin-bottom: 1rem;">
                    <i class="fab fa-tiktok"></i> Ready for TikTok!
                </h3>
                <p style="margin-bottom: 1rem;">Copy this text for your TikTok post:</p>
                <textarea 
                    readonly 
                    style="width: 100%; height: 150px; padding: 10px; border: 2px solid var(--primary-pink); border-radius: 8px; font-family: inherit; resize: vertical;"
                    onclick="this.select()"
                >${shareText}</textarea>
                <div style="margin-top: 1rem; text-align: center;">
                    <button class="btn btn-primary" onclick="this.previousElementSibling.previousElementSibling.select(); document.execCommand('copy'); this.textContent='Copied!'; setTimeout(() => this.textContent='Copy Text', 2000);">
                        Copy Text
                    </button>
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        Close
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        modal.style.display = 'block';

        this.trackSocialEvent('tiktok_share_modal_shown', {
            product_id: product.id,
            product_name: product.title
        });
    }

    // Social Commerce Integration Helpers
    generateFacebookShopXML() {
        // Generate product catalog XML for Facebook Shop
        const products = window.app ? window.app.products : [];
        
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
<channel>
<title>Baddie Thrift Store</title>
<link>${window.location.origin}</link>
<description>Curated vintage and secondhand fashion</description>`;

        products.forEach(product => {
            xml += `
<item>
<g:id>${product.id}</g:id>
<g:title>${product.title}</g:title>
<g:description>${product.description}</g:description>
<g:link>${window.location.href}#product-${product.id}</g:link>
<g:image_link>${this.getProductOGImage(product)}</g:image_link>
<g:condition>${product.condition.toLowerCase().replace(' ', '_')}</g:condition>
<g:availability>in stock</g:availability>
<g:price>${product.price.toFixed(2)} USD</g:price>
<g:brand>Baddie Thrift Store</g:brand>
<g:product_category>${product.category}</g:product_category>
<g:google_product_category>Apparel &amp; Accessories</g:google_product_category>
</item>`;
        });

        xml += `
</channel>
</rss>`;

        return xml;
    }

    // Enhanced tracking for social commerce
    setupAdvancedTracking() {
        // Track social referrals
        this.trackSocialReferrals();
        
        // Track scroll depth for engagement
        this.trackScrollDepth();
        
        // Track time on page
        this.trackTimeOnPage();
    }

    trackSocialReferrals() {
        const referrer = document.referrer.toLowerCase();
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source');
        const utmMedium = urlParams.get('utm_medium');
        const utmCampaign = urlParams.get('utm_campaign');

        let socialSource = null;

        if (referrer.includes('facebook.com') || utmSource === 'facebook') {
            socialSource = 'facebook';
        } else if (referrer.includes('tiktok.com') || utmSource === 'tiktok') {
            socialSource = 'tiktok';
        } else if (referrer.includes('instagram.com') || utmSource === 'instagram') {
            socialSource = 'instagram';
        }

        if (socialSource) {
            this.trackSocialEvent('social_referral', {
                source: socialSource,
                medium: utmMedium,
                campaign: utmCampaign,
                referrer: referrer
            });

            // Store in session for attribution
            sessionStorage.setItem('social_source', socialSource);
        }
    }

    trackScrollDepth() {
        let maxScroll = 0;
        const thresholds = [25, 50, 75, 90];
        
        window.addEventListener('scroll', () => {
            const scrolled = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrolled > maxScroll) {
                maxScroll = scrolled;
                
                thresholds.forEach(threshold => {
                    if (scrolled >= threshold && !sessionStorage.getItem(`scroll_${threshold}`)) {
                        sessionStorage.setItem(`scroll_${threshold}`, 'true');
                        this.trackSocialEvent('scroll_depth', {
                            depth: threshold,
                            social_source: sessionStorage.getItem('social_source')
                        });
                    }
                });
            }
        });
    }

    trackTimeOnPage() {
        const startTime = Date.now();
        
        // Track time when user leaves
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            this.trackSocialEvent('time_on_page', {
                time_seconds: timeSpent,
                social_source: sessionStorage.getItem('social_source')
            });
        });
    }

    trackSocialEvent(eventName, eventData = {}) {
        // Add social source attribution to all events
        const enrichedData = {
            ...eventData,
            social_source: sessionStorage.getItem('social_source'),
            timestamp: Date.now(),
            page_url: window.location.href
        };

        console.log('Social Event:', eventName, enrichedData);

        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'CustomEvent', {
                event_name: eventName,
                ...enrichedData
            });
        }

        // TikTok Pixel tracking
        if (typeof ttq !== 'undefined') {
            ttq.track('ClickButton', {
                content_type: eventName,
                ...enrichedData
            });
        }

        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, enrichedData);
        }
    }

    // Helper methods for image generation
    getDefaultOGImage() {
        return `${window.location.origin}/assets/images/og-image.jpg`;
    }

    getProductOGImage(product) {
        // In a real implementation, this would return actual product images
        return `${window.location.origin}/assets/images/products/product-${product.id}.jpg`;
    }

    // Method to create social-optimized product URLs
    createSocialProductURL(product, platform) {
        const baseUrl = window.location.origin;
        const productUrl = `${baseUrl}/#product-${product.id}`;
        
        const utmParams = new URLSearchParams({
            utm_source: platform,
            utm_medium: 'social',
            utm_campaign: 'product_share',
            utm_content: product.id
        });

        return `${productUrl}?${utmParams.toString()}`;
    }

    // Export functionality for Facebook Shop catalog
    downloadFacebookCatalog() {
        const xml = this.generateFacebookShopXML();
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'baddie-thrift-facebook-catalog.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.trackSocialEvent('facebook_catalog_download');
    }
}

// Initialize social integration
document.addEventListener('DOMContentLoaded', () => {
    window.socialIntegration = new SocialIntegration();
});

// Enhanced sharing functions for global access
window.shareOnFacebookAdvanced = (productId, customMessage = '') => {
    const product = window.app?.products.find(p => p.id === productId);
    if (product && window.socialIntegration) {
        window.socialIntegration.shareProductOnFacebook(product, customMessage);
    }
};

window.shareOnTikTokAdvanced = (productId, includeHashtags = true) => {
    const product = window.app?.products.find(p => p.id === productId);
    if (product && window.socialIntegration) {
        window.socialIntegration.shareProductOnTikTok(product, includeHashtags);
    }
};