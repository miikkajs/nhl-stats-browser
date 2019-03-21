class PlayerStats {
    constructor(readonly timeOnIce: string = '0', readonly assists: number = 0, readonly goals: number = 0, readonly plusMinus: number = 0) {

    }

    static Parse(jsonString: string) {
        const json = JSON.parse(jsonString);
        console.log('json', json);
        if (json.stats.hasOwnProperty('skaterStats')) {
            return new PlayerStats(json.stats.skaterStats.timeOnIce,
                json.stats.skaterStats.assists,
                json.stats.skaterStats.goals,
                json.stats.skaterStats.plusMinus);
        } else {
            return new PlayerStats();
        }
    }

}

class Player {

    constructor(readonly name: string, readonly nationality: string, readonly playerStats: PlayerStats) {

    }


    static Parse(jsonString: string) {
        const json = JSON.parse(jsonString);
        const playerStats = PlayerStats.Parse(jsonString);
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

    static Parse(jsonString: string) {
        const json = JSON.parse(jsonString);
        const players: Player[] = Object.keys(json.players).map((key: string) => {
            return Player.Parse(JSON.stringify(json.players[key]))
        });
        const teamStats = new TeamStats(json.teamStats.teamSkaterStats.goals, json.teamStats.teamSkaterStats.shots, players);
        return new GameStatTeam(json.team.name, teamStats);
    }

}

export default class GameStat {

    constructor(readonly  home: GameStatTeam, readonly  away: GameStatTeam) {
    }


}