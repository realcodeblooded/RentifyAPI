import { } from "bcryptjs"
import { UserService } from "../user.Service";
import { phoneService } from "../phoneFormartter.service";
import { authService } from "../auth.Service";
import { User } from "@/entities";

jest.mock("../phoneFormartter.service")
jest.mock("../auth.Service")
jest.mock("../../entities/users.Entity")

describe("UserService - addUser", () => {
    let userService: UserService
    beforeEach(() => {
        userService = new UserService();
        jest.clearAllMocks();
    })
    it("should return error for invalid phone number", async () => {
        (phoneService.formatPhoneNumber as jest.Mock).mockReturnValue(null);

        // userService = new UserService();
        const result = await userService.addUser(
            { phone: "invalid" } as any,
            "TENANT" as any
        );

        expect(result.success).toBe(false);
        expect(result.message).toBe("Invalid Phone!");
    });

    it("Should return an error for existing id", async () => {
        (phoneService.formatPhoneNumber as jest.Mock).mockReturnValue(true);
        (authService.userExistsByIdNumber as jest.Mock).mockReturnValue(null);
        const result = await userService.addUser(
            { idNumber: "existing id", phone: "valid phone" } as any, "TENANT" as any
        )
        expect(result.success).toBe(false);
        expect(result.message).toBe("A user with that Id number already exists.");
    })


    it("Should successfully add a user", () => {
        // userService = new UserService();

    })

}) 