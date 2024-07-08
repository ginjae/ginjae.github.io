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
  .append("div")
  .attr("class", "info")
  .style("opacity", "70%")
  .style("left", "15px")
  .style("top", "15px")
  // .style("top", (height - height_details) + "px")
  // .style("width", width_details + "px")
  .style("background-color", "black")
  .style("border-radius", "10px")
  .style("padding", "10px")
  .style("color", "white")
  .style("display", "inline")
  .style("position", "absolute")
  .style("font-size", "15px")
  .style("line-height", "150%")
  .call(d3.drag()
    .on("drag", function(event, d) {
      const w = Number(d3.select(this).style("width").slice(0, -2));
      const h = Number(d3.select(this).style("height").slice(0, -2));
      const newX = Math.min(width - w - 20, Math.max(15, (event.dx + Number(d3.select(this).style("left").slice(0, -2)))));
      const newY = Math.min(height - h - 20, Math.max(15, (event.dy + Number(d3.select(this).style("top").slice(0, -2)))));
      d3.select(this)
        .style("left", newX + "px")
        .style("top", newY + "px");
    })
);

function repositionInfo() {
  const w = Number(d3.select(".info").style("width").slice(0, -2));
  const h = Number(d3.select(".info").style("height").slice(0, -2));
  const newX = Math.min(width - w - 20, Number(d3.select(".info").style("left").slice(0, -2)));
  const newY = Math.min(height - h - 20, Number(d3.select(".info").style("top").slice(0, -2)));
  d3.select(".info")
    .style("left", newX + "px")
    .style("top", newY + "px")
}

info.html("<b>상세정보</b><br>[읍, 면, 동] 선택 후, 사업장을 선택해주세요.");