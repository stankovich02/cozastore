export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: any;
    description: string;
    sizes: string[];
    colors: string[];
    gender: string;
    inStock: boolean;
    images: string[];
    reviews: object[];
    averageRating: number;
}
