import { Tenancies } from "@/entities";
import { Contract } from "@/entities/contracts.Entity";
import { BaseContractDetails, PaymentFrequency } from "@/types/contract.Types";
import { BaseResponse } from "@/types/response.types";
import { logger } from "@/utils/logger";
export class ContractService {
    async createContract(tenancyId: string): Promise<BaseResponse> {
        try {
            // Find the tenancy record
            let tenancy = await Tenancies.query("SELECT u.buildingId,u.id as tenancyId, u.tenantId, t.startDate, t.endDate, u.rent, p.propertyManager FROM tenancies t INNER JOIN units u ON t.unitId = u.id INNER JOIN property p on p.id = u.buildingId WHERE t.id = ?;", [tenancyId])
            if (!tenancy) {
                return { success: false, message: "Cannot find tenancy record", data: null }
            }

            tenancy = tenancy[0]

            const newContract: BaseContractDetails = {
                tenancyId: tenancyId,
                tenantId: tenancy.tenantId,
                rent: tenancy.rent,
                managerId: tenancy.propertyManager,
                currency: "KSH",
                frequency: tenancy.frequency ?? PaymentFrequency.MONTHLY,
                gracePeriod: tenancy.gracePeriod ?? 5,
                startDate: tenancy.startDate,
                endDate: tenancy.endDate
            }

            const createdContract = await Contract.save(newContract)
            console.log(createdContract);

            return { success: true, message: 'Contract created successfully', data: null };
        } catch (error) {
            logger.error(error);
            return { success: false, message: 'An unexpected error occurred while creating contract.', data: null };
        }
    }

    async endContract(tenancyid: string, endDate?: Date): Promise<BaseResponse> {
        try {
            // check if contract exists
            const contract = await Contract.findOne({ where: { tenancyId: tenancyid } })

            if (!contract)
                return { success: false, message: "Could not find contract with that id", data: null }

            await Contract
                .createQueryBuilder()
                .update(Contract)
                .set({ endDate: endDate || new Date() })
                .softDelete()
                .where("id = :id", { id: tenancyid })
                .execute()
            return { success: true, message: "Success", data: null }

        } catch (error) {
            logger.error(error);
            return { success: false, message: "An unexpected error occurred while ending a contract", data: null }
        }
    }

}

export const contractService = new ContractService();