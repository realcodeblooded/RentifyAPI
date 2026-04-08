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
    frequency?: PaymentFrequency;
    gracePeriod?: number;
    startDate?: Date;
    endDate?: Date;
}