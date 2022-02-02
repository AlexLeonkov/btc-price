const btn = document.getElementById("submit");

let start;
let end;
let chartData;
let chartDates;
let btcPrice;

const chart = new Chart(document.getElementById("line-chart"), {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        label: "BTC-PRICE",
        borderColor: "#3e95cd",
        fill: false,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "World population per region (in millions)",
    },
  },
});
const getHistory = async () => {
  start = document.getElementById("start").value;
  end = document.getElementById("end").value;

  const res = await fetch(
    `https://api.coindesk.com/v1/bpi/historical/close.json?start=${start}&end=${end}&index=[USD]`
  );
  const result = await res.json();
  return result.bpi;
};

const graficRender = async () => {
  chartData = await getHistory();

  chartDates = Object.keys(chartData);
  btcPrice = Object.values(chartData);

  chart.data.labels = chartDates;
  chart.data.datasets[0].data = btcPrice;
  chart.update();

  console.log(btcPrice);
  console.log(chartDates);
};

btn.addEventListener("click", graficRender);
