import { BaseBuilding } from "./building.Types";
import { BaseUnitDetails } from "./unit.Types";
import { BaseUserDetails } from "./user.Types";

export interface CreateTenancyDetails extends BaseTenancyDetails {
    // Replace with Base contract type
    contract?: unknown
}

export interface BaseTenancyDetails {
    tenantId: string
    buildingId: string
    unitId: string
}