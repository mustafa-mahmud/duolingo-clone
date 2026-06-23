# Clerk Expo Go Compatibility Report

## Project context

- Expo SDK: `54` from `expo@~54.0.34`
- React Native: `0.81.5`
- Runtime target: standard Expo Go
- Existing Clerk package: `@clerk/clerk-expo@^2.19.31`
- Existing OAuth browser dependency: `expo-web-browser@~15.0.11`
- Existing redirect URL dependency: `expo-linking@~8.0.12`
- Existing AuthSession support dependency: `expo-auth-session@~7.0.11`
- Existing token storage dependency: `expo-secure-store@~15.0.8`
- Existing app scheme in `app.json`: `duolingoclone`

No new packages are required for this OAuth implementation.

## Clerk packages used

### `@clerk/clerk-expo`

This project already uses `@clerk/clerk-expo` for Clerk React Native / Expo authentication.

It provides the APIs needed for this task:

- `ClerkProvider`
- `useSSO()`
- `setActive()` returned by Clerk's SSO flow

The implementation will continue using the existing installed package instead of adding another Clerk package.

### `@clerk/clerk-expo/token-cache`

This project already imports `tokenCache` from `@clerk/clerk-expo/token-cache` in the root layout.

The token cache uses the existing Expo-compatible `expo-secure-store` package so Clerk sessions can persist securely on device after a successful OAuth session activation.

## Expo OAuth packages used

### `expo-web-browser`

This package is already installed at the Expo SDK 54-compatible version. Clerk's Expo SSO flow uses the Expo WebBrowser auth-session flow to open the provider login page and return to the app.

`expo-web-browser` is an Expo SDK package and works in standard Expo Go for browser-based authentication. This usage does not require a custom development build, prebuild, EAS build, config plugin, or handwritten native code.

### `expo-linking`

This package is already installed at the Expo SDK 54-compatible version. It creates the redirect URL from the existing app scheme.

The app already declares `"scheme": "duolingoclone"` in `app.json`, so redirects can target the app without adding native code.

### `expo-auth-session`

This package is already installed at the Expo SDK 54-compatible version and remains available for the WebBrowser/AuthSession redirect flow used by Clerk's Expo SSO helper.

## Existing social buttons detected

The existing `AuthSocialButtons` component already contains two social login buttons:

- Google button with `logo-google`
- Facebook button with `logo-facebook`

No new social buttons will be added, and the current UI design and NativeWind classes will be preserved.

## Expo Go compatibility

The implementation uses only Expo Go-compatible JavaScript APIs and already installed Expo SDK packages:

- Existing Google button maps to Clerk strategy `oauth_google`.
- Existing Facebook button maps to Clerk strategy `oauth_facebook`.
- `WebBrowser.maybeCompleteAuthSession()` is called at module scope.
- Button taps call `useSSO().startSSOFlow({ strategy, redirectUrl })`.
- Redirect URL is created with `Linking.createURL('oauth-callback')` using the existing `duolingoclone` app scheme.
- When Clerk returns `createdSessionId`, the returned `setActive` callback activates the session with `setActive({ session: createdSessionId })`.
- Navigation uses Expo Router's existing JavaScript router API after session activation.

These calls do not require a custom development client, EAS build, prebuild, config plugin, or native code changes.

## Native module requirements

No new native module will be introduced.

The native-backed dependencies involved are already installed Expo SDK packages supported by Expo Go at SDK 54-compatible versions:

- `expo-secure-store@~15.0.8`
- `expo-web-browser@~15.0.11`
- `expo-auth-session@~7.0.11`
- `expo-linking@~8.0.12`

The OAuth flow does not call a native-only Clerk module. It uses Clerk's JavaScript SSO hook, Expo WebBrowser, Expo linking redirect creation, and the existing app scheme.

## Why this will not trigger `Cannot find native module 'ClerkExpo'`

This implementation will not add or use any API that requires a separate native `ClerkExpo` module.

Specifically, it will not use:

- native-only Clerk APIs
- Clerk native modules
- config plugins for Clerk
- prebuild-only features
- custom native modules
- development-build-only functionality

The project already renders through `ClerkProvider` and uses Clerk auth resource APIs. This OAuth update only connects the existing social buttons to `useSSO()` and the Expo WebBrowser auth-session flow. Because no additional native Clerk bridge is introduced, the implementation should not cause Expo Go to fail with `Cannot find native module 'ClerkExpo'`.

## Implementation decision

Proceed with the existing Expo Go-compatible stack:

- Keep `@clerk/clerk-expo`.
- Keep `expo-secure-store`.
- Keep `expo-web-browser`.
- Keep `expo-auth-session`.
- Keep `expo-linking`.
- Do not install packages.
- Do not add new social login buttons.
- Preserve the current social button UI and NativeWind classes.
- Connect only the existing Google and Facebook buttons to Clerk OAuth.
- Use `useSSO().startSSOFlow()` with `oauth_google` and `oauth_facebook`.
- Use the existing `duolingoclone` app scheme for redirects.
- Activate the returned Clerk session after successful OAuth.
