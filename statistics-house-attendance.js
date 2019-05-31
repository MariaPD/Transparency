/*var statisticsAH = [
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
    "leastEngaged": null,
    "mostEngaged": null
  }
  ]


var data;

window.onload = () => asistenciaSenado()*/

var app5 = new Vue({
  el: '#appha',
    data: {
      congresistas: {},
      isLoaded: false
    },
   methods: {
     asistenciaHouse: function () { fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
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
  app5.congresistas = json.results[0].members;
  app5.miembrosRepublicanos();
  app5.miembrosDemocratas();
  app5.averageVotesRepublican();
  app5.averageVotesDemocrats();
  app5.listaMostEngaged();
  app5.listaLeastEngaged();
  this.isLoaded = true;
  console.log("Congresistas", app5.congresistas);
}).catch(function(error){
  console.log("Request failed:" + error.message);
});
 },    
     
  getRepublicans: function () {
    return this.congresistas.filter(republicano => republicano.party === "R");
  }, 
 miembrosRepublicanos: function () {
   document.getElementById("numberrepublicansAH").innerHTML = this.getRepublicans().length;
 },    
     
  getDemocrats: function () {
    return this.congresistas.filter(democrata => democrata.party === "D");
  },
 miembrosDemocratas: function (){
   document.getElementById("numberdemocratsAH").innerHTML = this.getDemocrats().length; 
 },      
     
   averageVotesRepublican: function (){
     document.getElementById("votespartyrepublicansAH").innerHTML = (this.getRepublicans().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getRepublicans().length).toFixed(2);
   },  

 averageVotesDemocrats: function () {
   document.getElementById("votespartydemocratsAH").innerHTML = (this.getDemocrats().reduce((acc, votante) => acc + votante.votes_with_party_pct, 0) / this.getDemocrats().length).toFixed(2);
 },     
     
   listaMostEngaged: function () {
  var senatorsVotesOrder = this.congresistas.sort((a,b) => b.missed_votes_pct - a.missed_votes_pct);
  var diezPorCientoMayor = parseInt(senatorsVotesOrder.length * 10/100);
  var numberMostEngaged = senatorsVotesOrder.slice(0, diezPorCientoMayor);
  
  document.getElementById("menorasistenciahouse").innerHTML = numberMostEngaged.map(mostengaged =>
  "<tr> <td>" + mostengaged.first_name + "" + (mostengaged.middle_name || "") + " " + mostengaged.last_name + "</td>" +
  "<td>" + mostengaged.missed_votes + "</td>" +
  "<td>" + ((mostengaged.missed_votes_pct).toFixed(2)) + "</td>").join("")
},


listaLeastEngaged: function() {
  var senatorsVotesReverse = this.congresistas.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
  var diezPorCientoMenor = parseInt(senatorsVotesReverse.length * 10/100);
  var numberLeastEngaged = senatorsVotesReverse.slice(0, diezPorCientoMenor);
  
  document.getElementById("mayorasistenciahouse").innerHTML = numberLeastEngaged.map(leastengaged =>
  "<tr> <td>" + leastengaged.first_name + "" + (leastengaged.middle_name || "") + " " + leastengaged.last_name + "</td>" +
  "<td>" + leastengaged.missed_votes + "</td>" +
  "<td>" + ((leastengaged.missed_votes_pct).toFixed(2)) + "</td>").join("")
}   
     
   },
   beforeMount() {
    console.log(this.isLoaded)
    this.asistenciaHouse();
  },

  beforeUpdate() {
    this.isLoaded = true;
  } 
})
















