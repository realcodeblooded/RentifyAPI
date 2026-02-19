import { UnitType } from "./building.Types";

export type BaseUnitDetails = {
    unitKey: string;
    floor: number;
    buildingId: string;
    type: UnitType;
    description: string
    rent: number;
}