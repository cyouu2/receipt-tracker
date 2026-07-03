import { extractTotal, extractStoreName } from './src/utils/parseReceipt.js';

// Paste in the raw OCR text you already collected from your 5 test receipts
const sample1 = `
DATE 28/05/2018 MON TIME 20:15
TABLE #12
SQUID § RH25.00
NOODLES § RMB. 00
SUBTOTAL RH78.30
TI RM78.30
GST 6% RM4.70
CHECKS PAID RHE. 00
TOTAL RHB3.00
CASH RH100.00
CHANGE RM17.00
`;

const sample2 = `
Sub-total 55.30
Service Charge 5.583
GST at 6% 3.65
Total 64.50
GST Taxable Amt 60.83
`;

const sample3 = `
BR 7 © US UTEEEEL aaa - EJ
i
RESTORAN WAN SHENG
| 002043319-W
No.2, Jalan Temenggung 19/9,
Seksyen 9, Bandar Mahkota Cheras,
43200 Cheras, Selangor
~~ GST REG NO: 001335787520
rax Invoice
INV No.: 1136284 Cashier: Nicole
Date: 11-05-2018 17:12:34
Description Qty U.price Total TAX
Bunga Kekwa
1% 1.70 1.70 SR
Take Away
1% 0,20 0.20 SR
Total QTY: 2
Total (Excluding GST): 1.79
GST payable (6%): 0.1
Total (Inclusive of GST): 1.90
TOTAL : 1.90
CASH 1.90
GST Summary Amount (RM) ~~ Tax(RM)
SR (@ 6%) 118 0.1
`;

const sample4 = `
SANYU STATIONERY SHOP
NO. 31G&33G, JALAN SETIA INDAH X ,U13/X
40170 SETIA ALAM
Mobile /Whatsapps : +6012-918 7937
Tel: +603-3362 4137
GST R 760640
SERGI EDR TAX INVOICE
ned By :
SANYU SUPPLY SDN BHD (1135772-K)
CASH SALES COUNTER
THOSE TT WHITE MEG PAD 3 BE ST
3550
2 X 1.0000 = 2.00 SR
Total Sales Inclusive GST @6% 2.00
Discount 0.00
Total 2.00
round Adj 0.00
Final Total 2.00
po eso rion |
CASH 2.00
CHANGE 0.00
GST Summary Amount(RM) Tax(RM)
SR @ 6% 1.89 0.11
INV NO: CSSA-0124981 Date: 17/11/2017
Goods sold are not Returnable & Refundable
THANK YOU FOR YOUR PATRONAGE
| PLEASE COME AGAIN.
TERIMA KASIH SILA DATANG LAGI
*¥ PLEASE KEEP THIS RECEIPT FOR PROVE OF
PURCHASE DATE FOR L.T PRODUCT WARRANTY
| PURPOSE **
Follow usin Facebook: Sanyu.Stationery
`;


// console.log('Sample 1 total:', extractTotal(sample1));
// console.log('Sample 2 total:', extractTotal(sample2));
// console.log('Sample 3 total:', extractTotal(sample3));
// console.log('Sample 4 total:', extractTotal(sample4));

console.log('Sample 1 store:', extractStoreName(sample1));
console.log('Sample 3 store:', extractStoreName(sample3));
console.log('Sample 4 store:', extractStoreName(sample4));