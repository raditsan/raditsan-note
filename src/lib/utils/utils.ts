import crypto from 'crypto';

// Use a secure, random key for encryption
const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 bytes key for AES-256
const Buffer_STATIC_ENCRYPTION_KEY = Buffer.from('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 'hex');;
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

export function simpleEncrypt(fromText: string | number | undefined) {
	if (!fromText) {
		throw Error("Invalid input value")
	}
	const text = `${fromText}`
	const iv = Buffer.alloc(16, 0); // Fixed IV (all zeros)
	const cipher = crypto.createCipheriv('aes-256-cbc', Buffer_STATIC_ENCRYPTION_KEY, iv);
	let encrypted = cipher.update(text, 'utf-8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted; // Return only the encrypted text
}

// Function to decrypt text using a fixed IV
export function simpleDecrypt(fromText: string | number | undefined) {
	if (!fromText) {
		throw Error("Invalid input value")
	}
	const text = `${fromText}`
	const iv = Buffer.alloc(16, 0); // Fixed IV (must match the one used for encryption)
	const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer_STATIC_ENCRYPTION_KEY, iv);
	let decrypted = decipher.update(text, 'hex', 'utf-8');
	decrypted += decipher.final('utf-8');
	return decrypted;
}

export const fakePromise = (delayInMs = 3000) => new Promise<void>((resolve, reject) => {
	setTimeout(() => {
		resolve()
	}, delayInMs)
})


const ENCRYPTION_KEY2 = Buffer.from('0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef', 'hex'); // 64 hex characters = 32 bytes
const ivArray = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]); // 16 bytes
// const ivString = 'abcdefghijklmnop'; // 16 characters string for IV
// const ivFromString = Buffer.from(ivString, 'utf-8'); // Convert string to Buffer
const iv = Buffer.from(ivArray); // Convert Uint8Array to Buffer

// Function to encrypt text using a fixed key and custom IV
export function encrypt2(fromText: string | number) {
	const text = `${fromText}`
	const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY2, iv);
	let encrypted = cipher.update(text, 'utf-8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
}

// Function to decrypt text using a fixed key and custom IV
export function decrypt2(fromText: string | number) {
	const text = `${fromText}`
	const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY2, iv);
	let decrypted = decipher.update(text, 'hex', 'utf-8');
	decrypted += decipher.final('utf-8');
	return decrypted;
}