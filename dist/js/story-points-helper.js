/*
    * Blend Story Points Helper v1.0.0
    * Need description.
    *
    * Copyright 2022 Marshall Crosby
    * https://marshallcrosby.com
*/

const spCSS = `body,html{height:100%;padding:0;margin:0}*,:after,:before{box-sizing:border-box}.table{--sp-color-primary-200:#dee8c9;--sp-color-primary-400:#cfdeb2;--sp-color-primary-600:#acc678;--sp-color-border:gray;--sp-ff:"Helvetica Neue",Arial,sans-serif;--sp-fs:14px;--sp-gradient-bar:linear-gradient(90deg,
       #DBB9B1 8.33%,
       #D78072 8.33%, #D78072 16.66%,
       #D45A51 16.66%, #D45A51 24.99%,
       #033430 24.99%, #033430 33.32%,
       #3F302A 33.32%, #3F302A 41.65%,
       #021614 41.65%, #021614 49.98%,
       #09443E 49.98%, #09443E 58.31%,
       #10B580 58.31%, #10B580 66.64%,
       #83C086 66.64%, #83C086 74.97%,
       #ABC983 74.97%, #ABC983 83.3%,
       #98B658 83.3%, #98B658 91.66%,
       #80A100 91.66%, #80A100 100%
      );display:flex;position:relative;font-family:var(--sp-ff);font-size:var(--sp-fs);width:100%;height:100%;flex-direction:column}.table:before{position:absolute;top:0;left:0;content:"";width:100%;height:8px;background:var(--sp-gradient-bar)}.tr{display:flex;height:100%;border-left:1px solid var(--sp-color-border)}.tr>*{flex-shrink:0;width:100%;max-width:100%}.th{font-weight:700}.td,.th{border:1px solid var(--sp-color-border);border-top:0;border-left:0;border-collapse:collapse;text-align:left;flex:1 0 0%;padding:8px 15px;display:flex;align-items:center}.td:first-child:not(:only-child),.th:first-child:not(:only-child){font-weight:700;background-color:var(--sp-color-primary-200)}.table__heading{padding-top:13px;text-align:center;border-top:1px solid var(--sp-color-border);border-right:1px solid var(--sp-color-border);font-size:calc(var(--sp-fs) * 1.25);justify-content:center}
`;
const spMarkup = `<div class="table"><div class="tr"><div class="table__heading th"><strong>Blend's Story Point Ranges</strong></div></div><div class="tr"><div class="th" style="background-color: var(--sp-color-primary-600)">Point(s)</div><div class="th" style="background-color: var(--sp-color-primary-600)">Low</div><div class="th" style="background-color: var(--sp-color-primary-600)">High</div></div><div class="tr"><div class="td">0 pts</div><div class="td">0 hrs</div><div class="td">0 hrs</div></div><div class="tr"><div class="td">0.5 pt</div><div class="td">1 hr</div><div class="td">1.5 hrs</div></div><div class="tr"><div class="td">1 pt</div><div class="td">2 hrs</div><div class="td">3 hrs</div></div><div class="tr"><div class="td">2 pts</div><div class="td">3 hrs</div><div class="td">5 hrs</div></div><div class="tr"><div class="td">3 pts</div><div class="td">5 hrs</div><div class="td">8 hrs</div></div><div class="tr"><div class="td">5 pts</div><div class="td">8 hrs</div><div class="td">14 hrs</div></div><div class="tr"><div class="td">8 pts</div><div class="td">10 hrs</div><div class="td">16 hrs</div></div><div class="tr"><div class="td">13 pts</div><div class="td">16 hrs</div><div class="td">30 hrs</div></div><div class="tr"><div class="td">20 pts</div><div class="td">40 hrs</div><div class="td">50 hrs</div></div></div>`;
const spHTML = /* html */`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Blend's Story Points Helper</title>
        <style>
            ${spCSS}
        </style>
    </head>
    <body>
        ${spMarkup}
    </body>
`

function openSpWindow() {
    const spWindow = window.open('', "Blend's Story Points Helper", 'width=320,height=450');
    const table = spWindow.document.querySelectorAll('.table');
    
    if (table.length === 0) {
        spWindow.document.write(spHTML);
    } else {
        spWindow.close();
    }

}

openSpWindow()
//# sourceMappingURL=story-points-helper.js.map