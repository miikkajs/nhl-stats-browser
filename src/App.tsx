import * as React from 'react';
import './App.css';
// import gamesData from './games.json'
import Game from './Game'
import Team from './Team'
import GameComponent from "./GameComponent";
import {BrowserRouter as Router, Link} from "react-router-dom";
import {Route} from "react-router";
import GameStatComponent from "./GameStatComponent";
import moment from 'moment';
import {API_BASE_URL} from "./Utils";

const NHLLogo = require('./NHL-Shield.png');

interface IMainProps {
}

interface IMainState {
    games: Game[]
}


class App extends React.Component<IMainProps, IMainState> {

    constructor(props: IMainProps) {
        super(props);
        this.state = {games: []}

    }

    public componentDidMount() {
        console.log('component did mount');
        const yesterday = moment().subtract(1, 'days').format('YYYY-M-D');
        console.log('yesterday', yesterday);
        fetch(`${API_BASE_URL}/schedule?expand=schedule.teams&date=${yesterday}`)
            .then(response => response.json())
            .then((gamesData: any) => {
                const games: Game[] = gamesData.dates[0].games.map((gameData: any)=> {
                    const home = Team.Parse(JSON.stringify(gameData.teams.home));
                    const away = Team.Parse(JSON.stringify(gameData.teams.away));
                    return new Game(gameData.gamePk, home, away)
                });
                console.log('games', games);
                this.setState({games: games});
            })
            .catch(e => console.log('e', e));
    }


    public render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <img src={NHLLogo} className="App-logo" alt="logo"/>
                    </header>
                    <div className="App-intro">
                        {this.state.games.map((g, i) => <div key={i}><Link to={'/game/' + g.gamePk}><GameComponent
                            game={g}/></Link></div>)}
                    </div>
                </div>
                <Route path="/game/:id" component={GameStatComponent}/>
            </Router>
        );
    }
}

export default App;