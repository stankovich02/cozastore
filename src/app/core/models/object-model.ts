export class Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: any;
    discount: number | null;
    description: string;
    sizes: string[];
    colors: string[];
    gender: string;
    inStock: boolean;
    images: string[];
    reviews: any[];
    averageRating: number;
}
export class NamedEntity{
    id: number;
    name: string;
}
