import { ip2long } from './ip2long';
import { _contains } from './contains';
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

  // The isValid check passing means we know it will convert.
  const _ip = ip2long(ip) as number;

  // Pre-computed these static values to save the cycles.
  const reservedRanges: { cidrHost: number; cidrMask: number }[] = [
    { cidrHost: 0, cidrMask: 8 }, // '0.0.0.0/8', // local, "this" network
    { cidrHost: 167772160, cidrMask: 8 }, // '10.0.0.0/8', // RFC1918 private range
    { cidrHost: 1681915904, cidrMask: 10 }, // '100.64.0.0/10', // carrier-grade NAT TODO: tests
    { cidrHost: 2130706432, cidrMask: 8 }, // '127.0.0.0/8', // loopback
    { cidrHost: 2851995648, cidrMask: 16 }, // '169.254.0.0/16', // link-local address, for DHCP failures
    { cidrHost: 2886729728, cidrMask: 12 }, // '172.16.0.0/12', // RFC1918 private network
    { cidrHost: 3221225472, cidrMask: 24 }, // '192.0.0.0/24', // IETF protocol assignments TODO: tests
    { cidrHost: 3221225984, cidrMask: 24 }, // '192.0.2.0/24', // TEST-NET-1, for documentation and examples TODO: tests
    { cidrHost: 3227017984, cidrMask: 24 }, // '192.88.99.0/24', // IPv6 to IPv4 relay TODO: tests
    { cidrHost: 3232235520, cidrMask: 16 }, // '192.168.0.0/16', // RFC1918 private network
    { cidrHost: 3323068416, cidrMask: 15 }, // '198.18.0.0/15', // Benchmark testing TODO: tests
    { cidrHost: 3325256704, cidrMask: 24 }, // '198.51.100.0/24', // TEST-NET-2 TODO: tests
    { cidrHost: 3405803776, cidrMask: 24 }, // '203.0.113.0/24', // TEST-NET-3 TODO: tests
    { cidrHost: 3758096384, cidrMask: 4 }, // '224.0.0.0/4', // Multicast TODO: tests
    { cidrHost: 4026531840, cidrMask: 4 }, // '240.0.0.0/4', // Reserved for future use TODO: tests
    { cidrHost: 4294967295, cidrMask: 32 }, // '255.255.255.255/32', // Reserved for broadcast TODO: tests
  ];

  return reservedRanges
    .map((rng) => {
      return _contains(rng.cidrHost, rng.cidrMask, _ip);
    })
    .reduce((prev, curr) => {
      return prev || curr;
    });
}
