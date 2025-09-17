// ==========================================
// Main Application JavaScript
// ==========================================

class ThriftStoreApp {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = { category: 'all', price: 'all' };
        this.init();
    }

    init() {
        this.loadSampleProducts();
        this.setupEventListeners();
        this.setupNavigation();
        this.displayProducts();
        this.trackPageView();
    }

    // Sample product data with thrift store items
    loadSampleProducts() {
        this.products = [
            {
                id: 1,
                title: "Vintage 90s Denim Jacket",
                description: "Classic oversized denim jacket with authentic vintage wash",
                price: 45.00,
                originalPrice: 85.00,
                category: "tops",
                featured: true,
                sale: true,
                image: "placeholder",
                condition: "Excellent"
            },
            {
                id: 2,
                title: "Floral Midi Dress",
                description: "Beautiful floral print midi dress, perfect for summer",
                price: 32.00,
                originalPrice: 68.00,
                category: "dresses",
                featured: true,
                sale: true,
                image: "placeholder",
                condition: "Very Good"
            },
            {
                id: 3,
                title: "Designer Leather Handbag",
                description: "Authentic designer leather handbag in mint condition",
                price: 120.00,
                originalPrice: 350.00,
                category: "accessories",
                featured: true,
                sale: false,
                image: "placeholder",
                condition: "Like New"
            },
            {
                id: 4,
                title: "High-Waisted Mom Jeans",
                description: "Trendy high-waisted mom jeans with perfect vintage fit",
                price: 28.00,
                originalPrice: 55.00,
                category: "bottoms",
                featured: false,
                sale: true,
                image: "placeholder",
                condition: "Good"
            },
            {
                id: 5,
                title: "Silk Blouse",
                description: "Elegant silk blouse with delicate button details",
                price: 35.00,
                originalPrice: 75.00,
                category: "tops",
                featured: true,
                sale: false,
                image: "placeholder",
                condition: "Excellent"
            },
            {
                id: 6,
                title: "Vintage Band T-Shirt",
                description: "Authentic vintage band t-shirt from the 80s",
                price: 22.00,
                originalPrice: 45.00,
                category: "tops",
                featured: false,
                sale: true,
                image: "placeholder",
                condition: "Very Good"
            },
            {
                id: 7,
                title: "Statement Earrings",
                description: "Bold statement earrings perfect for any outfit",
                price: 15.00,
                originalPrice: 35.00,
                category: "accessories",
                featured: false,
                sale: false,
                image: "placeholder",
                condition: "Like New"
            },
            {
                id: 8,
                title: "Vintage Leather Boots",
                description: "Classic vintage leather boots with heel",
                price: 55.00,
                originalPrice: 95.00,
                category: "shoes",
                featured: true,
                sale: false,
                image: "placeholder",
                condition: "Good"
            }
        ];
        this.filteredProducts = [...this.products];
    }

    setupEventListeners() {
        // Mobile navigation toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Filter event listeners
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.currentFilter.category = e.target.value;
                this.filterProducts();
            });
        }

        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.currentFilter.price = e.target.value;
                this.filterProducts();
            });
        }

        // Newsletter form
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleNewsletterSignup(e);
            });
        }

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    displayProducts() {
        this.displayFeaturedProducts();
        this.displayAllProducts();
        this.displaySaleProducts();
    }

    displayFeaturedProducts() {
        const container = document.getElementById('featured-products');
        if (!container) return;

        const featuredProducts = this.products.filter(product => product.featured);
        container.innerHTML = featuredProducts.map(product => this.createProductCard(product)).join('');
    }

    displayAllProducts() {
        const container = document.getElementById('all-products');
        if (!container) return;

        container.innerHTML = this.filteredProducts.map(product => this.createProductCard(product)).join('');
    }

    displaySaleProducts() {
        const container = document.getElementById('sale-products');
        if (!container) return;

        const saleProducts = this.products.filter(product => product.sale);
        container.innerHTML = saleProducts.map(product => this.createProductCard(product)).join('');
    }

    createProductCard(product) {
        const discountPercentage = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <i class="fas fa-tshirt"></i>
                    ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
                    ${product.sale ? '<span class="product-badge sale">-' + discountPercentage + '%</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">
                        <span class="price-current">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary btn-small" onclick="app.viewProduct(${product.id})">
                            View Details
                        </button>
                        <button class="btn btn-outline btn-small" onclick="app.addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                    <div class="social-share">
                        <span class="social-share-label">Share:</span>
                        <button class="share-btn share-btn-facebook" onclick="app.shareOnFacebook(${product.id})">
                            <i class="fab fa-facebook-f"></i>
                            Facebook
                        </button>
                        <button class="share-btn share-btn-tiktok" onclick="app.shareOnTikTok(${product.id})">
                            <i class="fab fa-tiktok"></i>
                            TikTok
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    filterProducts() {
        this.filteredProducts = this.products.filter(product => {
            const categoryMatch = this.currentFilter.category === 'all' || 
                                product.category === this.currentFilter.category;
            
            let priceMatch = true;
            if (this.currentFilter.price !== 'all') {
                const [min, max] = this.currentFilter.price.split('-').map(p => 
                    p === '100+' ? Infinity : parseInt(p)
                );
                priceMatch = product.price >= min && (max === undefined || product.price <= max);
            }

            return categoryMatch && priceMatch;
        });

        this.displayAllProducts();
    }

    viewProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Track product view
        this.trackEvent('ViewProduct', {
            product_id: productId,
            product_name: product.title,
            price: product.price,
            category: product.category
        });

        // Create and show modal
        this.showProductModal(product);
    }

    showProductModal(product) {
        const modalHTML = `
            <div class="modal" id="product-modal">
                <div class="modal-content">
                    <span class="modal-close" onclick="app.closeModal()">&times;</span>
                    <div class="product-detail">
                        <div class="product-image-large">
                            <i class="fas fa-tshirt" style="font-size: 4rem; color: var(--primary-pink);"></i>
                        </div>
                        <div class="product-detail-info">
                            <h2>${product.title}</h2>
                            <p class="product-condition">Condition: ${product.condition}</p>
                            <p>${product.description}</p>
                            <div class="product-price">
                                <span class="price-current">$${product.price.toFixed(2)}</span>
                                ${product.originalPrice ? `<span class="price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
                            </div>
                            <div class="product-actions" style="margin: 1rem 0;">
                                <button class="btn btn-primary" onclick="app.addToCart(${product.id})">
                                    Add to Cart
                                </button>
                            </div>
                            <div class="social-share">
                                <span class="social-share-label">Share this item:</span>
                                <button class="share-btn share-btn-facebook" onclick="app.shareOnFacebook(${product.id})">
                                    <i class="fab fa-facebook-f"></i>
                                    Share on Facebook
                                </button>
                                <button class="share-btn share-btn-tiktok" onclick="app.shareOnTikTok(${product.id})">
                                    <i class="fab fa-tiktok"></i>
                                    Share on TikTok
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('product-modal');
        if (existingModal) existingModal.remove();

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.getElementById('product-modal').style.display = 'block';

        // Close modal when clicking outside
        document.getElementById('product-modal').addEventListener('click', (e) => {
            if (e.target.id === 'product-modal') {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('product-modal');
        if (modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Track add to cart event
        this.trackEvent('AddToCart', {
            product_id: productId,
            product_name: product.title,
            price: product.price,
            category: product.category
        });

        // Show success message
        this.showNotification(`${product.title} added to cart!`, 'success');
    }

    shareOnFacebook(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Track share event
        this.trackEvent('Share', {
            platform: 'facebook',
            product_id: productId,
            product_name: product.title
        });

        const url = encodeURIComponent(window.location.href + `#product-${productId}`);
        const title = encodeURIComponent(`Check out this amazing ${product.title} at Baddie Thrift Store!`);
        const description = encodeURIComponent(product.description);

        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`;
        
        window.open(shareUrl, 'facebook-share', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }

    shareOnTikTok(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Track share event
        this.trackEvent('Share', {
            platform: 'tiktok',
            product_id: productId,
            product_name: product.title
        });

        const url = encodeURIComponent(window.location.href + `#product-${productId}`);
        const title = encodeURIComponent(`Amazing ${product.title} from Baddie Thrift Store! 💕✨ #ThriftFinds #SustainableFashion #BaddieStyle`);

        // TikTok doesn't have a direct share URL like Facebook, so we'll copy to clipboard
        const shareText = `${decodeURIComponent(title)}\n\n${decodeURIComponent(url)}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('TikTok share text copied to clipboard! Create your TikTok and paste this.', 'info');
            });
        } else {
            // Fallback for older browsers
            this.showNotification('Copy this for your TikTok post: ' + shareText, 'info');
        }
    }

    handleNewsletterSignup(e) {
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Track newsletter signup
        this.trackEvent('Newsletter', {
            email: email
        });

        // Simulate API call
        setTimeout(() => {
            this.showNotification('Thanks for subscribing to our newsletter!', 'success');
            e.target.reset();
        }, 500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 1.2rem; cursor: pointer; margin-left: 10px;">&times;</button>
        `;

        // Add notification styles if not already added
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    color: white;
                    z-index: 3000;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-width: 300px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    animation: slideIn 0.3s ease;
                }
                .notification-success { background: #4CAF50; }
                .notification-error { background: #F44336; }
                .notification-info { background: #2196F3; }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    trackPageView() {
        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'PageView');
        }

        // TikTok Pixel tracking
        if (typeof ttq !== 'undefined') {
            ttq.page();
        }
    }

    trackEvent(eventName, eventData = {}) {
        console.log('Tracking event:', eventName, eventData);

        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            switch(eventName) {
                case 'ViewProduct':
                    fbq('track', 'ViewContent', {
                        content_type: 'product',
                        content_ids: [eventData.product_id],
                        value: eventData.price,
                        currency: 'USD'
                    });
                    break;
                case 'AddToCart':
                    fbq('track', 'AddToCart', {
                        content_type: 'product',
                        content_ids: [eventData.product_id],
                        value: eventData.price,
                        currency: 'USD'
                    });
                    break;
                case 'Share':
                    fbq('track', 'Share', eventData);
                    break;
                case 'Newsletter':
                    fbq('track', 'Lead', eventData);
                    break;
            }
        }

        // TikTok Pixel tracking
        if (typeof ttq !== 'undefined') {
            switch(eventName) {
                case 'ViewProduct':
                    ttq.track('ViewContent', {
                        content_type: 'product',
                        content_id: eventData.product_id,
                        value: eventData.price,
                        currency: 'USD'
                    });
                    break;
                case 'AddToCart':
                    ttq.track('AddToCart', {
                        content_type: 'product',
                        content_id: eventData.product_id,
                        value: eventData.price,
                        currency: 'USD'
                    });
                    break;
                case 'Share':
                    ttq.track('Share', eventData);
                    break;
                case 'Newsletter':
                    ttq.track('SubmitForm', eventData);
                    break;
            }
        }

        // Google Analytics tracking (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }

    // Method to detect social traffic and show special landing content
    detectSocialTraffic() {
        const referrer = document.referrer.toLowerCase();
        const urlParams = new URLSearchParams(window.location.search);
        const source = urlParams.get('utm_source') || urlParams.get('source');

        if (referrer.includes('facebook.com') || source === 'facebook') {
            this.showSocialLanding('facebook');
        } else if (referrer.includes('tiktok.com') || source === 'tiktok') {
            this.showSocialLanding('tiktok');
        }
    }

    showSocialLanding(platform) {
        const platformConfig = {
            facebook: {
                title: 'Welcome from Facebook! 💙',
                subtitle: 'Exclusive deals for our Facebook community',
                icon: 'fab fa-facebook-f'
            },
            tiktok: {
                title: 'Hey TikTok Baddies! ✨',
                subtitle: 'Special finds just for our TikTok family',
                icon: 'fab fa-tiktok'
            }
        };

        const config = platformConfig[platform];
        if (!config) return;

        const landingBanner = document.createElement('div');
        landingBanner.className = 'social-landing';
        landingBanner.innerHTML = `
            <div class="container">
                <h2 class="social-landing-title">${config.title}</h2>
                <p class="social-landing-subtitle">${config.subtitle}</p>
                <div class="social-badge">
                    <i class="${config.icon}"></i>
                    <span>Social Exclusive</span>
                </div>
                <a href="#sale" class="btn btn-primary">Shop Special Deals</a>
            </div>
        `;

        // Insert after header
        const header = document.querySelector('.header');
        header.insertAdjacentElement('afterend', landingBanner);

        // Track social landing
        this.trackEvent('SocialLanding', { platform: platform });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ThriftStoreApp();
    
    // Check for social traffic
    app.detectSocialTraffic();
});

// Handle browser back/forward
window.addEventListener('popstate', () => {
    // Handle any state changes if needed
});