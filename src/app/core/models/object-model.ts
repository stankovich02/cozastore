export interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: {
        oldPrice: number | null;
        activePrice: number;
    };
    discount: number;
    description: string;
    sizes: string[];
    colors: string[];
    gender: string;
    inStock: boolean;
    images: string[];
    reviews: Review[];
    status: string;
    averageRating: number;
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
export interface PagedResponse<T>{
    data: T[];
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