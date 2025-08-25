import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json()

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For now, we'll use a simple approach
    // In production, you'd want to use a service like SendGrid, Mailgun, or EmailJS
    
    // Create the email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

Submitted at: ${new Date().toISOString()}
    `.trim()

    // Log the submission (in production, you'd send an actual email)
    console.log('Contact form submission:', { name, email, message })

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully! I will get back to you soon.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
