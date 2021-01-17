// ****************
// Account Interface
// ****************
export interface AccountInterface {
    id: number;
    email: string;
    password: string;
    chars: CharInterface[];
}

// ****************
// Chars Interface
// ****************
export interface CharInterface {
    id: number;
    nickname: string;
    silver: number;
    premium: boolean;
    first_premium: boolean;
    account: AccountInterface
}

// ****************
// Island Interface
// ****************
export interface IslandInterface {
    id: number;
    level: number;
    active: boolean;
    daily_earnings: DailyEarningInterface[];
    daily_costs: DailyCostInterface[];
    constructions: ConstructionInterface[];
    type: IslandTypeInterface;
    location: LocationInterface;
    char: CharInterface;
}

// ****************
// Island Type Interface
// ****************
export interface IslandTypeInterface {
    id: number;
    name: number;
}

// ****************
// Island Location Interface
// ****************
export interface LocationInterface {
    id: number;
    name: number;
}

// ****************
// Construction Interface
// ****************
export interface ConstructionInterface {
    id: number;
    name: string;
    tier: number;
    products: ProductInterface[]
    daily_earnings: DailyEarningInterface[];
    type: BuildingTypeInterface;
    island: IslandInterface;
}

// ****************
// Building Type Interface
// ****************
export interface BuildingTypeInterface {
    id: number;
    name: string;
}

// ****************
// Daily Earning Interface
// ****************
export interface DailyEarningInterface {
    id: number;
    created_at: Date;
    value: number;
    construction: ConstructionInterface;
    island: IslandInterface;
}

// ****************
// Daily Cost Interface
// ****************
export interface DailyCostInterface {
    id: number;
    created_at: Date;
    value: number;
    construction: ConstructionInterface;
    island: IslandInterface;
    products: ProductInterface[];
}

// ****************
// Product Interface
// ****************
export interface ProductInterface {
    id: number;
    name: string;
    est_value: number;
    tier: number;
    construction: ConstructionInterface;
    daily_costs: DailyCostInterface[]
}