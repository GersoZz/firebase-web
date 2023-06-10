const database = firebase.database();

const botonGen = document.getElementById("boton");
const divDatos = document.getElementById("datos");
const divLoading = document.getElementById("divLoading");
console.log(botonGen);

botonGen.addEventListener("click", async () => {
  const co2_value = Math.floor(Math.random() * 50 + 700);
  const tem_value = Math.floor(Math.random() * 3 + 20);
  const hum_value = Math.floor(Math.random() * 100 + 1000);

  const timeResponse = await fetch("https://worldtimeapi.org/api/timezone/America/Lima");

  const time = await timeResponse.json();

  console.log(time.datetime);

  const obj_values = {
    co2: co2_value,
    tem: tem_value,
    hum: hum_value,
    time: time.datetime,
  };

  console.log(obj_values);

  database.ref("cai").push().set(obj_values);
});

// botonGen.click();

/* Leer datos */
var starCountRef = database.ref("cai");

starCountRef.on("child_added", (snapshot) => {
  const data = snapshot.val();
  console.log(data);
//   divDatos.innerHTML += `${data.co2} - ${data.tem}- ${data.time.split("T")[0]} <br>`;
  gaugeDraw(data.co2);
  divLoading.innerHTML = "";
});

/* Chart.JS */

const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Peru", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [1, 19, 3, 5, 2, 3],
        borderWidth: 10,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

function gaugeDraw(value) {
  var gauge = new RadialGauge({
    renderTo: "canvas-id",
    width: 300,
    height: 300,
    units: "CO2",
    minValue: 0,
    maxValue: 1500,
    majorTicks: [
      "0",
      "100",
      "200",
      "300",
      "400",
      "500",
      "600",
      "700",
      "800",
      "900",
      "1000",
      "1100",
      "1200",
      "1300",
      "1400",
      "1500",
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
      { from: 0, to: 800, color: "SeaGreen" },
      { from: 1000, to: 1500, color: "rgba(200, 50, 50, .75)" },
      { from: 800, to: 1000, color: "orange" },
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear",
    value: value,
  }).draw();
}
