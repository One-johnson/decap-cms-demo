import { NextRequest, NextResponse } from "next/server";

/**
 * Starts the GitHub OAuth flow for Decap CMS.
 * Decap opens this URL in a popup; we redirect to GitHub's authorize endpoint.
 */
export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "GITHUB_CLIENT_ID is not configured" },
      { status: 500 },
    );
  }

  const host = request.headers.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const redirectUri =
    process.env.OAUTH_REDIRECT_URL ?? `${protocol}://${host}/api/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "repo,user",
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
  );
}
