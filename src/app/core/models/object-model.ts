export interface Product {
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
export interface NamedEntity{
    id: number;
    name: string;
}
export interface Review{
    id: number;
    rating: number;
    comment: string;
    user: string;
    avatar: string;
}
export interface CartProduct{
    id: number;
    quantity: number;
}