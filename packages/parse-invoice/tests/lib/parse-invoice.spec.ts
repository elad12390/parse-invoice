import {AbstractInvoiceParser} from "@parse-invoice/parse-invoice";
import * as path from "path";
import * as PdfParse from "pdf-parse";
class TestInvoiceParser extends AbstractInvoiceParser {
  getInvoiceDate(pdf: PdfParse.Result): Date {
    return new Date();
  }

  getInvoiceNumber(pdf: PdfParse.Result): string {
    return "";
  }

  getTaxRegistrationNumber(pdf: PdfParse.Result): string {
    return "";
  }

  getTotalAmount(pdf: PdfParse.Result): number {
    return 0;
  }

  getVatAmount(pdf: PdfParse.Result): number {
    return 0;
  }

  getVendorName(pdf: PdfParse.Result): string {
    return "";
  }
}

describe('parseInvoice base test', () => {
  let invoiceParser: AbstractInvoiceParser;

  beforeEach(() => {
    jest.resetModules();
    invoiceParser = new TestInvoiceParser();
  });

  it('should be able to read a pdf', async () => {
    const invoice = await invoiceParser.parsePDF(path.join(__dirname, '../mocks', 'invoiceExample.pdf'));
    expect(invoice).toBeDefined();
  });

  it('should call parseInvoice correctly', async () => {
    await invoiceParser.parsePDF(path.join(__dirname, '../mocks', 'invoiceExample.pdf'));
    expect(invoiceParser.parseInvoice).toHaveBeenCalledWith(expect.any(String));
    expect(invoiceParser.parseInvoice).toHaveBeenCalledTimes(1);
  });
});
