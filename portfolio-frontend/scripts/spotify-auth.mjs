// One-off helper: authorizes your Spotify account and prints a refresh token.
//
//   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
//
// Add http://127.0.0.1:8888/callback as a Redirect URI in your Spotify app settings first.

import http from "node:http";
import { randomBytes } from "node:crypto";

const { SPOTIFY_CLIENT_ID: id, SPOTIFY_CLIENT_SECRET: secret } = process.env;
if (!id || !secret) {
    console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.");
    process.exit(1);
}

const PORT = 8888;
const REDIRECT = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-read-currently-playing user-read-recently-played user-top-read";
const state = randomBytes(16).toString("hex");

const authUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({ client_id: id, response_type: "code", redirect_uri: REDIRECT, scope: SCOPES, state });

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, REDIRECT);
    if (url.pathname !== "/callback") return res.writeHead(404).end();

    const fail = (msg) => {
        res.writeHead(400).end(msg);
        console.error(msg);
        server.close();
        process.exitCode = 1;
    };

    if (url.searchParams.get("state") !== state) return fail("State mismatch.");
    const code = url.searchParams.get("code");
    if (!code) return fail(`Authorization failed: ${url.searchParams.get("error") ?? "no code"}`);

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT }),
    });
    const json = await tokenRes.json();
    if (!tokenRes.ok || !json.refresh_token) return fail(`Token exchange failed: ${JSON.stringify(json)}`);

    res.end("Done. You can close this tab and go back to the terminal.");
    console.log("\nSPOTIFY_REFRESH_TOKEN=" + json.refresh_token);
    console.log("\nAdd it (with the client id and secret) to .env.local and your Vercel project env vars.");
    server.close();
});

server.listen(PORT, "127.0.0.1", () => {
    console.log("Open this URL in your browser and approve access:\n\n" + authUrl + "\n");
});
