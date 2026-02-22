import { logger } from "../utils/logger";
import { User } from "../entities/users.Entity";
import { CreateUserRequest, UserResponse } from "../types/user.Types";
import { BaseResponse } from "../types/response.types";
import { authClass } from "./auth.Class";
import { RoleKey } from "../types/role.Types";
import { phoneService } from "@/services/phoneFormartter.service";
import { maskCard, maskPhone, maskStringV2 } from "maskdata";

class UserClass {
    public async addUser(userData: CreateUserRequest, role: RoleKey): Promise<BaseResponse> {
        try {
            // Validate and format the phone number
            const validPhone = phoneService.formatPhoneNumber(userData.phone);

            if (!validPhone) return { success: false, message: 'Invalid Phone!', data: null };

            userData.phone = validPhone;

            // Check if the Id Number already exists
            const idExists = await authClass.userExistsByIdNumber(userData.idNumber);

            if (idExists) {
                return { success: false, message: 'A user with that Id number already exists.', data: null };
            }

            // Check if the email already exists
            const emailExists = await authClass.userExistsByEmail(userData.email);

            if (emailExists) {
                return { success: false, message: 'A user with that email already exists.', data: null };
            }

            // Hash the user password
            let hashedPassword = await authClass.hashPassword(userData.password);

            // Get the role Id
            const roleId = await authClass.getRoleId(role);
            if (!roleId) return { success: false, message: "Invalid role.", data: null };

            let newUser = User.create({
                ...userData,
                password: hashedPassword,
                roleId: roleId
            });

            await newUser.save();

            return { success: true, data: [], message: `${newUser.getFullName()} added successfully.` }

        } catch (error) {
            logger.error("Error adding user:", error);
            return { success: false, message: "Error adding user", data: error };
        }
    };

    // Returns all active users
    public async fetchUsers(): Promise<BaseResponse> {
        try {
            const users = await User.find();

            if (!users || users.length === 0) {
                // Return an error users not found
                return { success: false, message: 'No users found.', data: null };
            }

            const maskOptions = {
                maskWith: "*",
                unmaskedStartDigits: 9,
                unmaskedEndDigits: 1
            };

            const maskIdOptions = {
                maskWith: "*",
                unmaskedStartDigits: 3,
                unmaskedEndDigits: 1
            }



            // Set response
            const response: UserResponse[] = users.map((user) => {
                // Mask sensitive data
                const maskedPhoneNumber = maskPhone(user.phone, maskOptions);
                const maskedIdNumber = maskCard(user.idNumber.toString(), maskIdOptions);

                // Format response object
                let formattedUser: UserResponse = {
                    id: user.id,
                    idNumber: maskedIdNumber,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: maskedPhoneNumber
                }

                return formattedUser;
            })
            return { success: true, message: 'Success!', data: response };

        } catch (error) {
            logger.error(error);
            return { success: false, message: "An error occured while fetching users", data: error };
        }
    }
}

export const userClass = new UserClass();