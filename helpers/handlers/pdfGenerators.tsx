/* eslint-disable prettier/prettier */
import {
  AccountingPdfContentI,
  TableSettings,
} from '../../FrontendSelfTypes/moduleProps/ComponentsProps';

export const generateFieldAccountingPdf = async <T extends Record<string, any>>(
  columns: Array<TableSettings<T>>,
  rows: Array<T>,
  content: AccountingPdfContentI,
) => `
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>My Website</title>
  </head>
  <body>
        <div id='title'><h2>${content.header}</h2>  
        <p>${content.headerFooter}</p></div>
     <div id='tableContener'>
        <table>
            <thead><tr>
            <th>LP.</th>
            ${columns.map(
              col => `<th>${col.header}</th>`
            ).join('')}</tr></thead>
            <tbody>${rows.map(
              (rowEntity,index) =>
                `<tr>
                  <td>${index+1}</td>
                  ${columns.map(
                  col => `<td>${typeof rowEntity[col.field] === 'number' ?  rowEntity[col.field].toFixed(2) : rowEntity[col.field]}</td>`
                ).join('')}</tr>`
            ).join('')}
            <tr>
            <td></td>
            <td class='borderOff'>SUMMARY</td>
            <td class='borderOff'></td>
            <td class='borderOff'></td>
            <td class='borderOff'></td>
            <td class='borderOff'></td>
            <td class='borderOff'></td>
            <td class='borderOff'></td>
            <td>${content.priceSum}</td>
            <td>${content.priceWTaxSum}</td>
            </tr>
            </tbody>
        </table>
     </div>
     <p id='footer'>*${content.documentBottomFooter}</p>
  </body>
  <style>
      body {
      margin: 5vw;
      font-family: Arial, sans-serif;
      position: relative;
    }

    h2 {
      text-align: center;
    }

    p {
      text-align: center;
      margin: 0 0 2vh 0;
      text-transform: uppercase;
    }

    table {
      border-collapse: collapse;
      margin: 0 auto;
    }

    th, td {
      border: 2px solid black;
      align-items: center;
      font-size: 12px;
      text-align: center;
      padding-left: 5px;
      padding-right: 5px;
    }
    td.borderOff{
      border: none;
      border-bottom: 2px solid black;
    }
    #footer {
      font-size: 8px;
      text-align: left;
      padding-top: 4px;
      text-transform: none;
    }
  </style>
</html>`;
