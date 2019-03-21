import * as React from 'react';
import {RouteComponentProps} from "react-router";
import score from './score.json'
import GameStat, {GameStatTeam} from "./GameStat";
import ReactTable from 'react-table';
import "react-table/react-table.css";

const columns = [
    {
        Header: "Name",
        accessor: "name",
    },
    {
        Header: "Nationality",
        accessor: "nationality",
        filterable: true
    },
    {
        Header: "Time On Ice",
        id: 'timeOnIce',
        accessor: (d: any) => d.playerStats.timeOnIce,
    },
    {
        Header: "Goals",
        id: 'goals',
        accessor: (d: any) => d.playerStats.goals,
    },
    {
        Header: "Assists",
        id: 'assists',
        accessor: (d: any) => d.playerStats.assists,
    },
    {
        Header: "+/-",
        id: 'plusMinus',
        accessor: (d: any) => d.playerStats.plusMinus,
    }
];

const defaultFilterMethod = (filter : any, row : any) =>
String(row[filter.id].toLowerCase()).indexOf(filter.value.toLowerCase()) !== -1;

interface IRouterProps {
    id: string
}

interface IProps extends RouteComponentProps<IRouterProps> {
}

interface IState {
    stats: GameStat
}

class GameStatComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        const away = GameStatTeam.Parse(JSON.stringify(score.teams.away));
        const home = GameStatTeam.Parse(JSON.stringify(score.teams.home));
        this.state = {stats: new GameStat(home, away)}

    }

    render() {
        console.log('this.state.stats.away.teamStats', this.state.stats.away.teamStats);
        return <div className="Game-stats">
            <p>Game Stats:</p>
            <p>{this.state.stats.away.name} - {this.state.stats.home.name}</p>
            <p>Goals: {this.state.stats.away.teamStats.goals} - {this.state.stats.home.teamStats.goals}</p>
            <p>Shots: {this.state.stats.away.teamStats.shots} - {this.state.stats.home.teamStats.shots}</p>
            <ReactTable data={this.state.stats.away.teamStats.players}
                        columns={[{Header: this.state.stats.away.name, columns}]}
                        defaultFilterMethod={defaultFilterMethod}
                        defaultSorted={[{
                            id   : 'goals',
                            desc : true,
                        }]}
            />
            <ReactTable data={this.state.stats.home.teamStats.players}
                        columns={[{Header: this.state.stats.home.name, columns}]}
                        defaultFilterMethod={defaultFilterMethod}/>
        </div>
    }
}

export default GameStatComponent