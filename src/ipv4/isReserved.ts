import { contains } from './contains';
import { isValidIP } from './isValidIP';

/**
 * Verify if an IPv4 address is private
 * @param ip - The IPv4 address string
 * @returns True if private IPv4, false otherwise
 *
 * @example
 * ```
 * isReserved('192.168.0.1') // returns true
 * isReserved('114.114.114.114') // returns false
 * ```
 */

export function isReserved(ip: string): boolean {
  if (!isValidIP(ip)) return false;

  const reservedRanges = [
    '0.0.0.0/8', // local, "this" network
    '10.0.0.0/8', // RFC1918 private range
    '100.64.0.0/10', // carrier-grade NAT
    '127.0.0.0/8', // loopback
    '169.254.0.0/16', // link-local address, for DHCP failures
    '172.16.0.0/12', // RFC1918 private network
    '192.0.0.0/24', // IETF protocol assignments
    '192.0.2.0/24', // TEST-NET-1, for documentation and examples
    '192.88.99.0/24', // IPv6 to IPv4 relay
    '192.168.0.0/16', // RFC1918 private network
    '198.18.0.0/15', // Benchmark testing
    '198.51.100.0/24', // TEST-NET-2
    '203.0.113.0/24', // TEST-NET-3
    '224.0.0.0/4', // Multicast
    '240.0.0.0/4', // Reserved for future use
  ];

  return reservedRanges
    .map((rng) => {
      return contains(rng, ip);
    })
    .reduce((prev, curr) => {
      return prev || curr;
    });
}
