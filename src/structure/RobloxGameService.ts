export class RobloxGameService {
  private universeID: string;

  public constructor(universeID: string) {
    this.universeID = universeID;
  }

  async fetchData() { // Fetches general data about the game and returns a promise containing the json data
    return await fetch(`https://games.roblox.com/v1/games?universeIds=${this.universeID}`)
      .then(response => response.json()).then(json => json.data[0]);
  }

  async fetchVotes() { // Fetches vote data about the game and returns a promise containing the json data
    return await fetch(`https://games.roblox.com/v1/games/votes?universeIds=${this.universeID}`)
      .then(response => response.json()).then(json => json.data[0]);
  }
}