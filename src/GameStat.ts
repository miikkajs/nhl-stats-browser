class PlayerStats {
    constructor(readonly timeOnIce: string = '0', readonly assists: number = 0, readonly goals: number = 0, readonly plusMinus: number = 0) {

    }

    static Parse(json: any) {
        return json.stats.hasOwnProperty('skaterStats') ?
            new PlayerStats(json.stats.skaterStats.timeOnIce,
                json.stats.skaterStats.assists,
                json.stats.skaterStats.goals,
                json.stats.skaterStats.plusMinus) : new PlayerStats();
    }

}

class Player {

    constructor(readonly name: string, readonly nationality: string, readonly playerStats: PlayerStats) {

    }


    static Parse(json: any) {
        const playerStats = PlayerStats.Parse(json);
        return new Player(json.person.fullName, json.person.nationality, playerStats);
    }

}

export class TeamStats {

    constructor(readonly goals: number, readonly shots: number, readonly players: Player[]) {

    }

}

export class GameStatTeam {
    constructor(readonly name: string, readonly teamStats: TeamStats) {
    }

    static Parse(json: any) {
        const players: Player[] = Object.keys(json.players)
            .filter((key: string) => json.players[key].position.type !== 'Goalie')
            .map((key: string) => {
                return Player.Parse(json.players[key])
            });
        const teamStats = new TeamStats(json.teamStats.teamSkaterStats.goals, json.teamStats.teamSkaterStats.shots, players);
        return new GameStatTeam(json.team.name, teamStats);
    }

}

export default class GameStat {

    constructor(readonly  home: GameStatTeam, readonly  away: GameStatTeam) {
    }


}