import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.JWT_SECRET || 'fallback_secret_key_change_in_production';
const encodedKey = new TextEncoder().encode(secretKey);

export async function signToken(payload: { username: string; role: string }) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function verifyToken(token: string | undefined): Promise<{ username: string; role: string } | null> {
    if (!token) return null;
    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload as { username: string; role: string };
    } catch {
        return null;
    }
}
