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
    "id": "All Parties",
    "leastLoyal": null,
    "mostLoyal": null
  }
  ]


var data;

window.onload = () => lealtadHouse()*/

var app6 = new Vue({
  el: '#apphl',
    data: {
      congresistas: {},
      isLoaded: false
    },
  methods: {
    lealtadHouse: function () { fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
  method: "GET",
  headers: {
    'X-API-Key':"B2KicELUJFpqFIb5WoWcZIJ7VRhmBWnWyeUN5upN"
  }
}).then(function(response){
  if(response.ok){
    return response.json();
  }
  throw new Error(response.statusText);
}).then(function(json){
  app6.congresistas = json.results[0].members;
  app6.miembrosRepublicanos();
  app6.miembrosDemocratas();
  app6.averageVotesRepublican();
  app6.averageVotesDemocrats();
  app6.listaLeastLoyal();
  app6.listaMostLoyal();
  this.isLoaded =true;
  console.log("Congresistas", app6.congresistas);
}).catch(function(error){
  console.log("Request failed:" + error.message);
});
 },
    
  getRepublicans: function () {
    return this.congresistas.filter(republicano => republicano.party === "R");
  },    
    miembrosRepublicanos: function () {
      document.getElementById("numberrepublicansLH").innerHTML = this.getRepublicans().length;
    }, 
    
    getDemocrats: function () {
      return this.congresistas.filter(democrata => democrata.party === "D");
    },
 miembrosDemocratas: function () {
   document.getElementById("numberdemocratsLH").innerHTML = this.getDemocrats().length;
 },   
   
     averageVotesRepublican: function (){
       document.getElementById("votespartyrepublicansLH").innerHTML = (this.getRepublicans().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getRepublicans().length).toFixed(2);
     },  

 averageVotesDemocrats: function () {
   document.getElementById("votespartydemocratsLH").innerHTML = (this.getDemocrats().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getDemocrats().length).toFixed(2);
 },
  
    listaLeastLoyal: function () {
  var senatorsVotesReverse = this.congresistas.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
  var diezPorCientoMenor = parseInt(senatorsVotesReverse.length * 10/100);
  var numberLeastLoyal = senatorsVotesReverse.slice(0, diezPorCientoMenor);
  
  document.getElementById("menoslealeshouse").innerHTML = numberLeastLoyal.map(leastloyal =>
  "<tr> <td>" + leastloyal.first_name + "" + (leastloyal.middle_name || "") + " " + leastloyal.last_name + "</td>" +
  "<td>" + Math.round(leastloyal.total_votes * leastloyal.votes_with_party_pct / 100) + "</td>" +
  "<td>" + ((leastloyal.votes_with_party_pct).toFixed(2)) + "</td>").join("")
},

listaMostLoyal: function () {
  var senatorsVotesOrder = this.congresistas.sort((a,b) => b.votes_with_party_pct - a.votes_with_party_pct);
  var diezPorCientoMayor = parseInt(senatorsVotesOrder.length * 10/100);
  var numberMostLoyal = senatorsVotesOrder.slice(0, diezPorCientoMayor);
  
  document.getElementById("maslealeshouse").innerHTML = numberMostLoyal.map(mostloyal =>
  "<tr> <td>" + mostloyal.first_name + "" + (mostloyal.middle_name || "") + " " + mostloyal.last_name + "</td>" +
  "<td>" + Math.round(mostloyal.total_votes * mostloyal.votes_with_party_pct / 100) + "</td>" +
  "<td>" + ((mostloyal.votes_with_party_pct).toFixed(2)) + "</td>").join("")
}    
    
  },
     beforeMount() {
    console.log(this.isLoaded)
    this.lealtadHouse();
  },

  beforeUpdate() {
    this.isLoaded = true;
  }
  
})




   







