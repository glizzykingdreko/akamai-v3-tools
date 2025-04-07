import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from 'akamai-v3-sensor-data-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sensor_data, script_content } = body;

    if (!sensor_data || !script_content) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: sensor_data and script_content"
        },
        { status: 400 }
      );
    }

    const result = await decrypt(sensor_data, script_content);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Decryption failed"
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        script: script_content,
        output: result.data
      }
    });
  } catch (error) {
    console.error('Decryption error:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during decryption"
      },
      { status: 500 }
    );
  }
} 