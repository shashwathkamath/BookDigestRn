export interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    imageUrl: string;
    sellerName: string;
    sellerReviews: number;
    marketPrice: number;
    sellingPrice: number;
    pages: number;
    language: string;
    publisher: string;
}