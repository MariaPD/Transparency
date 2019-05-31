var app2 = new Vue({
  el: '#apph',
  data: {
    congresistas: {},
    showThisCongresista: [],
    isLoaded: false
  },
  methods: {
    
    obtenerHouse: function () {
      fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
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
        app2.congresistas = json.results[0].members;
        app2.showThisCongresista = json.results[0].members;
        this.isLoaded = true;
        console.log(this.isLoaded)
        console.log("Congresistas222", app2.showThisCongresista);
      }).catch(function (error) {
        console.log("Request failed:" + error.message);
      });
    },
    
    filterState: function () {
      /*var congresistas = data  */
      var cajita = Array.from(document.querySelectorAll('input[name=party]:checked'))
        .map(input => input.value)

      console.log("mi cajita:", cajita);

      var congresistasPartidoFiltrados = this.congresistas.filter(congresista => cajita.includes(congresista.party))

      var desplegable = document.getElementById("state").value
      console.log("mi desplegable:", desplegable);

      var congresistasEstadoFiltrados = congresistasPartidoFiltrados.filter(congresista => congresista.state === desplegable)


      if (desplegable === "All") {
        app2.showThisCongresista = congresistasPartidoFiltrados;
      } else {
        app2.showThisCongresista = congresistasEstadoFiltrados;
      }
    }

  },
  beforeMount() {
    console.log(this.isLoaded)
    this.obtenerHouse();
  },

  beforeUpdate() {
    this.isLoaded = true;
  }
})
