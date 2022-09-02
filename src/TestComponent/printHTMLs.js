import moment from 'moment';

const finalFooter = `<div class="inv-footer-text">
                        <p>
                            Thanks for visiting our showroom. If you sell our jewellery to us, the price is paid by deducting 15% from the
                            current market price. Wages are excluded is all cases please bring cash memo with you at the time of sale and
                            change. the rules of Bangladesh Jewellers association are applicable in all cases
                        </p>
                    </div>
                    <div class="inv-title">
                        <h4>-:: Powered by Codebeyins Soft ::-</h4>
                    </div>
`;

const css_style = `
<style>
                @media print {
                    @page {
                        size: A3;
                    }
                }
                ul {
                    padding: 0;
                    margin: 0 0 1rem 0;
                    list-style: none;
                }
                body {
                    font-family: "Inter", sans-serif;
                    margin: 0;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                table,
                table th,
                table td {
                    border: 1px solid silver;
                }
                table th,
                table td {
                    text-align: right;
                    padding: 8px;
                }
                h1,
                h4,
                p {
                    margin: 0;
                }
        
                .container {
                    padding: 20px 0;
                    width: 1000px;
                    max-width: 90%;
                    margin: 0 auto;
                }
        
                .inv-title {
                    padding: 10px;
                    border: 1px solid silver;
                    text-align: center;
                    margin-bottom: 30px;
                }
                
                .inv-footer-text {
                    padding: 10px;
                    border: 1px solid silver;
                    margin-top: 30px;
                }
        
                .inv-logo {
                    width: 150px;
                    display: block;
                    margin: 0 auto;
                    margin-bottom: 40px;
                }
        
                /* header */
                .inv-header {
                    display: flex;
                    margin-bottom: 20px;
                }
                .inv-header > :nth-child(1) {
                    flex: 2;
                }
                .inv-header > :nth-child(2) {
                    flex: 1;
                }
                .inv-header h2 {
                    font-size: 20px;
                    margin: 0 0 0.3rem 0;
                }
                .inv-header ul li {
                    font-size: 15px;
                    padding: 3px 0;
                }
        
                /* body */
                .inv-body table th,
                .inv-body table td {
                    text-align: left;
                }
                .inv-body {
                    margin-bottom: 30px;
                }
        
                /* footer */
                .inv-footer {
                    display: flex;
                    flex-direction: row;
                }
                .inv-footer > :nth-child(1) {
                    flex: 2;
                }
                .inv-footer > :nth-child(2) {
                    flex: 1;
                }
            </style>
`;

const html_head = `
<head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>Invoice</title>
                <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
                        rel="stylesheet"
                />
                
                ${css_style}
        
            </head>
`;

export const printInvoiceHtmlWithValue = (printObject) => {
    //let myString = "Hi, my name is {{name}}!"; stInvoiceData?.invoiceNo

    /*printInvoiceHtml = printInvoiceHtml.replace(/{{(.*?)}}/g, (match) => {
        return printObject[match.split(/{{|}}/).filter(Boolean)[0]];
    });*/

    let printInvoiceHtmlInFunc = `
        <!DOCTYPE html>
        <html lang="en">
        
            ${html_head}
            
            <body>
            <div class="container">
                <div class="inv-title">
                    <h1>New Apon Jwellers</h1>
                    <h5>R.B Plaza fazil ghat road, Dagonbhaigan, Feni</h5>
                    <h4>Invoice # ${printObject.invoiceNo}</h4>
                </div>
                <!--<img src="./ZAF.jpg" class="inv-logo" />-->
                <div class="inv-header">
                    <div>
            
                        <h2>Custommer: ${ printObject.cname }</h2>
                        <ul>
                            <!--<li>Birmingom BS -435</li>-->
                            <li>Address: ${ printObject.caddress }</li>
                            <li>Phone: ${ printObject.cmobile }</li>
                        </ul>
            
                    </div>
                    <div>
                        <table>
                            <tr>
                                <th>Issue Date</th>
                                <td> ${moment().format('dddd, MMMM DD, YYYY')}</td>
                            </tr>
                            <!--<tr>
                                <th>Due Date</th>
                                <td>12-02-2018</td>
                            </tr>
                            <tr>
                                <th>Sub total</th>
                                <td>6500</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>7000</td>
                            </tr>-->
                        </table>
                    </div>
                </div>
                <div class="inv-body">
                    <table>
            
                        <thead>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Weight </th>
                            <th>Barcode</th>
                            <th>Total</th>
                        </thead>
            
                        <tbody>
                        ${
                            (function (){
                                //return printObject.productList?.map();
                                let tr = '';
                                printObject.productList?.forEach((elm) => {
                                    //console.log(elm.table[0][2]);
    
                                    let product = elm.table[0][2];
                                    let comment = elm.table[1][2];
                                    let price = Number(elm.table[5][2]);
                                    let weight = Number(elm.table[4][2]);
                                    let barcode = elm.table[6][2];
                                    let total = price * weight;
                                    
                                    tr += `<tr>
                                                <td>
                                                    <h4>${product}</h4>
                                                    <p>${comment}</p>
                                                </td>
                                                <td>৳ ${price}</td>
                                                <td>${weight}g</td>
                                                <td>${barcode}</td>
                                                <td>${total}</td>
                                            </tr>`;
                                });
                                return tr;
                            })()
                        }
            
                        </tbody>
                    </table>
                </div>
                <div class="inv-footer">
                    <div><!-- required --></div>
                    <div>      
                        <table>
                                <tr>
                                    <th>Sub Total: </th>
                                    <td>৳ ${printObject.subTotal}</td>
                                </tr>
                                <tr>
                                    <th>VAT  :</th>
                                    <td>[${printObject.vatPercent}%] | [৳ ${printObject.vatAmount}]</td>
                                </tr>
                                <tr>
                                    <th>Payable Amount :</th>
                                    <td>৳${printObject.totalAmount}</td>
                                </tr>
                                <tr>
                                    <th>Paid :</th>
                                    <td>৳${printObject.paidAmount}</td>
                                </tr>
                                <tr>
                                    <th>Due :</th>
                                    <td>৳ ${printObject.dueAmount}</td>
                                </tr>
                            </table>
                    </div>
                </div>
                <br>
                <br>
            
                ${finalFooter}
                
            </div>
            </body>
        </html>
    `;


    return printInvoiceHtmlInFunc;
}


export const printPurchaseInvoiceHtml = (printObject) => {

    let printHtml = `
        <!DOCTYPE html>
        <html lang="en">
        
            ${html_head}
            
            <body>
            <div class="container">
                <div class="inv-title">
                    <h1>New Apon Jwellers</h1>
                    <h5>R.B Plaza fazil ghat road, Dagonbhaigan, Feni</h5>
                    <h4>Invoice # ${printObject.invoiceNo}</h4>
                </div>
                <div class="inv-header">
                    <div>
            
                        <h2>Custommer: ${ printObject.cname }</h2>
                        <ul>
                            <li>Address: ${ printObject.caddress }</li>
                            <li>Phone: ${ printObject.cmobile }</li>
                        </ul>
            
                    </div>
                    <div>
                        <table>
                            <tr>
                                <th>Issue Date</th>
                                <td> ${moment().format('dddd, MMMM DD, YYYY')}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="inv-body">
                    <table>
            
                        <thead>
                            <th>Type</th>
                            <th>Pr Name</th>
                            <th>Description</th>
                            <th>Karat</th>
                            <th>Price</th>
                            <th>Weight </th>
                            <th>Total</th>
                        </thead>
            
                        <tbody>
                        ${
                            (function (){
                                let tr = '';
                                printObject.productList?.forEach((elm) => {
                                    console.log('---------------',elm);

                                    const {
                                        name,
                                        description,
                                        grade,
                                        price,
                                        weight,
                                        category
                                    } = elm;
    
                                    let total = price * weight;
                                    
                                    tr += `<tr>
                                                <td>${printObject.type}</td>
                                                <td>${name}</td>
                                                <td>${description}</td>
                                                <td>${grade}</td>
                                                <td>৳ ${price}</td>
                                                <td>${weight}g</td>
                                                <td>${total}</td>
                                            </tr>`;
                                });
                                return tr;
                            })()
                        }
            
                        </tbody>
                    </table>
                </div>
                <div class="inv-footer">
                    <div><!-- required --></div>
                    <div>      
                        <table>
                                <tr>
                                    <th>Sub Total: </th>
                                    <td>৳ ${printObject.subTotal}</td>
                                </tr>
                                <tr>
                                    <th>VAT  :</th>
                                    <td>[${printObject.vatPercent}%] | [৳ ${printObject.vatAmount}]</td>
                                </tr>
                                <tr>
                                    <th>Payable Amount :</th>
                                    <td>৳${printObject.totalAmount}</td>
                                </tr>
                                <tr>
                                    <th>Paid :</th>
                                    <td>৳${printObject.paidAmount}</td>
                                </tr>
                                <tr>
                                    <th>Due :</th>
                                    <td>৳ ${printObject.dueAmount}</td>
                                </tr>
                            </table>
                    </div>
                </div>
                <br>
                <br>
            
                ${finalFooter}
                
            </div>
            </body>
        </html>
    `;

    return printHtml;
}
