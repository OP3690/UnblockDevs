import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { type, name, email, message, toolName } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Please provide your feedback' },
        { status: 400 }
      );
    }

    if (!type || !['feedback', 'bug', 'feature'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid feedback type' },
        { status: 400 }
      );
    }

    // Create feedback
    const feedback = new Feedback({
      type,
      name: name?.trim() || undefined,
      email: email?.toLowerCase().trim() || undefined,
      message: message.trim(),
      toolName: toolName?.trim() || undefined,
      status: 'new',
    });

    await feedback.save();

    return NextResponse.json(
      { message: 'Thank you for your feedback!', id: feedback._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Feedback submission error:', error);

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

