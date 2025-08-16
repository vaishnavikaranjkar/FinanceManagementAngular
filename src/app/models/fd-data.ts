export interface FdData{
    depositDate: string; // Format: DD/MM/YYYY
    maturityDate: string; // Format: DD/MM/YYYY
    roi: string;
    duration: string;
    principalAmount: string;
    maturityAmount: string;
    interestAmount?: number; 
}