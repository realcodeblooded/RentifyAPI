import { logger } from "../utils/logger";
import { User } from "../entities/users.Entity";
import { CreateUserRequest, UserResponse } from "../types/user.Types";
import { BaseResponse } from "../types/response.types";
import { authService } from "./auth.Service";
import { RoleKey } from "../types/role.Types";
import { phoneService } from "@/services/phoneFormartter.service";
import { maskCard, maskPhone, maskStringV2 } from "maskdata";

class UserService {
  public async addUser(
    userData: CreateUserRequest,
    role: RoleKey,
  ): Promise<BaseResponse> {
    try {
      // Validate and format the phone number
      const validPhone = phoneService.formatPhoneNumber(userData.phone);

      if (!validPhone)
        return { success: false, message: "Invalid Phone!", data: null };

      userData.phone = validPhone;

      // Check if the Id Number already exists
      const idExists = await authService.userExistsByIdNumber(userData.idNumber);

      if (idExists) {
        return {
          success: false,
          message: "A user with that Id number already exists.",
          data: null,
        };
      }

      // Check if the email already exists
      const emailExists = await authService.userExistsByEmail(userData.email);

      if (emailExists) {
        return {
          success: false,
          message: "A user with that email already exists.",
          data: null,
        };
      }

      // Hash the user password
      let hashedPassword = await authService.hashPassword(userData.password);

      // Get the role Id
      const roleId = await authService.getRoleId(role);
      if (!roleId)
        return { success: false, message: "Invalid role.", data: null };

      let newUser = User.create({
        ...userData,
        password: hashedPassword,
        roleId: roleId,
      });

      await newUser.save();

      return {
        success: true,
        data: [],
        message: `${newUser.getFullName()} added successfully.`,
      };
    } catch (error) {
      logger.error("Error adding user:", error);
      return { success: false, message: "Error adding user", data: error };
    }
  }

  // Returns all active users
  public async fetchUsers(): Promise<BaseResponse> {
    try {
      const users = await User.createQueryBuilder("u")
        .innerJoin("u.role", "r")
        .select([
          "u.id",
          "u.idNumber",
          "u.firstName",
          "u.lastName",
          "u.email",
          "u.phone",
          "r.key",
        ])
        .getMany();

      if (!users || users.length === 0) {
        // Return an error users not found
        return { success: false, message: "No users found.", data: null };
      }

      // Set response
      const response: UserResponse[] = users.map((user) => {
        // Format response object
        let formattedUser: UserResponse = {
          id: user.id,
          idNumber: this.maskIdNumber(user.idNumber.toString()),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: this.maskPhone(user.phone),
          role: user.role.key,
        };

        return formattedUser;
      });
      return { success: true, message: "Success!", data: response };
    } catch (error) {
      logger.error(error);
      return {
        success: false,
        message: "An error occured while fetching users",
        data: error,
      };
    }
  }

  public async fetchUserDetails(id: string): Promise<BaseResponse> {
    try {
      const user = await User.findOneBy({ id: id });

      if (!user) {
        return { success: false, message: "User not found!", data: user };
      }

      let formattedUser: UserResponse = {
        id: user.id,
        idNumber: this.maskIdNumber(user.idNumber.toString()),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: this.maskPhone(user.phone),
        role: user.role.key,
      };

      return { success: true, message: "Success", data: formattedUser };
    } catch (error) {
      return {
        success: false,
        message: "An error occurred while fetching user details",
        data: null,
      };
    }
  }

  public maskPhone(phone: string): string {
    try {
      const maskOptions = {
        maskWith: "*",
        unmaskedStartDigits: 9,
        unmaskedEndDigits: 1,
      };

      return maskPhone(phone, maskOptions);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  public maskIdNumber(idNumber: string): string {
    try {
      const maskOptions = {
        maskWith: "*",
        unmaskedStartDigits: 3,
        unmaskedEndDigits: 1,
      };

      return maskCard(idNumber, maskOptions);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export const userService = new UserService();
