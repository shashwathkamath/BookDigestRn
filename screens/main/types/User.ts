export type User = {
    photo?: string; // URL for the user's photo
    givenName: string; // User's given name
    familyName: string; // User's family name
    name: string; // Full name of the user
    email: string; // User's email address (can be empty)
    id: string; // User's unique identifier
};