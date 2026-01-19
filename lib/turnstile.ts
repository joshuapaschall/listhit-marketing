type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
};

type TurnstileVerificationResult = {
  ok: boolean;
  message?: string;
  status?: number;
  response?: TurnstileVerifyResponse;
};

const VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const VERIFY_TIMEOUT_MS = 4000;

export async function verifyTurnstileToken(token: string, remoteIp?: string): Promise<TurnstileVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured.");
    return { ok: false, message: "Verification temporarily unavailable", status: 503 };
  }

  try {
    const body = new URLSearchParams();
    body.append("secret", secretKey);
    body.append("response", token);
    if (remoteIp) {
      body.append("remoteip", remoteIp);
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);

    const response = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error("Turnstile verification request failed", { status: response.status, secretKeySet: Boolean(secretKey) });
      return { ok: false, message: "Verification temporarily unavailable", status: 503 };
    }

    const data = (await response.json()) as TurnstileVerifyResponse;

    if (!data.success) {
      console.error("Turnstile verification failed", {
        errorCodes: data["error-codes"] ?? [],
        hostname: data.hostname ?? null,
        action: data.action ?? null,
        secretKeySet: Boolean(secretKey),
      });
      return {
        ok: false,
        message: "We couldn’t verify your submission. Please try again.",
        status: 400,
        response: data,
      };
    }

    return { ok: true, response: data };
  } catch (error) {
    console.error("Turnstile verification error", {
      error: error instanceof Error ? error.message : String(error),
      secretKeySet: Boolean(secretKey),
    });
    return { ok: false, message: "Verification temporarily unavailable", status: 503 };
  }
}
