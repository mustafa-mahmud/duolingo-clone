# Authentication Audit Report

## Audit scope

- Reviewed Expo SDK 54 / Expo Go authentication implementation without adding packages or changing authentication code.
- Verified active Clerk flows in `app/_layout.tsx`, `app/(auth)/sign-up.tsx`, `app/(auth)/sign-in.tsx`, `components/AuthSocialButtons.tsx`, `components/VerificationModal.tsx`, and `app/index.tsx`.
- Confirmed the existing compatibility report remains accurate for the installed Expo Go-compatible stack.
- Ran validation commands: `npm run lint` and `npx tsc --noEmit`.

## Compatibility status

- Expo SDK remains `expo@~54.0.34`.
- React Native remains `0.81.5`.
- Clerk package remains `@clerk/clerk-expo@^2.19.31`.
- The app uses `@clerk/clerk-expo`, not the older `@clerk/expo` package.
- `ClerkProvider` receives `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` explicitly.
- `tokenCache` from `@clerk/clerk-expo/token-cache` is configured for session persistence through Expo SecureStore.
- OAuth uses existing Expo packages: `expo-web-browser`, `expo-linking`, and `expo-auth-session`.
- No custom native module, prebuild, EAS build, config plugin change, native Clerk module, or development-build-only feature was added.
- The current implementation should not trigger `Cannot find native module 'ClerkExpo'` because it uses Clerk's Expo JavaScript APIs and Expo Go-supported SDK packages only.

## Flow verification

### 1. Email Sign Up

Status: implemented with caveats.

- `app/(auth)/sign-up.tsx` uses `useSignUp()` from `@clerk/clerk-expo`.
- Account creation calls `signUp.create({ emailAddress, firstName })`.
- Empty email submissions are ignored client-side; Clerk handles server-side validation for invalid email formats and duplicate accounts.
- The flow assumes the Clerk instance allows passwordless email-code sign-up.

### 2. Email Verification

Status: implemented with one remaining issue.

- `app/(auth)/sign-up.tsx` calls `signUp.prepareEmailAddressVerification({ strategy: 'email_code' })` after account creation.
- `components/VerificationModal.tsx` collects a six-digit code and calls `signUp.attemptEmailAddressVerification({ code })`.
- Completed verification activates `result.createdSessionId` through `setActive({ session })` and navigates to `/`.
- Remaining issue: the visible `RESEND` control has no `onPress`, so users cannot request a new code after expiration or delivery failure.

### 3. Email Sign In

Status: implemented with caveats.

- `app/(auth)/sign-in.tsx` uses `useSignIn()` from `@clerk/clerk-expo`.
- Sign-in starts with `signIn.create({ identifier, strategy: 'email_code' })`.
- The implementation assumes email-code sign-in is enabled in the Clerk dashboard.
- Empty email submissions are ignored client-side; Clerk handles invalid or unknown account errors.

### 4. Sign In Verification

Status: implemented with one UX limitation.

- `app/(auth)/sign-in.tsx` calls `signIn.attemptFirstFactor({ strategy: 'email_code', code })`.
- Completed verification activates the returned `createdSessionId` and navigates to `/`.
- Invalid and expired verification-code errors are surfaced in the modal.
- Remaining issue: the visible `RESEND` control has no behavior for sign-in verification either.

### 5. Social Login

Status: implemented with provider-configuration caveats.

- `components/AuthSocialButtons.tsx` uses `useSSO()` with `oauth_google` and `oauth_facebook`.
- `WebBrowser.maybeCompleteAuthSession()` is called at module scope.
- Redirect URL is created with `Linking.createURL('oauth-callback')` and the app scheme exists in `app.json` as `duolingoclone`.
- Completed SSO sessions call the returned `setActive({ session: createdSessionId })` and navigate to `/`.
- Potential bug: if Clerk returns no `createdSessionId` and no thrown error, the UI silently returns to the auth screen without explaining the incomplete flow.
- Production requirement: Google and Facebook OAuth must be enabled and configured in Clerk with redirect/deep-link settings that match the Expo app scheme.

### 6. Logout

Status: implemented.

- `app/index.tsx` uses `useAuth().signOut()`.
- The logout button disables duplicate submissions through `isSigningOut`.
- After sign-out, navigation replaces the current route with `/onboarding`.
- Route protection also keeps signed-out users out of the protected home route.

### 7. Route Protection

Status: implemented.

- `app/_layout.tsx` waits for Clerk auth state through `useAuth().isLoaded` before rendering routes.
- `Stack.Protected guard={isSignedIn}` protects the home route.
- `Stack.Protected guard={!isSignedIn}` limits onboarding and auth screens to signed-out users.
- This prevents most auth flicker because routes are not rendered until Clerk and fonts are ready.

### 8. Session Persistence

Status: implemented.

- `app/_layout.tsx` passes `tokenCache` to `ClerkProvider`.
- `expo-secure-store` is installed and listed in `app.json` plugins.
- Existing implementation uses the Expo Go-compatible SecureStore-backed Clerk token cache.

### 9. App Reload

Status: expected to work.

- On reload, `ClerkProvider` can restore the session from `tokenCache`.
- `RootNavigation` waits for Clerk `isLoaded` before deciding the protected route branch.
- Signed-in users should return to `/`; signed-out users should remain in onboarding/auth routes.
- Runtime verification on device is still recommended because OAuth/deep-link behavior depends on Clerk dashboard provider settings and Expo Go redirect handling.

### 10. Error Handling

Status: partially production-ready.

- Sign-up, sign-in, and social-login failures show `Alert.alert` messages.
- Verification errors show inline modal text and reset the code input.
- Expired and invalid verification-code messages are normalized for user clarity.
- Remaining issue: missing resend support creates a dead-end for expired or undelivered email codes.
- Remaining issue: SSO incomplete/no-session results are not shown to the user.
- Remaining issue: logout errors are not surfaced; the button simply re-enables in `finally`.

## Remaining issues

1. `components/VerificationModal.tsx` shows a `RESEND` button without behavior.
2. `components/AuthSocialButtons.tsx` does not surface an error when SSO completes without `createdSessionId`.
3. `app/_layout.tsx` logs invalid publishable-key configuration but still passes an empty string to `ClerkProvider`; this can produce a runtime auth failure instead of a dedicated setup screen.
4. `app/index.tsx` contains a class typo: `justify-cente`, so home content may not center as intended.
5. Email-code sign-up/sign-in requires matching Clerk dashboard settings; if password or another first factor is required, the current UI cannot complete that flow.
6. `.env.local` contains a `CLERK_SECRET_KEY`. It is ignored by git, but production readiness requires ensuring the secret key is never committed, bundled, logged, or exposed; rotate it if it has been shared outside the local machine.

## Potential bugs

- Expired email verification code cannot be resent from the UI.
- OAuth cancellation or incomplete OAuth can appear as a no-op.
- Logout failure has no user-facing error message.
- Passing an empty publishable key can fail at runtime after only logging to the console.
- If Clerk dashboard does not enable email-code authentication, both email sign-up verification and email sign-in verification will fail.

## TypeScript errors

- `npx tsc --noEmit` completed successfully.
- No TypeScript errors were detected during this audit.

## Lint status

- `npm run lint` completed successfully.
- No lint errors were detected during this audit.

## Navigation issues

- Protected routing is implemented correctly for the current route set.
- `/sign-up` and `/sign-in` are valid Expo Router paths through the `(auth)` route group.
- `/onboarding` is available only while signed out.
- `/` is available only while signed in.
- No blocking navigation issue was found.
- Minor issue: after failed or incomplete OAuth, navigation does not change and the user receives no explanation unless an exception is thrown.

## Production readiness assessment

Overall status: close, but not fully production-ready.

Ready:

- Expo Go-compatible Clerk package usage.
- Secure session persistence with `tokenCache` and `expo-secure-store`.
- Route protection using Clerk session state.
- Passwordless email-code sign-up and sign-in flows, assuming Clerk dashboard settings match.
- Google/Facebook SSO integration pattern for Expo Go.
- Lint and TypeScript validation.

Needs work before production:

- Implement resend verification-code behavior for both sign-up and sign-in.
- Show a user-facing message for incomplete/cancelled SSO results.
- Add logout failure handling.
- Replace empty-key fallback with a clearer production-safe configuration failure UI or startup guard.
- Confirm Clerk dashboard authentication methods and OAuth redirect settings on real devices.
- Ensure no secret keys are ever committed or exposed from local environment files.

## Files changed during this audit

- `AUTHENTICATION_AUDIT_REPORT.md`
- `NEXT_SUMMARY.md`

## Packages changed during this audit

- None.
