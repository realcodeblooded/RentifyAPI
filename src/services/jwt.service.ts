import jwt from "jsonwebtoken";

export class JwtService {
    private secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || "default_secret";
    }

    generateToken(payload: object, expiresIn: string | number = "1h"): string {
        return jwt.sign(payload, this.secret, { expiresIn: expiresIn as any });
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            return null;
        }
    }
}

export const jwtService = new JwtService();
