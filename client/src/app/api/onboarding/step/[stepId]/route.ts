import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ stepId: string }> }
) {
  try {
    const { stepId } = await params;
    const body = await request.json();
    const { completed, data } = body;

    // Mock step update logic
    console.log(`Updating step ${stepId}:`, { completed, data });

    // Simulate step-specific validation
    const stepActions: Record<string, () => { success: boolean; message: string }> = {
      '2': () => {
        if (data?.storeName && data?.description) {
          return { success: true, message: 'Store profile saved successfully' };
        }
        return { success: false, message: 'Store name and description are required' };
      },
      '3': () => {
        if (data?.paymentProvider) {
          return { success: true, message: 'Payment method configured successfully' };
        }
        return { success: false, message: 'Payment provider selection is required' };
      },
      '4': () => {
        if (data?.shippingOptions?.length > 0) {
          return { success: true, message: 'Shipping options configured successfully' };
        }
        return { success: false, message: 'At least one shipping option is required' };
      },
      '5': () => {
        if (data?.productTitle && data?.price) {
          return { success: true, message: 'First product added successfully' };
        }
        return { success: false, message: 'Product title and price are required' };
      }
    };

    const stepAction = stepActions[stepId];
    const result = stepAction ? stepAction() : { success: true, message: 'Step updated' };

    if (!result.success) {
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: {
        stepId: parseInt(stepId),
        completed,
        nextStep: completed ? parseInt(stepId) + 1 : parseInt(stepId)
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update onboarding step' },
      { status: 500 }
    );
  }
}