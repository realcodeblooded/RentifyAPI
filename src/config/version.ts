import { config } from './environment';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Reads the application version from package.json file.
 * 
 * Attempts to read and parse the package.json file located two directories
 * above the current file to extract the version number.
 * 
 * @returns {string} The version string from package.json, or '1.0.0' as fallback
 * 
 * @example
 * const version = getPackageVersion();
 * console.log(version); // "2.3.1"
 */
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

/**
 * Application version information object.
 * 
 * Contains the current application version read from package.json
 * and the ISO timestamp of when this module was loaded.
 * 
 * @constant
 * @type {Object}
 * 
 * @property {string} version - Application version from package.json
 * @property {string} buildDate - ISO 8601 timestamp of module initialization
 * 
 * @example
 * console.log(versionInfo);
 * // { version: "2.3.1", buildDate: "2024-01-15T10:30:00.000Z" }
 */
export const versionInfo = {
  version: getPackageVersion(), // Read from package.json
  buildDate: new Date().toISOString(),
};

/**
 * Retrieves the current application version information.
 * 
 * Returns an object containing the application version and build date.
 * This is a getter function for the versionInfo constant.
 * 
 * @returns {Object} Version information object
 * @returns {string} returns.version - Application version number
 * @returns {string} returns.buildDate - ISO 8601 formatted build timestamp
 * 
 * @example
 * const info = getVersionInfo();
 * console.log(`Version: ${info.version}, Built: ${info.buildDate}`);
 */
export const getVersionInfo = () => versionInfo;