import { Router } from 'express';

const router = Router();

// Facebook Shop integration
router.post('/facebook/connect', async (req, res) => {
  res.json({ success: true, message: 'Facebook Shop connect endpoint' });
});

router.post('/facebook/sync-products', async (req, res) => {
  res.json({ success: true, message: 'Facebook Shop sync products endpoint' });
});

// TikTok Shop integration
router.post('/tiktok/connect', async (req, res) => {
  res.json({ success: true, message: 'TikTok Shop connect endpoint' });
});

router.post('/tiktok/sync-products', async (req, res) => {
  res.json({ success: true, message: 'TikTok Shop sync products endpoint' });
});

// Get connected integrations
router.get('/', async (req, res) => {
  res.json({ success: true, message: 'Get integrations endpoint' });
});

export default router;