import * as React from 'react';
import {RouteComponentProps} from "react-router";
import score from './score.json'
import GameStat, {GameStatTeam} from "./GameStat";
import ReactTable from 'react-table';

interface IRouterProps {
    id: string
}

interface IProps extends RouteComponentProps<IRouterProps> {
}

interface IState{
    stats: GameStat
}

class GameStatComponent extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
        const away = GameStatTeam.Parse(JSON.stringify(score.teams.away));
        const home = GameStatTeam.Parse(JSON.stringify(score.teams.home));
        this.state = {stats: new GameStat(home, away)}

    }

    render() {

        return <div className="Game-stats">
            <p >Game Stats:</p>
            <p>{this.state.stats.away.name} - {this.state.stats.home.name}</p>
            <p>Goals: {this.state.stats.away.teamStats.goals} - {this.state.stats.home.teamStats.goals}</p>
            <p>Shots: {this.state.stats.away.teamStats.shots} - {this.state.stats.home.teamStats.shots}</p>
            <ReactTable data={score.teams.away.players}/>
        </div>
    }
}

export default GameStatComponent