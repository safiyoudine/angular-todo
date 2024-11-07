export enum UserRole {
    ADMIN = 'ADMIN',
}
export interface SignupResponse {
    id: number;          // TypeScript uses number for all numeric values
    lastname: string;
    firstname: string;
    email: string;
    password: string;   // Be cautious with sensitive data like passwords

}
