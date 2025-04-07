import { NextRequest, NextResponse } from 'next/server';
import { encrypt } from 'akamai-v3-sensor-data-helper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { json_data, script_content, cookie } = body;

    if (!json_data || !script_content) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: json_data and script_content"
        },
        { status: 400 }
      );
    }

    const result = await encrypt(
      JSON.parse(json_data), 
      cookie ? cookie : "a",
      script_content
    );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Encryption failed"
        },
        { status: 400 }
      );
    }

    // Construct the full sensor_data string
    const finalSensorData = `3;0;1;0;${result.seeds[0]};wS5KmeE4vP5vBcKRIM2pPQlq4qZivf0B53dgMqmUH4E=;141659;${result.encryptedData}`;
    
    return NextResponse.json({
      success: true,
      data: {
        output: '{"sensor_data":'.concat(JSON.stringify(finalSensorData), '}')
      }
    });
  } catch (error) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during encryption"
      },
      { status: 500 }
    );
  }
} 