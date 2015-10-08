import Game from "./Game.js"
import Position from "./Position.js"

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
var GAME;

window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

onload = function() {
    //grab dimensions
    var WIDTH = document.body.clientWidth;
    var HEIGHT = document.body.clientHeight;

    //size canvas
    document.querySelector("canvas").width = WIDTH * 4 / 5;
    document.querySelector("canvas").height = HEIGHT;
    var CX = document.querySelector("canvas").getContext("2d");
    
    initializeMenu();
};

//----------------------------------------------------------------------------

function initializeMenu() {
    //size menu
    document.getElementById('menu').style.width = SETTINGS['width'] / 5;
    
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

function loadGame(levelSelect) {
    //confirm load
    if (confirm("Loading a level will cause unsaved progress to be lost.\nContinue with load?")) {
        initializeGame(levelSettings(levelSelect), OPTIONS);
    }
}

//----------------------------------------------------------------------------

function initializeGame(setings, options) {
	GAME = new Game(settings, options);
	GAME.setListeners();
	GAME.render();
}

//----------------------------------------------------------------------------

function levelSettings(levelSelect) {
    //todo: transform the levelSelect into level specific settings such as salt matrix
}

//----------------------------------------------------------------------------
