'use client'

import { useState } from 'react'
import { Share2, Facebook, Instagram, Twitter, Copy, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'
import type { Product } from '@/types'

interface SocialShareButtonsProps {
  product: Product
  userReferralCode?: string
}

export default function SocialShareButtons({ product, userReferralCode }: SocialShareButtonsProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://baddie-thrift.com'
  const shareUrl = `${baseUrl}/products/${product.id}${userReferralCode ? `?ref=${userReferralCode}` : ''}`
  const shareText = `Check out this amazing ${product.title} for only $${product.price}! Found on Baddie Thrift 💎`

  const handleShare = async (platform: string) => {
    // Track social share for analytics
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'social_share',
          properties: {
            platform,
            productId: product.id,
            shareType: 'product',
            referralCode: userReferralCode
          }
        })
      })
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }

    let shareUrlPlatform = ''
    
    switch (platform) {
      case 'facebook':
        shareUrlPlatform = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
        break
      case 'twitter':
        shareUrlPlatform = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
        break
      case 'instagram':
        // Instagram doesn't support direct URL sharing, copy to clipboard instead
        await copyToClipboard()
        toast.success('Product info copied! Paste in your Instagram story or post.')
        return
      case 'tiktok':
        // TikTok doesn't support direct URL sharing, copy to clipboard instead
        await copyToClipboard()
        toast.success('Product info copied! Share in your TikTok video description.')
        return
    }

    if (shareUrlPlatform) {
      window.open(shareUrlPlatform, '_blank', 'width=600,height=400')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const shareToStory = async (platform: 'facebook' | 'instagram') => {
    // Track story share
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'story_share',
          properties: {
            platform,
            productId: product.id,
            referralCode: userReferralCode
          }
        })
      })
    } catch (error) {
      console.error('Analytics tracking error:', error)
    }

    if (platform === 'facebook') {
      // Facebook Stories API (requires app approval)
      const facebookShareUrl = `https://www.facebook.com/dialog/share?app_id=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&href=${encodeURIComponent(shareUrl)}&hashtag=%23BaddieThrift`
      window.open(facebookShareUrl, '_blank', 'width=600,height=400')
    } else {
      // Instagram doesn't have a direct API, guide user to copy content
      await copyToClipboard()
      toast.success('Content copied! Open Instagram and paste in your story.')
    }
  }

  return (
    <>
      <button
        onClick={() => setShowShareModal(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        <Share2 size={18} />
        <span>Share & Earn</span>
      </button>

      {showShareModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowShareModal(false)} />
            
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold mb-4">Share this product</h3>
              
              {userReferralCode && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-green-800">
                    <strong>Earn rewards!</strong> Share with your referral code and earn commission on every purchase.
                  </p>
                </div>
              )}

              {/* Social Platform Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Facebook className="text-blue-600" size={24} />
                  <span>Share to Facebook</span>
                </button>

                <button
                  onClick={() => shareToStory('facebook')}
                  className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Facebook className="text-blue-600" size={24} />
                  <span>Share to Facebook Story</span>
                </button>

                <button
                  onClick={() => handleShare('instagram')}
                  className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Instagram className="text-pink-600" size={24} />
                  <span>Share to Instagram</span>
                </button>

                <button
                  onClick={() => shareToStory('instagram')}
                  className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Instagram className="text-pink-600" size={24} />
                  <span>Share to Instagram Story</span>
                </button>

                <button
                  onClick={() => handleShare('tiktok')}
                  className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#000000">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  <span>Share on TikTok</span>
                </button>

                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Twitter className="text-blue-400" size={24} />
                  <span>Share to Twitter</span>
                </button>
              </div>

              {/* Copy Link */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or copy link:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowShareModal(false)}
                className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}