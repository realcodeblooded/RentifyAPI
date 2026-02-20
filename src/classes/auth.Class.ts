import { BaseResponse } from "../types/response.types";
import { Roles } from "../entities/roles.Entity";
import { BaseRole, RoleKey } from "../types/role.Types";
import { logger } from "../utils/logger";
import bcrypt from "bcryptjs";
import { jwtService } from "@/services/jwt.service";
import { AuthResponse } from "@/types/auth.Types";
import { User } from "@/entities/users.Entity";


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

    public async userExistsByIdNumber(idNumber: number): Promise<boolean> {
        try {
            // Verify Id number is not empty.
            if (!idNumber) {
                return false;
            }

            // Find one user with the id number
            const user = await User.findOneBy({ idNumber: idNumber });

            // Return the user details (currently returns false) when found and null when not found
            if (!user) {
                return false;
            }
            return true;
        } catch (error) {
            logger.error(error);
            return false;
        }
    }

    public async userExistsByEmail(email: string): Promise<boolean> {
        try {
            // Verify email number is not empty.
            if (!email || email === "") {
                return false;
            }

            // Find one user with the email
            const user = await User.findOneBy({ email: email });

            // Return the user details (curently returns false) when found and null when not found
            if (!user) {
                return false;
            }
            return true;
        } catch (error) {
            logger.error(error);
            return false;
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
            // check if role key exists
            const roleExists = await this.getRoleId(role.key);

            // Return error for existing role key
            if (roleExists) return { success: false, message: "A role with that key already exists", data: null };

            const newRole = Roles.create(role);

            // Save the role.
            const isRoleCreated = await newRole.save();

            return { success: false, message: 'Role created successfully!', data: isRoleCreated };
        } catch (error) {
            return { success: false, message: 'An unexpected error occurred while adding a new role!', data: error };
        }
    }
    async login(email: string, password: string): Promise<BaseResponse> {
        try {
            const user = await User
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.role', 'role')
                .where('user.email = :email', { email })
                .getOne();

            if (!user) return { success: false, message: "Email not found", data: null };

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) return { success: false, message: "Invalid password", data: null };

            const accessToken = jwtService.generateToken({ id: user.id, email: user.email, role: user.role.name }, '1h');
            const refreshToken = jwtService.generateToken({ id: user.id, role: user.role.name }, '7d');

            user.refreshToken = refreshToken;
            await user.save();
            const response: AuthResponse = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role.name,
                accessToken: accessToken,
                refreshToken: refreshToken
            };
            return { success: true, message: "Login successful", data: response };
        } catch (error) {
            logger.error(error);
            return { success: false, message: "An error occurred while logging in", data: error };
        }
    }

    async refresh(refreshToken: string): Promise<BaseResponse> {
        try {
            const payload = jwtService.verifyToken(refreshToken);
            if (!payload || !payload.id) return { success: false, message: "Invalid token", data: null };

            const user = await User
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.role', 'role')
                .where('user.id = :id', { id: payload.id })
                .getOne();

            if (!user || user.refreshToken !== refreshToken) return { success: false, message: "Invalid refresh token", data: null };

            const accessToken = jwtService.generateToken({ id: user.id, email: user.email, role: user.role.name }, '1h');

            return { success: true, message: "Token refreshed successfully", data: { accessToken } };
        } catch (error) {
            logger.error(error);
            return { success: false, message: "Token refresh failed", data: error };
        }
    }

    async logout(userId: string): Promise<BaseResponse> {
        try {
            const user = await User.findOne({ where: { id: userId } });

            if (!user) return { success: false, message: "User not found", data: null };

            user.refreshToken = '';
            await user.save();

            return { success: true, message: "Logout successful", data: null };
        } catch (error) {
            logger.error(error);
            return { success: false, message: "An error occurred while logging out", data: error };
        }
    }
}

export const authClass = new AuthClass();