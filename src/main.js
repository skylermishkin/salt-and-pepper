import Game from "./Game.js"
import Color from "./Color.js"
import Position from "./Position.js"

//global declarations
var SETTINGS = {
    //window related
    'width' : null, //set onload
    'height' : null,  //set onload

    //game related
    'level' : null,
    'moves' : null,
    'score' : null,
    'interval' : null,

    //board related
	'rows' : null,
	'cols' : null,
    'boardWidth' : null, //set onload
    'boardHeight' : null, //set onload
	'initVisibility' : null,
    'saltMatrix' : null,
    'visibilityMatrix' : null,

    //player related
    'playerRadius' : null, //set onload
	'gravity' : null,
    'saltColor': null,
    'pepperColor': null,

    //beacon related
    'beaconReach': null
};
var OPTIONS = {
	'paused' : null,
    'volume' : null
};
var CX;
var GAME = null;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.cancelAnimationFrame = window.cancelAnimationFrame || windo.mozCancelAnimationFrame;


onload = function() {
    // default settings and options
    defaultSettings();
    defaultOptions();

    // menu prep
    initializeMenu();
    let menu = document.getElementById('menu');

    // grab window dimensions, set more SETTINGS
    // body sizing
    SETTINGS['width'] = document.body.clientWidth;
    SETTINGS['height'] = document.body.clientHeight;
    // canvas sizing
    if (SETTINGS['width'] > SETTINGS['height'] - menu.offsetHeight) {
        SETTINGS['boardWidth'] = SETTINGS['height'] - menu.offsetHeight;
        SETTINGS['boardHeight'] = SETTINGS['height'] - menu.offsetHeight;
    } else {
        SETTINGS['boardWidth'] = SETTINGS['width'];
        SETTINGS['boardHeight'] = SETTINGS['width'];
    }
    // player sizing
    SETTINGS['playerRadius'] = SETTINGS['boardWidth'] / 40;

    // canvas prep
    initializeCanvas();
};

//----------------------------------------------------------------------------

//----------------------------------------------------------------------------

function defaultSettings(level) {
    //game related
    SETTINGS['level'] = null;
    SETTINGS['moves'] = 0;
    SETTINGS['score'] = 0;
    SETTINGS['interval'] = 1000; // in milliseconds
    //board related
    SETTINGS['rows'] = 10;
    SETTINGS['cols'] = 10;
    SETTINGS['initVisibility'] = 1;
    SETTINGS['saltMatrix'] = null;
    SETTINGS['visibilityMatrix'] = null;
    //player related
    SETTINGS['gravity'] = 1;
    SETTINGS['saltColor'] = new Color(255);
    SETTINGS['pepperColor'] = new Color(0);
    //beacon related
    SETTINGS['beaconReach'] = 3;  // in tiles
}

//----------------------------------------------------------------------------

function defaultOptions() {
    OPTIONS['paused'] = true;
    OPTIONS['volume'] = 5;
}

//----------------------------------------------------------------------------

function initializeCanvas() {
    //size canvas
    document.querySelector("canvas").width = SETTINGS['boardWidth'];
    document.querySelector("canvas").height = SETTINGS['boardHeight'];

    CX = document.querySelector("canvas").getContext("2d");
}

//----------------------------------------------------------------------------

function initializeMenu() {
    // static structure
    let menuHTML = 
        `<table>
            <tr>
                <td><h2>Game Menu</h2></td>
                <td></td>
                <td>Choose a level:</td>
                <td><input id="levelSelect" type="number" min="1" value="1"></td>
                <td><button id='loadButton'>Load</button></td>
            </tr>
            <tr>
                <td align='right'><h3>To win:</h3></td>
                <td><h3 id="threshold">0</h3></td>
                <td align='right'><h3>Score:</h3></td>
                <td><h3 id="score">0</h3></td>
                <td align='right'><h3>Moves:</h3></td>
                <td><h3 id="moves">0</h3></td>
            </tr>
            <tr>
                <td><p id='message'></p></td>
            </tr>
        </table>`;
    // final touches
    let menu = document.createElement("div");
    menu.setAttribute("id", "menu");
    menu.innerHTML = menuHTML;
    menu.style.width = SETTINGS['width'];
    document.body.insertBefore(menu, document.body.childNodes[0]);
    document.getElementById('levelSelect').max = SETTINGS['rows'] * SETTINGS['cols'] / 2;
    
    setMenuListeners();
}

//----------------------------------------------------------------------------

function setMenuListeners() {
    document.getElementById('loadButton').addEventListener("click", function (e) {
        loadGame(document.getElementById('levelSelect').value);
    });
}

//----------------------------------------------------------------------------

function loadGame(level) {
    //confirm load
    if (confirm("Loading a level will cause unsaved progress to be lost.\nContinue with load?")) {
        //kill listeners and delete old GAME
        if (GAME != null) {
            GAME.quit();
            GAME = null;
        }
        // prep settings and options
        defaultSettings();
        levelSettings(level);
        defaultOptions();
        console.log("loading new game:", SETTINGS, OPTIONS);  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        initializeGame(CX, SETTINGS, OPTIONS);
    }
}

function levelSettings(level) {  //BUG: set not actually composed of only unique (observe for high levels)
    //set threshold settings
    SETTINGS['level'] = level;
    document.getElementById('threshold').innerHTML = SETTINGS['level'];
    
    //simple random x,y generator according to level
    let randPoints = new Set();
    for (let i = 0; i < level; i++) {
        while (randPoints.size < i+1) { //try again if randPoints already included that point
            let x = getRandomIntInclusive(0,SETTINGS['cols']-1);
            let y = getRandomIntInclusive(0,SETTINGS['rows']-1);
            randPoints.add([x,y]);
        }
    }
    let randPointsIter = randPoints.values();

    //initialize saltMatrix and visibilityMatrix with 0's
    var saltMatrix = [];
    var visibilityMatrix = [];
    for (let i = 0; i < SETTINGS['rows']; i++) {
        var row = []
        for (let j = 0; j < SETTINGS['cols']; j++) {
            row.push(0);
        }
        saltMatrix.push(row);
        visibilityMatrix.push(row);
    }
    //sprinkle salt
    for (let i = 0; i < randPoints.size; i++) {
        let point = randPointsIter.next().value;
        saltMatrix[point[0]][point[1]] = 8;
    }

    SETTINGS['saltMatrix'] = saltMatrix;
    SETTINGS['visibilityMatrix'] = visibilityMatrix;
}

//----------------------------------------------------------------------------

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//----------------------------------------------------------------------------

function initializeGame(cx, settings, options) {
	GAME = new Game(cx, settings, options);

	GAME.board.paint();
    GAME.setListeners();
    GAME.salt.paint();
    GAME.setBoard();
}

//----------------------------------------------------------------------------