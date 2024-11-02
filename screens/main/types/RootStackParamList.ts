export type RootStackParamList = {
    Main: undefined; // Main screen has no parameters
    Account: undefined; // Account screen has no parameters
    BookDescription: { book: any }; // BookDescription expects a book object
};