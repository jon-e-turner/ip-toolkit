import { ip2long } from './index';

/**
 * Verify if the subnet mask is valid
 *
 * Note: this function only validates the mask and ignores the IP
 * address. To validate both, use `isValidIP(ip: string)`
 *
 * @param  mask - The subnet mask to valid
 * @returns True if valid, otherwise false
 *
 * @example
 * ```
 * isValidMask(24) // true
 * isValidMask('192.168.1.1/32) //true
 * isValidMask('192.168.1.1/-1) //false
 * isValidMask('255.255.255.0') // true
 * isValidMask('255.255.256.0') // false
 * ```
 */

export function isValidMask(mask: string | number): boolean {
  if (typeof mask === 'string') {
    const [_longMask, _mask] = mask.split('/', 2);
    if (typeof _mask !== 'undefined') {
      const mask = parseInt(_mask);
      return isNaN(mask) || isValidMask(mask);
    }

    const longMask = ip2long(_longMask);
    return typeof longMask === 'number';
  }

  return mask >= 0 && mask <= 32;
}
