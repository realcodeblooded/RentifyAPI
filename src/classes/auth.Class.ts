import { Role } from "../entities/role.Entity";
import { RoleKey } from "../types/role.Types";
import { logger } from "../utils/logger";
import bcrypt from "bcryptjs";

class AuthClass {
    async getRoleId(roleKey: RoleKey): Promise<string | null> {
        try {
            const role = await Role.findOne({ where: { key: roleKey } });

            if (!role) return null;

            return role.id;
        } catch (error) {
            logger.error(error)
            return null;
        }
    }

    async hashPassword(password: string, rounds?: number):Promise<string> {
        try {
            return await bcrypt.hash(password, rounds || 10);
        } catch (error) {
            logger.error(error);
            throw Error(`An error occurred while hashing you password: ${error}`);
        }
    }
}

export const authClass = new AuthClass();