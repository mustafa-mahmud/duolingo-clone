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

It provides the APIs needed across the current Clerk migration work:

- `ClerkProvider`
- `useSSO()`
- `setActive()` returned by Clerk's SSO flow
- `useAuth()` for route protection and logout
- `signOut()` returned by `useAuth()`

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

## Route protection update

This route protection step will reuse the existing installed stack and will not install new packages.

### Clerk APIs used

- `useAuth()` from `@clerk/clerk-expo`
- `isLoaded` to wait until Clerk has resolved session state
- `isSignedIn` to determine whether private or onboarding routes are accessible

These are JavaScript React hooks from the existing Clerk Expo package. They do not require a custom native module, development build, EAS build, prebuild, config plugin, or handwritten native code.

### Expo Router APIs used

- `Stack` from `expo-router`
- `Stack.Protected` from `expo-router`

`Stack.Protected` is an Expo Router route protection pattern available in the installed Expo Router version. It protects routes declaratively from the root navigator instead of redirecting after a screen has already rendered.

### Flicker prevention decision

The protected navigator will render only after Clerk session state is loaded:

- While Clerk is still loading, the app renders no routes.
- After Clerk loads, authenticated users can access the home route.
- After Clerk loads, unauthenticated users can access onboarding and auth routes.

This avoids unauthorized screens flashing briefly before auth redirects complete.

### Why this remains Expo Go compatible

This implementation uses only:

- existing `@clerk/clerk-expo`
- existing `expo-router`
- React render state from Clerk session hooks

It does not add or use any Clerk native module. Because route protection depends only on `useAuth()` session state and Expo Router's JavaScript navigator configuration, it will not trigger `Cannot find native module 'ClerkExpo'`.

## Logout update

The logout step will reuse the existing installed stack and will not install new packages.

### Clerk APIs used

- `useAuth()` from `@clerk/clerk-expo`
- `signOut()` returned by `useAuth()`

`signOut()` is part of Clerk's JavaScript auth resource API exposed by the existing Expo package. Calling it from an already-rendered React Native screen does not require a custom native module, development build, EAS build, prebuild, config plugin, or handwritten native code.

### Expo Router APIs used

- `router.replace('/onboarding')` from `expo-router`

After `signOut()` resolves, navigation will replace the current private route with onboarding. This uses Expo Router's JavaScript navigation API and relies on the existing route protection to keep unauthenticated users in the public route branch.

### Why this remains Expo Go compatible

This logout implementation uses only:

- existing `@clerk/clerk-expo`
- existing `expo-router`
- Clerk JavaScript session state

It does not add or use a Clerk native module. Because logout depends only on `useAuth().signOut()` and Expo Router JavaScript navigation, it will not trigger `Cannot find native module 'ClerkExpo'`.

## Authentication cleanup update

The authentication cleanup step will not add or install any packages.

### Clerk APIs kept

- `ClerkProvider` from `@clerk/clerk-expo`
- `tokenCache` from `@clerk/clerk-expo/token-cache`
- `useAuth()` from `@clerk/clerk-expo`
- `useSignIn()` from `@clerk/clerk-expo`
- `useSignUp()` from `@clerk/clerk-expo`
- `useSSO()` from `@clerk/clerk-expo`

These APIs are already in use and remain compatible with standard Expo Go because they run through Clerk's Expo JavaScript APIs plus existing Expo SDK packages.

### Cleanup scope

The cleanup will remove only mock, fake, temporary, unused, or dead authentication code if present. It will not remove the local UI state required for live Clerk flows, such as verification modal visibility, submitting flags, verification flags, and social sign-in button disabling.

### Why this remains Expo Go compatible

This step does not introduce any new auth package, native module, config plugin, prebuild requirement, EAS build requirement, or development-build-only feature. Keeping only the existing Clerk Expo APIs ensures the app continues to avoid native-only Clerk APIs and should not trigger `Cannot find native module 'ClerkExpo'`.

## Implementation decision

Proceed with the existing Expo Go-compatible stack:

- Keep `@clerk/clerk-expo`.
- Keep `expo-secure-store`.
- Keep `expo-web-browser`.
- Keep `expo-auth-session`.
- Keep `expo-linking`.
- Keep `expo-router`.
- Do not install packages.
- Do not add native modules.
- Do not add config plugins.
- Do not prebuild.
- Preserve the current UI and NativeWind classes.
- Use `useAuth()` session state only for route access.
- Use `Stack.Protected` to guard private and public route groups.
- Wait for Clerk auth state before rendering protected routes.
- Replace the old onboarding navigation mock logout with Clerk `signOut()`.
- Navigate to onboarding with Expo Router after sign-out completes.
