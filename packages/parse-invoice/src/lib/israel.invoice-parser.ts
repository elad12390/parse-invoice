import {AbstractInvoiceParser} from "@parse-invoice/parse-invoice";
import moment = require("moment");
import * as PdfParse from "pdf-parse";



/*


עמוד 1 / 1
חברה לדוגמא
טקסט הסלוגן הקבוע של החברה
עוסק מורשה מס.: 511260945
רחוב ישראלי כלשהו 99, עיר העסק, 12345
031234568 :טל': 0541234567,031234567 פקס
 www.ezcount.co.il הופק על ידי
]מקור[
מסמך ממוחשב, חתום דיגיטלית
09/06/2014 :תאריך
לכבוד: ישראל ישראלי
000000000 :.פ/ת.ז.ח
כתובת: כתובת מלאה 15 ועיר מגורים
0501234567 :טלפון
חשבונית מס קבלה מספר 000001
חשבונית דוגמה ללקוחות המערכת
פריטים:
סכוםמחירכמותפירוטמק"ט
₪1,234.00₪1,234.001פריט כללי כלשהו
₪4,321.00₪4,321.001פריט ספציפי כלשהו כולל מקטMKT7
₪5,555.00
סה"כ פריטים:
₪-611.05הנחה:
₪4,943.95לאחר הנחה:
₪889.91מע"מ 18%:
₪5,833.86
סה"כ:
פרטי תשלום:
סכוםפרטיםאמצעי תשלוםתאריך
₪1,000.00מזומןמזומן09/06/2014
₪1,200.00המחאה: 87654321, בנק: 12 דיסקונט, סניף: 056 החרצית, חשבון: 12345678המחאה09/06/2014
₪1,300.00בנק: 10 לאומי, סניף: 465 הכלנית, חשבון: 87654321העברה בנקאית09/06/2014
₪666.66סוג: ויזה, 4 ספרות: 7654, סוג עסקה: תשלומים, תשלום: 1/3כרטיס אשראי09/06/2014
₪666.67סוג: ויזה, 4 ספרות: 7654, סוג עסקה: תשלומים, תשלום: 2/3כרטיס אשראי09/07/2014
₪666.67סוג: ויזה, 4 ספרות: 7654, סוג עסקה: תשלומים, תשלום: 3/3כרטיס אשראי09/08/2014
₪5,500.00התקבל בפועל:
₪333.86ניכוי מס:
₪5,833.86סה"כ:
לתשלום עד: 05/12/2014
הערה מצורפת:
כאן ניתן להכניס הערות למסמך, כאן ניתן להכניס הערות למסמך, כאן ניתן להכניס הערות למסמך, כאן ניתן להכניס הערות למסמך, כאן ניתן להכניס
הערות למסמך, כאן ניתן להכניס הערות למסמך, כאן ניתן להכניס הערות למסמך.
טקסט קבוע בתחתית מסמך
טקסט זה יופיע בכל מסמכי המערכת, מומלץ לשים פה הערות כלליות, פרסום אישי או תנאי תשלום כלליים.
טיוטא - לא לשימוש

 */

export class IsraelInvoiceParser extends AbstractInvoiceParser {

  getInvoiceDate(pdf: PdfParse.Result): Date | null {
    const invoiceDateRegex = /(\d{2}\/\d{2}\/\d{4}) :תאריך/;
    const invoiceDate = this.getMatch(invoiceDateRegex, pdf.text, 1);
    return moment(invoiceDate, 'DD/MM/YYYY').toDate();
  }

  getInvoiceNumber(pdf: PdfParse.Result): string {
    const invoiceNumberRegex = /מס קבלה מספר (\d+)/;
    return this.getMatch(invoiceNumberRegex, pdf.text, 1);
  }

  getTaxRegistrationNumber(pdf: PdfParse.Result): string {
    const taxRegistrationNumberRegex = /מספר עוסק: (\d+)|עוסק מורשה מס.: (\d+)/;
    return this.getMatch(taxRegistrationNumberRegex, pdf.text, 2);
  }

  getTotalAmount(pdf: PdfParse.Result): number {
    const totalAmountRegex = /(\d{1,3}(,\d{3})*\.\d{2})סה"כ:/;
    const match = this.getMatch(totalAmountRegex, pdf.text, 1);
    return parseFloat(match.replace(/,/g, ''));
  }

  getVatAmount(pdf: PdfParse.Result): number {
    const vatAmountRegex = /(\d{1,3}(,\d{3})*\.\d{2})(?=ניכוי מס)/;
    const match = this.getMatch(vatAmountRegex, pdf.text, 1);
    return parseFloat(match);
  }

  getVendorName(pdf: PdfParse.Result): string {
    if (pdf.info.Author) {
      return pdf.info.Author;
    }
    const vendorNameRegex = /(?<=לקוח: ).+/;
    return this.getMatch(vendorNameRegex, pdf.text, 1);
  }



}
