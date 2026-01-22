export enum BuildingType {
    STANDALONE = 'STANDALONE',
    APARTMENT = 'APARTMENT',
    TOWNHOUSE = 'TOWNHOUSE',
    COMMERCIAL = 'COMMERCIAL',
    MIXED_USE = 'MIXED_USE'
}

export enum UnitType {
    // Standalone types
    WHOLE_BUILDING = 'WHOLE_BUILDING',
    GUEST_HOUSE = 'GUEST_HOUSE',
    BASEMENT_SUITE = 'BASEMENT_SUITE',
    
    // Apartment/Storeyed types
    STUDIO = 'STUDIO',
    ONE_BEDROOM = 'ONE_BEDROOM',
    TWO_BEDROOM = 'TWO_BEDROOM',
    THREE_BEDROOM = 'THREE_BEDROOM',
    PENTHOUSE = 'PENTHOUSE',
    LOFT = 'LOFT',
    DUPLEX = 'DUPLEX',
    
    // Commercial
    OFFICE = 'OFFICE',
    RETAIL = 'RETAIL',
    WAREHOUSE = 'WAREHOUSE'
}