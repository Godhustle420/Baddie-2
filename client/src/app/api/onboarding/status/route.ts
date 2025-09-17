import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In a real app, this would call the backend API
    // For now, we'll return mock data
    const mockStatus = {
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

    return NextResponse.json({
      success: true,
      data: mockStatus
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch onboarding status' },
      { status: 500 }
    );
  }
}