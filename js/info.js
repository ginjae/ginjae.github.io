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
  
const info = d3.select("#map")
  .append("div")
  .attr("class", "info")
  .style("opacity", "70%")
  .style("left", "0px")
  .style("top", (height - height_details) + "px")
  .style("width", width_details + "px")
  .style("height", height_details + "px")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .style("color", "white")
  .style("display", "inline")
  .style("position", "absolute")
  .style("font-size", "15px")
  .style("line-height", "150%");

info.html("상세정보<br>사업장을 선택해주세요");