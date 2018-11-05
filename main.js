"use strict";

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

var somin

function main(){

    var splashDom;
    var gameDom;
    var winDom;
    var buttonStartListner;
    var buttonRestartListner;
    var buttonStart;
    var buttonReset;

    function buildSplash(){

        splashDom = buildDom(`
            <main class="splash">
                <h1>SKULL JUMPER</h1>
                <button>Start</button>
            </main>
        `);

        document.body.appendChild(splashDom);

        buttonStart = splashDom.querySelector('button');
        buttonStartListner = buttonStart.addEventListener('click', buildGameScreen);

        //buildGameScreen();
    }

    function destroySplash(){
        splashDom.remove();
        buttonStart.removeEventListener("click",buttonStartListner);
    }

    function buildGameScreen(){
        destroySplash();
        destroyWinGame();

        gameDom = buildDom(`
            <main class="game container">
                <div class="canvas">
                    <canvas></canvas>
                </div>
            </main>
        `);

        document.body.appendChild(gameDom);

        var game = new Game();
        game.start();
        game.levels.onGameOverCallback(buildWinGame);

    }

    function destroyGameScreen(){
        gameDom.remove();
        
    }

    function buildWinGame(){
        destroyGameScreen();
        
        winDom = buildDom(`
            <main class="win">
                <h1>YOU WIN!</h1>
                <button>Restart</button>
            </main>
        `);

        document.body.appendChild(winDom);

        buttonReset = winDom.querySelector('button');
        buttonRestartListner = buttonReset.addEventListener('click', buildGameScreen);
        
    }

    function destroyWinGame(){
        if(winDom){
            winDom.remove();
            buttonReset.removeEventListener("click",buttonRestartListner);
        }
    }

    buildSplash();

}

window.addEventListener('load', main);