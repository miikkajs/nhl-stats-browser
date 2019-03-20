// class Player {
//
//     constructor(readonly name: string, readonly nationality: string){
//
//     }
//
//
//     static Parse(jsonString: string) {
//         const json = JSON.parse(jsonString);
//         // return new Player()
//     }
//
// }

export class TeamStats {

    constructor(readonly goals: number, readonly shots: number) {

    }

}

export class GameStatTeam {
    constructor(readonly name: string, readonly teamStats: TeamStats) {
    }

    static Parse(jsonString: string) {
        const json = JSON.parse(jsonString);
        const teamStats = new TeamStats(json.teamStats.teamSkaterStats.goals, json.teamStats.teamSkaterStats.shots);
        return new GameStatTeam(json.team.name, teamStats);
    }

}

export default class GameStat {

    constructor(readonly  home: GameStatTeam, readonly  away: GameStatTeam) {
    }


}