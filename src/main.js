import Game from "./Game.js"
import Color from "./Color.js"

//global declarations
var SETTINGS = {
    //game related
    'interval' : 1000, //in milliseconds

    //board related
	'rows' : 10,
	'cols' : 10,
	'initVisibility' : 1,

    //player related
	'gravity' : 1,

    //beacon related
    'radius': 3
};
var OPTIONS = {
	'paused' : true,
    'volume' : 5
};
var CX;
var GAME;

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

onload = function() {
    //grab window dimensions
    SETTINGS['width'] = document.body.clientWidth;
    SETTINGS['height'] = document.body.clientHeight;

    initializeCanvas();
    
    initializeMenu();
};

//----------------------------------------------------------------------------

function initializeCanvas() {
    //size canvas
    if (SETTINGS['width'] * 4 / 5 > SETTINGS['height']) {
        SETTINGS['boardWidth'] = SETTINGS['height'];
        SETTINGS['boardHeight'] = SETTINGS['height'];
    } else {
        SETTINGS['boardWidth'] = SETTINGS['width'] * 4 / 5;
        SETTINGS['boardHeight'] = SETTINGS['width'] * 4 / 5;
    }
    document.querySelector("canvas").width = SETTINGS['boardWidth'];
    document.querySelector("canvas").height = SETTINGS['boardHeight'];

    CX = document.querySelector("canvas").getContext("2d");
}

//----------------------------------------------------------------------------

function initializeMenu() {
    let menuHTML = `<h2>Game Menu</h2>
        <br>
        <h3 id="threshold">To win: 0</h3>
        <h3 id="score">Score: 0</h3>
        <br>
        <p>Choose a level</p>
        <select id="levelSelect">
            <option value=1>Lvl 1</option>
            <option value=2>Lvl 2</option>
            <option value=3>Lvl 3</option>
            <option value=4>Lvl 4</option>
            <option value=5>Lvl 5</option>
        </select>
        <button id='loadButton'>Load</button>`;

    let menu = document.createElement("div");
    menu.setAttribute("id", "menu");
    menu.innerHTML = menuHTML;
    menu.style.width = SETTINGS['width'] / 5;
    document.body.insertBefore(menu, document.body.childNodes[0]);    
    setMenuListeners();
}

//----------------------------------------------------------------------------

function setMenuListeners() {
    document.getElementById('loadButton').addEventListener("click", function (e) {
        let selector = document.getElementById('levelSelect');
        loadGame(selector.options[selector.selectedIndex].value);
    });
}

//----------------------------------------------------------------------------

function loadGame(level) {
    //confirm load
    if (confirm("Loading a level will cause unsaved progress to be lost.\nContinue with load?")) {
        GAME = undefined;
        levelSettings(level);
        initializeGame(CX, SETTINGS, OPTIONS);
    }
}

//----------------------------------------------------------------------------

function initializeGame(cx, settings, options) {
	GAME = new Game(cx, settings, options);
	GAME.setListeners();
	GAME.play();
}

//----------------------------------------------------------------------------

function levelSettings(level) { 
    //simple random x,y generator according to level
    var randX = [];
    var randY = [];
    for (let i = 0; i < level; i++) {
        randX.push(getRandomIntInclusive(0,10));
        randY.push(getRandomIntInclusive(0,10));
    }

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
    for (let i = 0; i < level; i++) {
        saltMatrix[randX[i]][randY[i]] = 8;
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