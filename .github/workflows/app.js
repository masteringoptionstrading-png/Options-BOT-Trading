document.getElementById("csvFile").addEventListener("change", function(e) {
const file = e.target.files[0];

Papa.parse(file, {
header: true,
complete: function(results) {
processData(results.data);
}
});
});

function processData(data) {

let total = 0;
let wins = 0;
let daily = {};

data.forEach(r => {
let pl = parseFloat(r["P/L in $"].replace(/[$,]/g, ""));
total += pl;

if (pl > 0) wins++;

if (!daily[r.Date]) daily[r.Date] = 0;
daily[r.Date] += pl;
});

document.getElementById("kpiTotal").innerText = "$" + total;
document.getElementById("kpiTrades").innerText = data.length;
document.getElementById("kpiWin").innerText = ((wins/data.length)*100).toFixed(1)+"%";

let green = 0, red = 0;

Object.values(daily).forEach(v => {
if (v > 0) green++;
else red++;
});

document.getElementById("kpiGreen").innerText = green;
document.getElementById("kpiRed").innerText = red;

let totalDays = green + red;

document.getElementById("winDayRate").innerText =
((green/totalDays)*100).toFixed(0)+"%";

document.getElementById("greenBar").style.width =
(green/totalDays)*100 + "%";

document.getElementById("redBar").style.width =
(red/totalDays)*100 + "%";
}
