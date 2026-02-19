import { BaseResponse } from "../types/response.types";
import { Roles } from "../entities/roles.Entity";
import { BaseRole, RoleKey } from "../types/role.Types";
import { logger } from "../utils/logger";
import bcrypt from "bcryptjs";

/**
 * Main Authentication class
 */
class AuthClass {
    /**
     * Gets the id of the role
     * @param roleKey
     * @type RoleKey
     * @returns Promise<string | null>
     */
    async getRoleId(roleKey: RoleKey): Promise<string | null> {
        try {
            const role = await Roles.findOne({ where: { key: roleKey } });

            if (!role) return null;

            return role.id;
        } catch (error) {
            logger.error(error)
            return null;
        }
    }

    /**
     * Returns the hash value of a given string
     * @param password 
     * @param rounds 
     * @returns Promise<string | null>
     */
    async hashPassword(password: string, rounds?: number): Promise<string> {
        try {
            return await bcrypt.hash(password, rounds || 10);
        } catch (error) {
            logger.error(error);
            throw Error(`An error occurred while hashing you password: ${error}`);
        }
    }
    /**
     * Add a defined role into  the DB
     * @param role @type BaseRole
     * @returns 
     */
    async addRole(role: BaseRole): Promise<BaseResponse> {
        try {
            const newRole = Roles.create(role);

            // Save the role.
            const isRoleCreated = await newRole.save();

            return { success: false, message: 'Role created successfully!', data: isRoleCreated };
        } catch (error) {
            return { success: false, message: 'An unexpected error occurred while adding a new role!', data: error };
        }
    }
}

export const authClass = new AuthClass();