export default class Team {

    constructor(readonly name: string, readonly  score: number) {
    }

    static Parse(jsonString: string){
        const json = JSON.parse(jsonString);
        return new Team(json.team.name, json.score)
    }
}