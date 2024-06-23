export interface Product {
    id: number;
    name: string;
    category: string | null;
    brand: string | null;
    price: {
        oldPrice: number | null;
        activePrice: number;
    };
    discount: number;
    description: string | null;
    sizes: string[] | null;
    colors: string[]| null;
    gender: string | null;
    inStock: boolean;
    images: string[];
    reviews: Review[] | null;
    status: string | null;
    averageRating: number | null;
}
export interface NamedEntity{
    id: number;
    name: string;
}
export interface NamedEntityAPI{
    data: NamedEntity[];
    perPage: number;
    totalCount: number;
    currentPage: number;
    pages: number;
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
    name: string;
    image: string;
    price: number;
}
export interface ProductAPI{
    data: Product[];
    perPage: number;
    totalCount: number;
    currentPage: number;
    pages: number;
}
export interface ValidatonError{
    property: string;
    error: string;
}
export interface AuthResponse{
    token: string;
}