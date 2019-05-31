/*var statisticsL = [
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
    "leastLoyal": null,
    "mostLoyal": null
  }
  ]


var data;

window.onload = () => lealtadSenado()*/

var app4 = new Vue({
  el: '#appsl',
  data: {
    senators: {},
    isLoaded: false
  },
  methods: {

    lealtadSenado: function () {
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
        app4.senators = json.results[0].members;
        app4.miembrosRepublicanos();
        app4.miembrosDemocratas();
        app4.miembrosIndependientes();
        app4.averageVotesRepublican();
        app4.averageVotesDemocrats();
        app4.averageVotesIndependent();
        app4.listaLeastLoyal();
        app4.listaMostLoyal();
        this.isLoaded = true;
        console.log("senadores", app4.senators);
      }).catch(function (error) {
        console.log("Request failed:" + error.message);
      });
    },

    getRepublicans: function () {
      return this.senators.filter(republicano => republicano.party === "R");
    },
    miembrosRepublicanos: function () {
      document.getElementById("numberrepublicansL").innerHTML = this.getRepublicans().length;
    },

    getDemocrats: function () {
      return this.senators.filter(democrata => democrata.party === "D");
    },
    miembrosDemocratas: function () {
      document.getElementById("numberdemocratsL").innerHTML = this.getDemocrats().length;
    },

    getIndependents: function () {
      return this.senators.filter(independiente => independiente.party === "I");
    },
    miembrosIndependientes: function () {
      document.getElementById("numberindependentL").innerHTML = this.getIndependents().length;
    },

    averageVotesRepublican: function () {
      document.getElementById("votespartyrepublicansL").innerHTML = (this.getRepublicans().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getRepublicans().length).toFixed(2);
    },

    averageVotesDemocrats: function () {
      document.getElementById("votespartydemocratsL").innerHTML = (this.getDemocrats().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getDemocrats().length).toFixed(2);
    },

    averageVotesIndependent: function () {
      document.getElementById("votespartyindependentL").innerHTML = (this.getIndependents().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getIndependents().length).toFixed(2);
    },

    listaLeastLoyal: function () {
      var senatorsVotesReverse = this.senators.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct)
      var diezPorCientoMenor = parseInt(senatorsVotesReverse.length * 10 / 100)
      var numberLeastLoyal = senatorsVotesReverse.slice(0, diezPorCientoMenor)

      document.getElementById("menosleales").innerHTML = numberLeastLoyal.map(leastloyal =>
        "<tr> <td>" + leastloyal.first_name + "" + (leastloyal.middle_name || "") + " " + leastloyal.last_name + "</td>" +
        "<td>" + Math.round(leastloyal.total_votes * leastloyal.votes_with_party_pct / 100) + "</td>" +
        "<td>" + ((leastloyal.votes_with_party_pct).toFixed(2)) + "</td>").join("")
    },

    listaMostLoyal: function () {
      var senatorsVotesOrder = this.senators.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct)
      var diezPorCientoMayor = parseInt(senatorsVotesOrder.length * 10 / 100)
      var numberMostLoyal = senatorsVotesOrder.slice(0, diezPorCientoMayor)

      document.getElementById("masleales").innerHTML = numberMostLoyal.map(mostloyal =>
        "<tr> <td>" + mostloyal.first_name + "" + (mostloyal.middle_name || "") + " " + mostloyal.last_name + "</td>" +
        "<td>" + Math.round(mostloyal.total_votes * mostloyal.votes_with_party_pct / 100) + "</td>" +
        "<td>" + mostloyal.votes_with_party_pct + "</td>").join("")
    },

  },
  beforeMount() {
    console.log(this.isLoaded)
    this.lealtadSenado();
  },

  beforeUpdate() {
    this.isLoaded = true;
  }
})
