export interface EmiData {
    CustomerName: string;
    LoanDate: string; // Format: DD/MM/YYYY
    LoanNillDate: string; // Optional, Format: DD/MM/YYYY
    Tenure: number; // in months
    LoanType: string;
    AmountFinanced: number; // in currency format
    APR: number; // Annual Percentage Rate
    TotalLoanAmount?: number; // Optional, in currency format
}
