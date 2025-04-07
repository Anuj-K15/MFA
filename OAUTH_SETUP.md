# OAuth Configuration Guide for Production

## Google OAuth Setup

You're encountering a `Error 400: redirect_uri_mismatch` error because the redirect URI configured in your Google Cloud Console doesn't match the callback URL your application is using in production.

### Steps to Fix Google OAuth:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to "APIs & Services" > "Credentials"
4. Find and edit your OAuth 2.0 Client ID
5. Add the following Authorized Redirect URIs:
   - `https://mfa-anuj.vercel.app/api/auth/callback/google`
   - `https://mfa-anuj.vercel.app/api/auth/callback/google/`
   
   (Keep your existing `http://localhost:3000/api/auth/callback/google` URI for local development)

6. Click "Save"

## Environment Variables in Vercel

Make sure your Vercel deployment has the following environment variables set:

```
NEXTAUTH_URL=https://mfa-anuj.vercel.app
NEXTAUTH_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Other OAuth Providers

### Facebook

If you're using Facebook OAuth, make sure to add:
- `https://mfa-anuj.vercel.app/api/auth/callback/facebook` to your Valid OAuth Redirect URIs in the Facebook Developer Console.

### GitHub

If you're using GitHub OAuth, make sure to add:
- `https://mfa-anuj.vercel.app/api/auth/callback/github` to your Authorization callback URL in GitHub OAuth Apps settings.

## Testing

After making these changes:
1. Wait a few minutes for the changes to propagate
2. Try signing in with Google again on your production site
3. If issues persist, check the browser console and server logs for more specific error messages