import { BaseBuilding } from "./building.Types";
import { PaymentFrequency } from "./contract.Types";
import { BaseUnitDetails } from "./unit.Types";
import { BaseUserDetails } from "./user.Types";

export interface CreateTenancyDetails extends BaseTenancyDetails {
    // Replace with Base contract type
    contract?: unknown
}

export interface BaseTenancyDetails {
    tenantId: string;
    buildingId: string;
    unitId: string;
    rent?: number;
    currency?: string;
    frequency?: PaymentFrequency;
    gracePeriod?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface FetchTenanciesResponse extends BaseTenancyDetails {
    id: string;
    firstName: string;
    lastName: string;
    unitKey: string;
}

export interface IsVacantResponse {
    unitId: string,
    rent: number,
}