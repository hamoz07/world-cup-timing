const token = "cc4e62d8babd48a5a93df9f06c376d15";
let baseURL = "https://api.football-data.org/v2/competitions/2000";
let baseURL2 = "https://api.football-data.org/v4/competitions/2000";

function getStandings() {
  const url = `${baseURL}/standings`;

  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      let standings = response.data.standings;
      document.getElementById("allStandings").innerHTML = "";
      for (standing of standings) {
        let tableRow = "";
        for (row of standing.table) {
          tableRow += `
                    <li class="list-group-item">
                        <div class="row m-0 country-row">
                            <div class="col-sm-4 d-flex align-items-center">
                                <span class="flag">
                                    <img class="rounded-circle align-self-center"
                                        src="${row.team.crestUrl}"
                                        alt="Egypt flag">
                                </span>
                                <h5>${row.team.name}</h5>
                            </div>
                            <div class="col-sm-2 text-center">${row.won}</div>
                            <div class="col-sm-2 text-center">${row.lost}</div>
                            <div class="col-sm-2 text-center">${row.draw}</div>
                            <div class="col-sm-2 text-center"><b>${row.points}</b></div>
                        </div>
                    </li>
                    `;
        }
        let content = `
                        <div class="col-sm-6 mb-4">
                            <div class="card shadow border-0">
                                <div class="card-header bg-primary text-center">
                                    <b>${standing.group}</b>
                                </div>
                                <div class="row bg-success m-0">
                                    <div class="col-sm-4 text-center">team</div>
                                    <div class="col-sm-2 text-center">W</div>
                                    <div class="col-sm-2 text-center">L</div>
                                    <div class="col-sm-2 text-center">D</div>
                                    <div class="col-sm-2 text-center">Pts</div>
                                </div>
                                <ul class="list-group list-group-flush">
                                    ${tableRow}
                                </ul>
                            </div>
                        </div>
                        `;
        document.getElementById("allStandings").innerHTML += content;
      }
    });
}

getStandings();

function getMathces() {
  const url = `${baseURL2}/matches`;

  axios
    .get(url, {
      headers: {
        "X-Auth-Token": token,
      },
    })
    .then((response) => {
      let matches = response.data.matches;
      document.getElementById("matches").innerHTML = "";
      for (r of matches) {
        let homeTeam = r.homeTeam;
        let awayTeam = r.awayTeam;

        let utcFullDate = r.utcDate;
        let matchDate = new Date(utcFullDate);
        let StringFormat = `${matchDate.getUTCFullYear()}/${matchDate.getUTCMonth()}/${matchDate.getUTCDate()} ${matchDate.getUTCHours()}:${matchDate.getUTCMinutes()}`;

        let matcheContent = `<div class="col-sm-12 mt-5">
            <div class="card shadow rounded-pill overflow-hidden">
                <div class="card-body p-0">
                    <div class="row ">
                        <div class="col-sm-3 p-3 bg-primary">
                            <span>
                                <img class="rounded-circle matches_img"
                                    src="${homeTeam.crest}"
                                    alt="Egypt flag">
                            </span>
                            <h5 class="text-center mt-3">${homeTeam.name}</h5>
                        </div>
                        <div class="col-sm-6 d-flex justify-content-between align-items-center" style="padding: 0 30px ;">
                                <div class="text-center" style="font-size: 25px;"><b>${
                                  r.score.fullTime.home ?? "-"
                                }</b></div>
                                <div class="text-center ">
                                    <div>
                                        <b>${r.group ?? "-"}</b>
                                    </div>
                                    <b  style="font-size: 30px;">X</b>
                                    <div class="DATE_TIME">${StringFormat}</div>
                                </div>
                                <div class="text-center" style="font-size: 25px;"><b>${
                                  r.score.fullTime.away ?? "-"
                                }</b></div>
                        </div>
                        <div class="col-sm-3 bg-primary p-3">
                            <span>
                                <img class="rounded-circle matches_img"
                                    src="${awayTeam.crest}"
                                    alt="Egypt flag">
                            </span>
                            <h5 class="text-center mt-3">${awayTeam.name}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        document.getElementById("matches").innerHTML += matcheContent;
      }

    });
}

getMathces();
