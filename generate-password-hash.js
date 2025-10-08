// Generate SHA-256 hash for downloads page password
// Usage: node generate-password-hash.js your-password-here

import crypto from 'crypto';

const password = process.argv[2];

if (!password) {
  console.error('Usage: node generate-password-hash.js your-password-here');
  process.exit(1);
}

const hash = crypto.createHash('sha256').update(password).digest('hex');

console.log('\n✓ Password hash generated!\n');
console.log('Add this to your .env file:\n');
console.log(`DOWNLOADS_PASSWORD_HASH=${hash}`);
console.log('\n');
