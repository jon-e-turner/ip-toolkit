import { ip2long } from './ip2long';

/**
 * Verify if the IPv4 address is valid
 *
 * @param ip - The IPv4 address string
 * @param options - Enable strict mode to disallow leading 0s, false by default
 * @returns True if valid, false otherwise
 *
 * @example
 * ```
 * isValidIP('192.168.1.99') // true
 * isValidIP('192.168.01.99', {strict: true}) // false
 * ```
 */

export function isValidIP(
  ip: string,
  options: { strict?: boolean } = { strict: false }
): boolean {
  if (options.strict) {
    const LEADING_ZERO_REGEX = /(\.?0\d{1,2})/;
    if (LEADING_ZERO_REGEX.test(ip)) return false;
  }

  const [_ip, _mask] = String(ip).split('/', 2);

  // No mask on an IPv4 address implies /32.
  const mask = parseInt(typeof _mask === 'string' ? _mask : '32');
  if (isNaN(mask) || mask < 0 || mask > 32) return false;

  return typeof ip2long(ip) === 'number';
}
