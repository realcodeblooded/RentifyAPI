import { Contracts } from "@/entities/contracts.Entity";
import { BaseContractDetails } from "@/types/contract.Types";
import { BaseResponse } from "@/types/response.types";
import { logger } from "@/utils/logger";
export class ContractService {
    async createContract(contractDetails: BaseContractDetails): Promise<BaseResponse> {
        try {
            const newContract = Contracts.create(contractDetails);

            await newContract.save();

            return { success: true, message: 'Contract created successfully', data: null };
        } catch (error) {
            logger.error(error);
            return { success: false, message: 'An unexpected error occurred while creating contract.', data: null };
        }
    }

}

export const contractService = new ContractService();