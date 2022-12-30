import {Invoice} from "./models/invoice.model";
import {promises as fs} from 'fs';
import {URL} from "node:url";
import * as PdfParse from "pdf-parse";

export abstract class AbstractInvoiceParser {
  async parsePDF(pdf: string | Buffer | URL): Promise<Invoice> {
    if (typeof pdf === 'string' || pdf instanceof URL) {
      pdf = await fs.readFile(pdf);
    }
   const parsedPDF = await PdfParse(pdf);
    return this.parseInvoice(parsedPDF);
  }

  parseInvoice(invoice: PdfParse.Result): Invoice {
    return {
      date: this.getInvoiceDate(invoice),
      number: this.getInvoiceNumber(invoice),
      taxRegistrationNumber: this.getTaxRegistrationNumber(invoice),
      totalAmount: this.getTotalAmount(invoice),
      vatAmount: this.getVatAmount(invoice),
      vendorName: this.getVendorName(invoice)
    }
  }

  getMatch(regex: RegExp, text: string, n: number): string {
    const match = text.match(regex);
    return match ? match[n] : '';
  }

  abstract getInvoiceNumber(pdf: PdfParse.Result): string;
  abstract getInvoiceDate(pdf: PdfParse.Result): Date | null;
  abstract getVendorName(pdf: PdfParse.Result): string;
  abstract getTaxRegistrationNumber(pdf: PdfParse.Result): string;
  abstract getTotalAmount(pdf: PdfParse.Result): number;
  abstract getVatAmount(pdf: PdfParse.Result): number;


}
