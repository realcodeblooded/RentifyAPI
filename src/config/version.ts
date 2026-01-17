import { config } from './environment';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read version from package.json
const getPackageVersion = (): string => {
  try {
    const packageJsonPath = join(__dirname, '../../package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error('Error reading package.json version:', error);
    return '1.0.0'; // Fallback version
  }
};

export const versionInfo = {
  version: getPackageVersion(), // Read from package.json
  buildDate: new Date().toISOString(),
};

export const getVersionInfo = () => versionInfo;