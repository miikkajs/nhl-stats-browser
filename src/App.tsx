import * as React from 'react';
import './App.css';
import gamesData from './games.json'
import Game from './Game'
import Team from './Team'
import GameComponent from "./GameComponent";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Route} from "react-router";
import GameStatComponent from "./GameStatComponent";

interface IMainProps {
}

interface IMainState {
    games: Game[]
}


class App extends React.Component<IMainProps, IMainState> {

    constructor(props: IMainProps) {
        super(props);
        const games: Game[] = gamesData.dates[0].games.map(gameData => {
            const home = Team.Parse(JSON.stringify(gameData.teams.home));
            const away = Team.Parse(JSON.stringify(gameData.teams.away));
            return new Game(gameData.gamePk, home, away)
        });
        this.state = {games: games};
    }


    public render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                    </header>
                    <p className="App-intro">
                        {this.state.games.map(g => <Link to={'/game/' + g.gamePk}><GameComponent game={g}/></Link>)}
                    </p>
                </div>
                <Route path="/game/:id" component={GameStatComponent}/>
            </Router>
        );
    }
}

export default App;