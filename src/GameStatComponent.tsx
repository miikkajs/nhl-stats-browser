import * as React from 'react';
import {RouteComponentProps} from "react-router";
import score from './score.json'
import GameStat, {GameStatTeam} from "./GameStat";
import ReactTable from 'react-table';
import "react-table/react-table.css";
import moment from 'moment';
import {API_BASE_URL} from "./Utils";

const columns = [
    {
        Header: "Name",
        accessor: "name",
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
    },
    {
        Header: "Time On Ice",
        id: 'timeOnIce',
        accessor: (d: any) => d.playerStats.timeOnIce,
        sortMethod: (a: string, b: string) => {
            return moment(a, 'mm:ss').valueOf() - moment(b, 'mm:ss').valueOf()
        }
    },
    {
        Header: "Nationality",
        accessor: "nationality",
        filterable: true
    }
];

const defaultFilterMethod = (filter: any, row: any) =>
    String(row[filter.id].toLowerCase()).indexOf(filter.value.toLowerCase()) !== -1;

const defaultSorted = [{
    id: 'goals',
    desc: true,
}];

interface IGameStatsRouterProps {
    id: string
}

interface IGameStatsProps extends RouteComponentProps<IGameStatsRouterProps> {
}

interface IGameStatsState {
    stats: GameStat
}

class GameStatComponent extends React.Component<IGameStatsProps, IGameStatsState> {

    constructor(props: IGameStatsProps) {
        super(props);
        const away = GameStatTeam.Parse(score.teams.away);
        const home = GameStatTeam.Parse(score.teams.home);
        this.state = {stats: new GameStat(home, away)};

    }

    componentDidMount() {
        this.fetchData()
    }

    componentDidUpdate(prevProps: IGameStatsProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchData();
        }
    }

    render() {
        return <div className="Game-stats">
            <p>Game Stats:</p>
            <p>{this.state.stats.away.name} - {this.state.stats.home.name}</p>
            <p>Goals: {this.state.stats.away.teamStats.goals} - {this.state.stats.home.teamStats.goals}</p>
            <p>Shots: {this.state.stats.away.teamStats.shots} - {this.state.stats.home.teamStats.shots}</p>
            <ReactTable data={this.state.stats.away.teamStats.players}
                        columns={[{Header: this.state.stats.away.name, columns}]}
                        defaultFilterMethod={defaultFilterMethod}
                        defaultSorted={defaultSorted}
            />
            <ReactTable data={this.state.stats.home.teamStats.players}
                        columns={[{Header: this.state.stats.home.name, columns}]}
                        defaultFilterMethod={defaultFilterMethod}
                        defaultSorted={defaultSorted}/>
        </div>
    }

    fetchData() {

        fetch(`${API_BASE_URL}/game/${this.props.match.params.id }/boxscore`)
            .then(response => response.json())
            .then((gamesData: any) => {
                const away = GameStatTeam.Parse(gamesData.teams.away);
                const home = GameStatTeam.Parse(gamesData.teams.home);
                const newState = {stats: new GameStat(home, away)};
                this.setState(newState);
            })
            .catch(e => console.log('e', e));
    }
}

export default GameStatComponent