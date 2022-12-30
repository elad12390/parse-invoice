import * as path from "path";
import {IsraelInvoiceParser} from "../../src/lib/israel.invoice-parser";


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
כתובת: כתובת מלאה 15 ועיר מגוריםר
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

describe('parseInvoice base test', () => {
  let invoiceParser: IsraelInvoiceParser;

  beforeEach(() => {
    jest.resetModules();
    invoiceParser = new IsraelInvoiceParser();
  });


  describe('example invoice', () => {

    it('should be able to read a pdf', async () => {
      const invoice = await invoiceParser.parsePDF(path.join(__dirname, '../mocks', 'invoiceExample.pdf'));
      expect(invoice).toBeDefined();
    });

    it('should be able to parse the values from the pdf', async () => {
      const invoice = await invoiceParser.parsePDF(path.join(__dirname, '../mocks', 'invoiceExample.pdf'));
      expect(invoice).toEqual({
        number: '000001',
        date: new Date('06/09/2014'),
        vendorName: 'חברה לדוגמא',
        taxRegistrationNumber: '511260945',
        totalAmount: 5833.86,
        vatAmount: 333.86,
      })
    });

  });
});