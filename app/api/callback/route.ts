import { NextRequest, NextResponse } from "next/server";

/**
 * Completes the GitHub OAuth flow for Decap CMS.
 * Exchanges the authorization code for an access token, then posts it
 * back to the Decap popup via window.postMessage.
 */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!code) {
    return new NextResponse("Missing authorization code", { status: 400 });
  }

  if (!clientId || !clientSecret) {
    return new NextResponse(
      "GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not configured",
      { status: 500 },
    );
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    },
  );

  const tokenData = (await tokenResponse.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!tokenData.access_token) {
    const message =
      tokenData.error_description ?? tokenData.error ?? "Token exchange failed";
    return new NextResponse(message, { status: 400 });
  }

  const authPayload = JSON.stringify({
    token: tokenData.access_token,
    provider: "github",
  });

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Authorizing Decap CMS…</title>
  </head>
  <body>
    <p>Authorization complete. You can close this window.</p>
    <script>
      (function () {
        var authPayload = ${authPayload};
        function receiveMessage(event) {
          window.opener.postMessage(
            "authorization:github:success:" + JSON.stringify(authPayload),
            event.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
