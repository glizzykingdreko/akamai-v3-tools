import { NextRequest, NextResponse } from 'next/server';
import { extractCookieHash } from 'akamai-v3-sensor-data-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cookie } = body;

    if (!cookie) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required field: cookie"
        },
        { status: 400 }
      );
    }

    const hash = extractCookieHash(cookie);

    if (!hash) {
      return NextResponse.json(
        {
          success: false,
          message: "No bm_st hash found in cookie string"
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      value: hash
    });
  } catch (error) {
    console.error('Hash extraction error:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during hash extraction"
      },
      { status: 500 }
    );
  }
} 