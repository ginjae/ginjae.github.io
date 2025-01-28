const width_details = 250,
  height_details = 160;

// const info = d3.select("#maps")
//   .append("div")
//   .attr("x", 150)
//   .attr("y", 150)
//   .attr("id", "info")
//   .style("background-color", "gray")
//   .style("border-radius", "10px")
//   .style("padding", "10px")
//   .style("color", "white");
  
var selectedRestaurant = null;

const drag = d3.drag()
  
const info = d3.select("#map")
  .append("rect")
  .attr("id", "info")
  .html("<b>상세정보</b><br>[읍, 면, 동] 선택 후, 사업장을 선택해주세요.")
  .style("opacity", "0.7")
  .style("background-color", "black")
  .style("border-radius", "10px")
  .style("padding", "10px")
  .style("color", "white")
  .style("display", "inline")
  .style("position", "absolute")
  .style("font-size", "15px")
  .style("line-height", "150%");
//   .call(d3.drag()
//     .on("drag", function(event, d) {
//       const l = Number(d3.select(this).style("left").slice(0, -2));
//       const t = Number(d3.select(this).style("top").slice(0, -2));
//       const w = Number(d3.select(this).style("width").slice(0, -2));
//       const h = Number(d3.select(this).style("height").slice(0, -2));
//       const m = d3.select("#maps").node().getBoundingClientRect();
//       const newX = Math.max(m.x, Math.min(m.x + m.width - w - 20, (event.dx + l)));
//       const newY = Math.max(m.y, Math.min(m.y + m.height - h - 20, (event.dy + t)));
//       d3.select(this)
//         .style("left", newX + "px")
//         .style("top", newY + "px");
//     })
// );

function repositionInfo() {
  const m = d3.select("#maps").node().getBoundingClientRect();
  d3.select("#info")
    .style("left", `${m.x + 5}px`)
    .style("top", `${m.y + 5}px`);
  // const l = Number(d3.select("#info").style("left").slice(0, -2));
  // const t = Number(d3.select("#info").style("top").slice(0, -2));
  // const w = Number(d3.select("#info").style("width").slice(0, -2));
  // const h = Number(d3.select("#info").style("height").slice(0, -2));
  // const m = d3.select("#maps").node().getBoundingClientRect();
  // const newX = Math.max(m.x, Math.min(m.x + m.width - w - 20, l));
  // const newY = Math.max(m.y, Math.min(m.y + m.height - h - 20, t));
  // d3.select("#info")
  //   .style("left", newX + "px")
  //   .style("top", newY + "px");
}
