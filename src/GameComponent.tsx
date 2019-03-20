import * as React from 'react';
import Game from "./Game";

interface IGame {
    game : Game
}

class GameComponent extends React.Component<IGame> {

    render() {
        return <p>{this.props.game.away.name} - {this.props.game.home.name} {this.props.game.away.score} - {this.props.game.home.score}</p>
    }
}

export default GameComponent