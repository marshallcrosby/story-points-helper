/*!
    * Blend Story Points Helper v1.0.0
    * Need description.
    *
    * Copyright 2022 Marshall Crosby
    * https://marshallcrosby.com
*/

const spCSS = `//import story-points-helper.css`;
const spMarkup = `//import _story-points-helper.html`;
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
`;

function openSpWindow() {
    const spWindow = window.open('', "Blend's Story Points Helper", 'width=320,height=450');
    const table = spWindow.document.querySelectorAll('.table');
    
    if (table.length === 0) {
        spWindow.document.write(spHTML);
    }
}

const spButton = document.querySelector('.story-points-button');
spButton.addEventListener('click', openSpWindow);