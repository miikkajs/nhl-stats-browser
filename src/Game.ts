import Team from './Team'
export default class Game {

    constructor(readonly  gamePk: number, readonly  home: Team, readonly  away: Team) {
    }

}