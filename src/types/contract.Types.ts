export enum PaymentFrequency {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
    QUARTERLY = 'QUARTERLY'
}

export interface BaseContractDetails {
    tenantId: string;
    rent: number;
    currency: string;
    tenancyId: string;
    managerId: string;
    frequency?: PaymentFrequency;
    gracePeriod?: number;
    startDate?: Date;
    endDate?: Date;
}