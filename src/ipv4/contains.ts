import { ip2long } from './index';

/**
 * Verify if the IP address is within the CIDR range
 *
 * @param cidr - A standard format CIDR address
 * @param ip - The IPv4 address to check
 * @returns True if within range, otherwise false
 *
 * @example
 * ```
 * contains('192.168.1.0/24', '192.168.1.5')    // true
 * contains('192.168.1.0/24', '192.168.2.5')    // false
 * ```
 */

export function contains(cidr: string, ip: string): boolean {
  const _cidr = String(cidr);
  const hostAndMask = _cidr.split('/');

  const cidrHost = ip2long(hostAndMask[0]);
  const cidrMask = Number.parseInt(hostAndMask[1] ?? 33);
  const ipAddr = ip2long(ip);

  if (typeof cidrHost === 'undefined' || typeof ipAddr === 'undefined') {
    return false;
  }

  return _contains(cidrHost, cidrMask, ipAddr);
}

export function _contains(
  cidrHost: number,
  cidrMask: number,
  ip: number
): boolean {
  const netmask =
    cidrMask >= 0 && cidrMask <= 32
      ? 2 ** 32 - 2 ** (32 - cidrMask)
      : undefined;

  if (typeof netmask === 'undefined') return false;
  return (cidrHost & netmask) === (ip & netmask);
}
