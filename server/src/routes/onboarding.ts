import { Router } from 'express';
import { body, validationResult } from 'express-validator';

const router = Router();

// Get onboarding status
router.get('/status', async (req, res) => {
  try {
    // Mock user ID - in real app, get from auth middleware
    const userId = req.headers['user-id'] as string;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Mock onboarding status
    const onboardingStatus = {
      completed: false,
      currentStep: 1,
      totalSteps: 5,
      steps: [
        {
          id: 1,
          title: 'Welcome to Baddie Thrift Store',
          description: 'Learn about our platform features',
          completed: true
        },
        {
          id: 2,
          title: 'Set up your store profile',
          description: 'Add your store name, description, and branding',
          completed: false
        },
        {
          id: 3,
          title: 'Configure payment methods',
          description: 'Connect Stripe, PayPal, or other payment providers',
          completed: false
        },
        {
          id: 4,
          title: 'Set up shipping options',
          description: 'Configure shipping rates and carriers',
          completed: false
        },
        {
          id: 5,
          title: 'Add your first product',
          description: 'List your first item for sale',
          completed: false
        }
      ]
    };

    res.json({
      success: true,
      data: onboardingStatus
    });
  } catch (error) {
    console.error('Error fetching onboarding status:', error);
    res.status(500).json({ error: 'Failed to fetch onboarding status' });
  }
});

// Update onboarding step
router.post('/step/:stepId', [
  body('completed').isBoolean().withMessage('Completed must be a boolean'),
  body('data').optional().isObject().withMessage('Data must be an object')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { stepId } = req.params;
    const { completed, data } = req.body;
    const userId = req.headers['user-id'] as string;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Mock update logic
    console.log(`Updating step ${stepId} for user ${userId}:`, { completed, data });

    // Simulate step-specific processing
    const stepActions = {
      '2': () => {
        // Store profile setup
        if (data?.storeName && data?.description) {
          return { success: true, message: 'Store profile saved successfully' };
        }
        return { success: false, message: 'Store name and description are required' };
      },
      '3': () => {
        // Payment setup
        if (data?.paymentProvider) {
          return { success: true, message: 'Payment method configured successfully' };
        }
        return { success: false, message: 'Payment provider selection is required' };
      },
      '4': () => {
        // Shipping setup
        if (data?.shippingOptions?.length > 0) {
          return { success: true, message: 'Shipping options configured successfully' };
        }
        return { success: false, message: 'At least one shipping option is required' };
      },
      '5': () => {
        // First product
        if (data?.productTitle && data?.price) {
          return { success: true, message: 'First product added successfully' };
        }
        return { success: false, message: 'Product title and price are required' };
      }
    };

    const stepAction = stepActions[stepId as keyof typeof stepActions];
    const result = stepAction ? stepAction() : { success: true, message: 'Step updated' };

    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }

    res.json({
      success: true,
      message: result.message,
      data: {
        stepId: parseInt(stepId),
        completed,
        nextStep: completed ? parseInt(stepId) + 1 : parseInt(stepId)
      }
    });
  } catch (error) {
    console.error('Error updating onboarding step:', error);
    res.status(500).json({ error: 'Failed to update onboarding step' });
  }
});

// Complete onboarding
router.post('/complete', async (req, res) => {
  try {
    const userId = req.headers['user-id'] as string;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Mock completion logic
    console.log(`Completing onboarding for user ${userId}`);

    res.json({
      success: true,
      message: 'Onboarding completed successfully! Welcome to Baddie Thrift Store.',
      data: {
        completedAt: new Date().toISOString(),
        nextSteps: [
          'Explore the dashboard',
          'Add more products',
          'Customize your store theme',
          'Set up social media integrations'
        ]
      }
    });
  } catch (error) {
    console.error('Error completing onboarding:', error);
    res.status(500).json({ error: 'Failed to complete onboarding' });
  }
});

// Skip onboarding
router.post('/skip', async (req, res) => {
  try {
    const userId = req.headers['user-id'] as string;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Mock skip logic
    console.log(`Skipping onboarding for user ${userId}`);

    res.json({
      success: true,
      message: 'Onboarding skipped. You can complete it later from your settings.',
      data: {
        skippedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error skipping onboarding:', error);
    res.status(500).json({ error: 'Failed to skip onboarding' });
  }
});

export default router;