'use server';

/**
 * Grok X Search Server Actions
 *
 * Uses xAI's Responses API with X Search tool to analyze user tweets
 * and determine MBTI personality type.
 */

interface GrokResponse {
  id: string;
  object: string;
  created_at: number;
  model: string;
  output: Array<{
    type: string;
    content?: Array<{
      type: string;
      text: string;
    }>;
    role?: string;
    status?: string;
  }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
  };
}

interface MBTIResult {
  code: string;
  type: string;
  variant?: 'A' | 'T';
  reasoning?: string;
  confidence?: number;
}

/**
 * Parse MBTI code from Grok's response
 */
function parseMBTIFromResponse(response: GrokResponse): MBTIResult | null {
  try {
    // Find the message output in the response
    const messageOutput = response.output?.find(item => item.type === 'message');
    const content = messageOutput?.content?.[0]?.text;

    if (!content) return null;

    console.log('[Grok] Raw response:', content);

    // Try to extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*"mbtiCode"[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      const fullCode = parsed.mbtiCode || parsed.code || parsed.mbti;

      if (fullCode) {
        const [type, variant] = fullCode.split('-');
        return {
          code: fullCode,
          type: type.toUpperCase(),
          variant: variant as 'A' | 'T' | undefined,
          reasoning: parsed.reasoning || parsed.explanation,
          confidence: parsed.confidence
        };
      }
    }

    // Fallback: Look for MBTI patterns (e.g., "INTJ-A", "ENFP")
    const mbtiPattern = /\b([IE][NS][TF][JP])(?:-([AT]))?\b/g;
    const matches = content.match(mbtiPattern);

    if (matches && matches.length > 0) {
      const fullCode = matches[0];
      const [type, variant] = fullCode.split('-');
      return {
        code: fullCode,
        type: type.toUpperCase(),
        variant: variant as 'A' | 'T' | undefined
      };
    }

    return null;
  } catch (error) {
    console.error('[Grok] Error parsing MBTI from response:', error);
    return null;
  }
}

/**
 * Analyze user's MBTI personality type using Grok X Search
 *
 * @param username Twitter username (without @)
 * @returns MBTI result or null on error
 */
export async function analyzeMBTIWithXSearch(username: string): Promise<MBTIResult | null> {
  const startTime = Date.now();

  console.log(`[Persona] Starting Grok X Search analysis for user: @${username}`);

  try {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      console.error('[Grok] XAI_API_KEY not found in environment');
      return null;
    }

    const prompt = `You are an expert in MBTI personality analysis. Search for recent tweets from @${username} and analyze their personality type based on the Myers-Briggs Type Indicator (MBTI).

Based on the user's tweets, determine:
1. Their MBTI type (one of the 16 types: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP)
2. Their variant: A (Assertive) or T (Turbulent)
3. Brief reasoning for your determination

Look for patterns in:
- Communication style (direct vs diplomatic)
- Topics they discuss (abstract vs concrete)
- Decision-making approach (logical vs emotional)
- Planning vs spontaneity
- Confidence and self-assurance

Return your analysis as a JSON object in this exact format:
{
  "mbtiCode": "INTJ-A",
  "reasoning": "Brief explanation of why you chose this type based on their tweets",
  "confidence": 0.85
}`;

    console.log('[Persona] Calling Grok X Search API (server action)');

    const response = await fetch('https://api.x.ai/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'grok-4-1-fast',
        input: [
          {
            role: 'system',
            content: 'You are an expert MBTI personality analyst. Use the X search tool to find and analyze tweets.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        tools: [
          {
            type: 'x_search',
            allowed_x_handles: [username]
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Grok] API error:', response.status, errorText);
      return null;
    }

    const data: GrokResponse = await response.json();
    const duration = Date.now() - startTime;

    console.log(`[Persona] Grok analysis duration: ${duration}ms`);
    console.log('[Grok] Full response structure:', JSON.stringify(data, null, 2));

    const result = parseMBTIFromResponse(data);

    if (result) {
      console.log(`[Persona] MBTI result: ${result.code}`);
    } else {
      console.error('[Persona] Failed to parse MBTI from Grok response');
    }

    return result;

  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`[Persona] Error calling Grok API (${duration}ms):`, error);
    return null;
  }
}
