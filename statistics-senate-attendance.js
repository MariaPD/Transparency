/*var statisticsA = [
  {
    "id": "Republicans",
    "numberOfRepsRepublicans": null,
    "votedWithPartyRepublicans": null
      },
  {
    "id": "Democrats",
    "numberOfRepsDemocrats": null,
    "votedWithPartyDemocrats": null
      },
  {
    "id": "Independent",
    "numberOfRepsIndependent": null,
    "votedWithPartyIndependent": null
      },
  {
    "id": "All Parties",
    "leastEngaged": null,
    "mostEngaged": null
  }
  ]


var data;

window.onload = () => asistenciaSenado()*/

var app3 = new Vue({
  el: '#appsa',
  data: {
    senators: {},
    isLoaded: false
  },
  methods: {

    asistenciaSenado: function () {
      fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
        method: "GET",
        headers: {
          'X-API-Key': "B2KicELUJFpqFIb5WoWcZIJ7VRhmBWnWyeUN5upN"
        }
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      }).then(function (json) {
        app3.senators = json.results[0].members;
        app3.miembrosRepublicanos();
        app3.miembrosDemocratas();
        app3.miembrosIndependientes();
        app3.averageVotesRepublican();
        app3.averageVotesDemocrats();
        app3.averageVotesIndependent();
        app3.listaMostEngaged();
        app3.listaLeastEngaged();
        this.isLoaded = true;
        console.log("Senadores", app3.senators);
        console.log("Republicanos", app3.miembrosRepublicanos);
      }).catch(function (error) {
        console.log("Request failed:" + error.message);
      });
    },


    getRepublicans: function () {
      return this.senators.filter(republicano => republicano.party === "R");
    },
    miembrosRepublicanos: function () {
      console.log("Republican", this.getRepublicans());
      document.getElementById("numberrepublicansA").innerHTML = this.getRepublicans().length;
    },

    getDemocrats: function () {
      return this.senators.filter(democrata => democrata.party === "D");
    },
    miembrosDemocratas: function () {
      document.getElementById("numberdemocratsA").innerHTML = this.getDemocrats().length;
    },

    getIndependents: function () {
      return this.senators.filter(independiente => independiente.party === "I");
    },

    miembrosIndependientes: function () {
      document.getElementById("numberindependentA").innerHTML = this.getIndependents().length;
    },


    averageVotesRepublican: function () {
      document.getElementById("votespartyrepublicansA").innerHTML = (this.getRepublicans().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getRepublicans().length).toFixed(2);
    },

    averageVotesDemocrats: function () {
      document.getElementById("votespartydemocratsA").innerHTML = (this.getDemocrats().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getDemocrats().length).toFixed(2);
    },

    averageVotesIndependent: function () {
      document.getElementById("votespartyindependentA").innerHTML = (this.getIndependents().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getIndependents().length).toFixed(2);
    },


    listaMostEngaged: function () {
      var senatorsVotesOrder = this.senators.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct);
      var diezPorCientoMayor = parseInt(senatorsVotesOrder.length * 10 / 100);
      var numberMostEngaged = senatorsVotesOrder.slice(0, diezPorCientoMayor);

      document.getElementById("menorasistencia").innerHTML = numberMostEngaged.map(mostengaged =>
        "<tr> <td>" + mostengaged.first_name + "" + (mostengaged.middle_name || "") + " " + mostengaged.last_name + "</td>" +
        "<td>" + mostengaged.missed_votes + "</td>" +
        "<td>" + ((mostengaged.missed_votes_pct).toFixed(2)) + "</td>").join("")
    },

    listaLeastEngaged: function () {
      var senatorsVotesReverse = this.senators.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
      var diezPorCientoMenor = parseInt(senatorsVotesReverse.length * 10 / 100);
      var numberLeastEngaged = senatorsVotesReverse.slice(0, diezPorCientoMenor);

      document.getElementById("mayorasistencia").innerHTML = numberLeastEngaged.map(leastengaged =>
        "<tr> <td>" + leastengaged.first_name + "" + (leastengaged.middle_name || "") + " " + leastengaged.last_name + "</td>" +
        "<td>" + leastengaged.missed_votes + "</td>" +
        "<td>" + ((leastengaged.missed_votes_pct).toFixed(2)) + "</td>").join("")
    }

  },
  beforeMount() {
    console.log(this.isLoaded)
    this.asistenciaSenado();
  },

  beforeUpdate() {
    this.isLoaded = true;
  }
})
