var app1 = new Vue({
  el: '#apps',
  data: {
    senators: {},
    showThisSenator: "",
    isLoaded: false
    /*    first_name:{},
        middle_name:{},
        last_name:{},
        party:{},
        state:{},
        seniority:{},
        votes_with_party_pct:{}*/
  },
  methods: {

    obtenerSenado: function () {
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
        app1.senators = json.results[0].members;
        app1.showThisSenator = app1.senators;
        console.log(this.isLoaded)
        this.isLoaded = true;
        console.log(this.isLoaded)
        console.log("Senadores", app1.senators);
      }).catch(function (error) {
        console.log("Request failed:" + error.message);
      });
    },

    filterState: function () {
      /*      var senators = data*/

      var cajita = Array.from(document.querySelectorAll('input[name=party]:checked'))
        .map(input => input.value)

      var senadoresPartidoFiltrados = this.senators.filter(senador => cajita.includes(senador.party))

      console.log("By Party:", senadoresPartidoFiltrados);

      var desplegable = document.getElementById("state").value
      console.log("mi desplegable:", desplegable);

      var senadoresEstadoFiltrados = senadoresPartidoFiltrados.filter(senador => senador.state === desplegable)

      console.log("by State", senadoresEstadoFiltrados)

      if (desplegable === "All") {
        app1.showThisSenator = senadoresPartidoFiltrados;
      } else {
        app1.showThisSenator = senadoresEstadoFiltrados;

      }
    }
  },
  beforeMount() {
    console.log(this.isLoaded)
    this.obtenerSenado();
  },

  beforeUpdate() {
    this.isLoaded = true;
  }
})
