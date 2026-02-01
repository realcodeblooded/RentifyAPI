import { logger } from "../utils/logger";
import { User } from "../entities/user.Entity";
import { BaseUserDetails } from "../types/user.Types";
import { BaseResponse } from "../types/response.types";
import { authClass } from "./auth.Class";

class UserClass {
    async addUser(userData: BaseUserDetails): Promise<BaseResponse> {
        try {
            // Hash the user password
            let hashedPassword = await authClass.hashPassword(userData.password);

            // Get the role Id
            const roleId = await authClass.getRoleId(userData.roleKey);
            if (!roleId) return { success: false, message: "Invalid role", data: null };

            let newUser = User.create({
                ...userData,
                password: hashedPassword,
                roleId: roleId
            });

            await newUser.save();

            return { success: true, data: [], message: `${newUser.getFullName()} added successfully!` }

        } catch (error) {
            logger.error("Error adding user:", error);
            return { success: false, message: "Error adding user", data: error };
        }
    }
}

export const userClass = new UserClass();