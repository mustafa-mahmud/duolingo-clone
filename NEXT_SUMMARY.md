# Next Migration Summary (10)

## Scope completed

- Read and followed `AGENTS.md` before making implementation decisions.
- Verified existing Clerk and Expo dependencies in `package.json` before considering packages.
- Confirmed no new packages are needed for the social OAuth flow.
- Updated `COMPATIBILITY_REPORT.md` before writing OAuth code.
- Detected the existing Google and Facebook social buttons in `AuthSocialButtons`.
- Connected only the existing social buttons to Clerk OAuth.
- Preserved the existing UI design and NativeWind styling patterns.

## Clerk OAuth flow implemented

- `AuthSocialButtons` now uses Clerk `useSSO()` from `@clerk/clerk-expo`.
- Existing Google button maps to Clerk strategy `oauth_google`.
- Existing Facebook button maps to Clerk strategy `oauth_facebook`.
- No new social login buttons were added.
- `WebBrowser.maybeCompleteAuthSession()` is called at module scope.
- Button taps call `startSSOFlow({ strategy, redirectUrl })`.
- Redirect URL is created with `Linking.createURL('oauth-callback')`, using the existing `duolingoclone` app scheme from `app.json`.
- If Clerk returns `createdSessionId` and `setActive`, the app activates the session with `setActive({ session: createdSessionId })`.
- After session activation, the app navigates home with `router.replace('/')`.

## Error and loading behavior

- Duplicate social OAuth attempts are blocked while an OAuth flow is active.
- OAuth failures show an alert titled `Social sign in failed`.
- Clerk error messages are surfaced when available.
- A generic fallback message is shown when Clerk does not provide a specific error.

## Compatibility notes

- Existing `@clerk/clerk-expo` dependency is reused.
- Existing `expo-web-browser` dependency is reused for the browser OAuth session.
- Existing `expo-auth-session` support remains available through Clerk's Expo SSO helper.
- Existing `expo-linking` dependency is reused for the redirect URL.
- Existing `expo-secure-store` dependency remains the token-cache storage mechanism.
- No new dependency was installed.
- No custom native module, Clerk native module, config plugin, prebuild, EAS build, or development-build-only feature was introduced.
- Implementation remains compatible with Expo SDK 54 and standard Expo Go.

## Validation completed

- `npm run lint` completed successfully.
- `npx tsc --noEmit` completed successfully.

## Files touched in this step

- `COMPATIBILITY_REPORT.md`
- `components/AuthSocialButtons.tsx`
- `NEXT_SUMMARY.md`

## Not implemented yet

- Resend implementation remains pending.
- No UI redesign was performed.
