import Player from '/js/model/Player.js';

const gameModel = {
    current_player_index: 1,

    get currentPlayer() {
        if (this.current_player_index === 1) {
            return this.player1;
        } else {
            return this.player2;
        }
    },

    player1: {},
    player2: {},
    wining_positions: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]

};

const gameController = {

    /**
     * init function for the main controller
     * object creation will happen here
     */
    init() {
        //const result =  this.isGameEnd([4],gameModeStevenl.wining_positions);
        //console.log(result);

        this.assignPlayer();
        gameView.init();
    },

    assignPlayer() {
        gameModel.player1 = new Player("Ryan", 'O');
        gameModel.player2 = new Player("Steven", 'X');
    },

    /**
     * Check if the given position list is enough to end the game
     * 
     * @param {Array} positions 
     * @param {Array} wining_positions 
     */
    isGameEnd(positions, wining_positions) {

        //looping over positions 
        for (const index in wining_positions) {
            let is_game_end = true;

            //looping over item
            for (const j in wining_positions[index]) {
                const current_wining_position = wining_positions[index][j];

                //if not matching item is found
                //End the search
                if (positions.indexOf(current_wining_position) === -1) {
                    is_game_end = false;
                }
            }
            if (is_game_end) {
                console.log("the game is end");
                return true;
            }
        }
        return false;
    },

    addPosition(position) {
        //current player's position store
        gameModel.currentPlayer.position.push(position);
        console.log(gameModel.currentPlayer.position);

        //check if the game is end
        const result = this.isGameEnd(
            gameModel.currentPlayer.position,
            gameModel.wining_positions
        )
        console.log(gameModel.currentPlayer);

        //change the current user
        //do not change the player if the game is already end
        if (!result) {
            this.changePlayer();
        } else {
            alert(`${gameModel.currentPlayer.name} won the game!`);
        }

        //re-render~

        gameView.render();
    },

    changePlayer() {
        if (gameModel.current_player_index === 1) {
            gameModel.current_player_index = 2;
        } else {
            gameModel.current_player_index = 1;
        }
    },
    getAllPLayer() {
        return [gameModel.player1, gameModel.player2];
    },

    getCurrentPlayer() {
        return gameModel.currentPlayer;
    },

    restartGame() {
        //Restart the index
        gameModel.current_player_index = 1;
        //Restart the player
        this.assignPlayer();
        //Re-render
        gameView.render();
    }
};

const gameView = {
    init() {
        //Select all checkbox
        this.checkboxes = document.querySelectorAll(".game-view input[type='checkbox']");
        this.restartBtn = document.querySelector('#restart-game');
        this.playerName = document.querySelectorAll(".current-player");

        for (const box of this.checkboxes) {
            box.addEventListener('change', (event) => this.checkboxChange(event));
        }

        this.restartBtn.addEventListener('click', function () {
            gameController.restartGame();
        });

        this.render();

    },

    render() {

        for (const object of this.playerName) {
            object.textContent = gameController.getCurrentPlayer().name;
        }

        this.clearBoard();

        const allPlayers = gameController.getAllPLayer();

        for (const player of allPlayers) {
            for (const position of player.position) {
                const selector = `.game-view input[data-block='${position}']`;
                console.log(selector);
                const current_checkbox = document.querySelector(selector);
                current_checkbox.checked = true;
                current_checkbox.disabled = true;
                current_checkbox.parentNode.querySelector('label').textContent = player.mark;
            }
        }
    },

    clearBoard() {
        for (const box of this.checkboxes) {
            box.checked = false;
            box.disabled = false;
            box.parentNode.querySelector('label').textContent = "";
        }
    },

    checkboxChange(event) {
        const checkbox_obj = event.target;
        const current_block = parseInt(checkbox_obj.dataset.block);
        checkbox_obj.disabled = true;
        gameController.addPosition(current_block);
    }
}

const registerView = {

}

const scoreBoardView = {

}

gameController.init();