# Clerk Expo Migration Summary

- Current app flow is `index -> onboarding -> /sign-up` with auth routes in `app/(auth)/`.
- Existing auth is fully mocked UI only. There is no real auth provider, no Zustand auth store, no AsyncStorage auth persistence, and no route protection.
- Mocked sign-in and sign-up both just collect an email, open a verification modal, and then navigate to `/` after a 6-digit input.
- Fake authenticated state is not stored anywhere. "Logged in" is simulated only by [`router.replace('/')`](Youtube/duolingo-clone/components/VerificationModal.tsx:55).
- No logout flow exists.
- No Clerk packages are currently installed in [`package.json`](Youtube/duolingo-clone/package.json:1), but Expo SDK 54 and Expo Go are compatible with Clerk Expo patterns.
- [`app/_layout.tsx`](Youtube/duolingo-clone/app/_layout.tsx:11) is the integration point for [`ClerkProvider`](Youtube/duolingo-clone/app/_layout.tsx:11), explicit `publishableKey`, and Clerk `tokenCache`.
- [`app.json`](Youtube/duolingo-clone/app.json:8) already has the deep-link scheme `duolingoclone`, which can be reused for Clerk native auth/OAuth flows.
- Recommended migration: add Clerk provider first, then replace mocked email OTP flows with Clerk [`useSignIn()`](<Youtube/duolingo-clone/app/(auth)/sign-in.tsx:10>) and [`useSignUp()`](<Youtube/duolingo-clone/app/(auth)/sign-up.tsx:10>) email-code flows, then add route guards and a real post-auth destination.
- For Expo Go / SDK 54, prefer `@clerk/expo` with `expo-secure-store` and Clerk `tokenCache`; avoid web/Next.js patterns and use Expo Router native route protection only.
