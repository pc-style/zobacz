import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS = createRemoteJWKSet(
  new URL("https://auth.pcstyle.dev/.well-known/jwks.json")
);

export interface SessionPayload {
  sub: string;
  email?: string;
  iss: string;
  iat: number;
  exp: number;
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWKS);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export function getSessionCookie(): string | null {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "session") {
      return decodeURIComponent(value);
    }
  }
  return null;
}

export function getAuthUrl(): string {
  const returnUrl = encodeURIComponent(window.location.href);
  return `https://auth.pcstyle.dev?return=${returnUrl}`;
}

export function logout(): void {
  window.location.href = "https://auth.pcstyle.dev/api/auth/logout";
}
