export interface AuthResponseDTO {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
}