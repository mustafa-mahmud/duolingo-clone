# Clerk Expo Go Compatibility Report

## Project context

- Expo SDK: `54` from `expo@~54.0.34`
- React Native: `0.81.5`
- Runtime target: standard Expo Go
- Existing Clerk package: `@clerk/clerk-expo@^2.19.31`
- Existing token storage dependency: `expo-secure-store@~15.0.8`

No new packages are required for this verification-code implementation.

## Clerk packages used

### `@clerk/clerk-expo`

This project already uses `@clerk/clerk-expo` for Clerk React Native / Expo authentication.

It provides the APIs needed for this task:

- `ClerkProvider`
- `useSignUp()`
- `setActive()` returned from `useSignUp()`
- `signUp.attemptEmailAddressVerification()`

The implementation will continue using the existing installed package instead of adding another Clerk package.

### `@clerk/clerk-expo/token-cache`

This project already imports `tokenCache` from `@clerk/clerk-expo/token-cache` in the root layout.

The token cache uses the existing Expo-compatible `expo-secure-store` package so Clerk sessions can persist securely on device.

## Expo Go compatibility

The planned implementation uses only JavaScript APIs exposed by the already installed Clerk Expo package:

- Create / prepare sign-up is already implemented with `useSignUp()`.
- Verification will call `signUp.attemptEmailAddressVerification({ code })`.
- Session activation will call `setActive({ session: result.createdSessionId })`.
- Navigation will use Expo Router's existing JavaScript router API.

These calls do not require a custom development client, EAS build, prebuild, config plugin, or native code changes.

## Native module requirements

No new native module will be introduced.

The only native-backed dependency involved is `expo-secure-store`, which is already installed and is an Expo SDK package supported by Expo Go when installed at the SDK-compatible version. The current installed version, `expo-secure-store@~15.0.8`, matches the Expo SDK 54 dependency family.

The verification flow itself does not call a native-only Clerk module. It only calls Clerk's JavaScript sign-up resource methods and activates the resulting session through Clerk's React context.

## Why this will not trigger `Cannot find native module 'ClerkExpo'`

This implementation will not add or use any API that requires a separate native `ClerkExpo` module.

Specifically, it will not use:

- native-only Clerk APIs
- config plugins
- prebuild-only features
- custom native modules
- development-build-only functionality

The project already renders through `ClerkProvider` and uses Clerk sign-up APIs. The next step only connects the existing verification modal to the existing `signUp` object and `setActive` callback. Because no additional native Clerk bridge is introduced, the implementation should not cause Expo Go to fail with `Cannot find native module 'ClerkExpo'`.

## Implementation decision

Proceed with the existing Expo Go-compatible stack:

- Keep `@clerk/clerk-expo`.
- Keep `expo-secure-store`.
- Do not install packages.
- Use `signUp.attemptEmailAddressVerification({ code })` for code verification.
- Use `setActive({ session })` after successful verification.
- Use Expo Router navigation after activation.
