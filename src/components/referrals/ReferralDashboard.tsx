'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Gift, TrendingUp, Users } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

interface ReferralDashboardProps {
  className?: string
}

export default function ReferralDashboard({ className = '' }: ReferralDashboardProps) {
  const { data: session } = useSession()
  const [referralCode, setReferralCode] = useState('')
  const [referralStats, setReferralStats] = useState({
    totalEarnings: 0,
    totalReferrals: 0,
    activeReferrals: 0,
    conversionRate: 0
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      generateReferralCode()
      fetchReferralStats()
    }
  }, [session])

  const generateReferralCode = () => {
    // Generate a unique referral code based on user data
    const userId = session?.user?.id || 'demo'
    const username = session?.user?.name?.replace(/\s+/g, '').toUpperCase() || 'USER'
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase()
    setReferralCode(`${username}${randomStr}`)
  }

  const fetchReferralStats = async () => {
    try {
      // In a real app, fetch from your API
      setReferralStats({
        totalEarnings: 245.50,
        totalReferrals: 12,
        activeReferrals: 8,
        conversionRate: 67
      })
    } catch (error) {
      console.error('Failed to fetch referral stats:', error)
    }
  }

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Referral code copied!')
    } catch (error) {
      toast.error('Failed to copy code')
    }
  }

  const shareReferralLink = (platform: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://baddie-thrift.com'
    const referralUrl = `${baseUrl}?ref=${referralCode}`
    const shareText = `Join me on Baddie Thrift for amazing secondhand fashion finds! Use my code ${referralCode} for 20% off your first order 💎✨`

    let shareUrl = ''
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}&quote=${encodeURIComponent(shareText)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralUrl)}`
        break
      case 'instagram':
      case 'tiktok':
        navigator.clipboard.writeText(`${shareText}\n\n${referralUrl}`)
        toast.success('Referral info copied! Paste in your post or story.')
        return
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }

    // Track referral share
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'referral_share',
        properties: {
          platform,
          referralCode
        }
      })
    }).catch(console.error)
  }

  if (!session) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 text-center ${className}`}>
        <Gift className="mx-auto mb-4 text-primary-600" size={48} />
        <h3 className="text-lg font-semibold mb-2">Start Earning with Referrals</h3>
        <p className="text-gray-600 mb-4">Sign in to get your unique referral code and start earning commissions!</p>
        <button className="btn-primary">Sign In to Get Started</button>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Referral Code Card */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Your Referral Code</h3>
          <Gift size={24} />
        </div>
        
        <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-mono font-bold">{referralCode}</span>
            <button
              onClick={copyReferralCode}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-md transition-colors"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </div>

        <p className="text-primary-100 text-sm mb-4">
          Share your code and earn 10% commission on every purchase made by your referrals!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => shareReferralLink('facebook')}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Facebook
          </button>
          <button
            onClick={() => shareReferralLink('instagram')}
            className="bg-pink-600 hover:bg-pink-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Instagram
          </button>
          <button
            onClick={() => shareReferralLink('tiktok')}
            className="bg-black hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            TikTok
          </button>
          <button
            onClick={() => shareReferralLink('twitter')}
            className="bg-blue-400 hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Twitter
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <TrendingUp className="mx-auto mb-2 text-green-600" size={32} />
          <div className="text-2xl font-bold text-gray-900">${referralStats.totalEarnings}</div>
          <div className="text-sm text-gray-600">Total Earnings</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Users className="mx-auto mb-2 text-blue-600" size={32} />
          <div className="text-2xl font-bold text-gray-900">{referralStats.totalReferrals}</div>
          <div className="text-sm text-gray-600">Total Referrals</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <Gift className="mx-auto mb-2 text-primary-600" size={32} />
          <div className="text-2xl font-bold text-gray-900">{referralStats.activeReferrals}</div>
          <div className="text-sm text-gray-600">Active Referrals</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <TrendingUp className="mx-auto mb-2 text-orange-600" size={32} />
          <div className="text-2xl font-bold text-gray-900">{referralStats.conversionRate}%</div>
          <div className="text-sm text-gray-600">Conversion Rate</div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">How Referrals Work</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <p className="font-medium">Share your code</p>
              <p className="text-sm text-gray-600">Share your unique referral code with friends on social media</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <p className="font-medium">Friends get discount</p>
              <p className="text-sm text-gray-600">They get 20% off their first order when using your code</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <p className="font-medium">You earn commission</p>
              <p className="text-sm text-gray-600">Earn 10% commission on every purchase they make</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}