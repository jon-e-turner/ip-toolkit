import { ip2long } from './ip2long';
import { isValidMask } from './isValidMask';

/**
 * Verify if the IPv4 address is valid.
 * If provided, verify subnet mask is also valid.
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

  if (typeof ip === 'string' && ip.indexOf('/') > 0 && !isValidMask(ip))
    return false;

  return typeof ip2long(ip) === 'number';
}
