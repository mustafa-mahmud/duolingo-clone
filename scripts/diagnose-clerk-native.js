const { execSync } = require('node:child_process');
const { existsSync } = require('node:fs');
const { join } = require('node:path');

const root = process.cwd();
const pkg = require(join(root, 'package.json'));
const appJson = require(join(root, 'app.json'));

function log(label, value) {
  console.log(`[clerk-native-check] ${label}: ${value}`);
}

function readPackageVersion(packageName) {
  try {
    return require(join(root, 'node_modules', packageName, 'package.json'))
      .version;
  } catch {
    return 'not installed';
  }
}

log('expo dependency', pkg.dependencies?.expo ?? 'missing');
log('@clerk/expo dependency', pkg.dependencies?.['@clerk/expo'] ?? 'missing');
log(
  'expo-secure-store dependency',
  pkg.dependencies?.['expo-secure-store'] ?? 'missing',
);
log('installed expo-secure-store', readPackageVersion('expo-secure-store'));
log('app scheme', appJson.expo?.scheme ?? 'missing');
log(
  'android native project',
  existsSync(join(root, 'android')) ? 'present' : 'missing',
);

try {
  const autolinkCommand =
    'npx expo-modules-autolinking resolve --platform android --json';
  const autolinkOutput = execSync(autolinkCommand, {
    cwd: root,
    encoding: 'utf8',
  });
  const autolink = JSON.parse(autolinkOutput);
  const clerkModule = autolink.modules?.find(
    (module) => module.packageName === '@clerk/expo',
  );
  const secureStoreModule = autolink.modules?.find(
    (module) => module.packageName === 'expo-secure-store',
  );

  log('@clerk/expo autolinked', clerkModule ? 'yes' : 'no');
  log(
    'ClerkExpo native module declared',
    clerkModule?.projects?.[0]?.modules?.includes(
      'expo.modules.clerk.ClerkExpoModule',
    )
      ? 'yes'
      : 'no',
  );
  log(
    'expo-secure-store autolinked version',
    secureStoreModule?.packageVersion ?? 'not autolinked',
  );
} catch (error) {
  log('autolinking check failed', error.message);
}

console.log(
  '\nIf autolinking says ClerkExpo is declared but the app still throws "Cannot find native module ClerkExpo", the running app binary is missing the newly added native module. Rebuild the native app/dev client after confirming this diagnosis.',
);
