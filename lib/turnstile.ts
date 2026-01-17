type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
};

export async function verifyTurnstileToken(token: string, remoteIp?: string) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured.");
    return { success: false, message: "Verification is temporarily unavailable. Please try again shortly." };
  }

  if (!token) {
    return { success: false, message: "Captcha verification failed. Please refresh and try again." };
  }

  try {
    const body = new URLSearchParams();
    body.append("secret", secretKey);
    body.append("response", token);
    if (remoteIp) {
      body.append("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = (await response.json()) as TurnstileVerifyResponse;

    if (!data.success) {
      console.error("Turnstile verification failed", data["error-codes"]);
      return { success: false, message: "Captcha verification failed. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Turnstile verification error", error);
    return { success: false, message: "Captcha verification failed. Please try again." };
  }
}
