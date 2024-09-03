import crypto from 'crypto';

// Use a secure, random key for encryption
const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 bytes key for AES-256
const IV_LENGTH = 16; // For AES, this is always 16

export const hash = (s: string) =>
	s.split('').reduce((a: number, b: string) => {
		a = (a << 5) - a + b.charCodeAt(0)
		return a & a
	}, 0)

// Encrypt function
export function encrypt(text: string) {
	const iv = crypto.randomBytes(IV_LENGTH);
	const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt function
export function decrypt(text: string) {
	const textParts = text.split(':');
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	const iv = Buffer.from(textParts.shift(), 'hex');
	const encryptedText = Buffer.from(textParts.join(':'), 'hex');
	const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
	let decrypted = decipher.update(encryptedText);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}

export const fakePromise = (delayInMs = 3000) => new Promise<void>((resolve, reject) => {
	setTimeout(() => {
		resolve()
	}, delayInMs)
})

