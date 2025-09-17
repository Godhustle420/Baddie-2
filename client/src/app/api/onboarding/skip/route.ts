import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Mock skip logic
    console.log('Skipping onboarding for user');

    return NextResponse.json({
      success: true,
      message: 'Onboarding skipped. You can complete it later from your settings.',
      data: {
        skippedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to skip onboarding' },
      { status: 500 }
    );
  }
}