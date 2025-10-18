import { isReserved } from './isReserved';

/**
 * @deprecated - use isReserved() instead.
 * Verify if an IPv4 address is private
 * @param ip - The IPv4 address string
 * @returns True if private IPv4, false otherwise
 *
 * @example
 * ```
 * isPrivate('192.168.0.1') // returns true
 * isPrivate('114.114.114.114') // returns false
 * ```
 */

export function isPrivate(ip: string): boolean {
  return isReserved(ip);
}
