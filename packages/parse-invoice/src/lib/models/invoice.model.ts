
export interface Invoice {
  number: string;
  date: Date | null;
  vendorName: string;
  taxRegistrationNumber: string;
  totalAmount: number;
  vatAmount: number;
}
