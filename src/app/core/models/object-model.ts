export class Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: {
        oldPrice: number | null;
        activePrice: number;
    };
    discount: number | null;
    description: string;
    sizes: string[];
    colors: string[];
    gender: string;
    inStock: boolean;
    images: string[];
    reviews: Review[];
    averageRating: number;
}
export class NamedEntity{
    id: number;
    name: string;
}
export class Review{
    id: number;
    rating: number;
    comment: string;
    user: string;
    avatar: string;
}