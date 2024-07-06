const width_details = 400,
  height_details = 600;

const svg_details = d3.select("#details")
  .append("svg")
  .attr("id", "details")
  .attr("width", width_details)
  .attr("height", height_details)
  .style("background-color", "gray")
  .style("border-radius", "10px")
  .style("padding", "5px")
  .append("text")
  .attr("x", 10)
  .attr("y", 30)
  .text("상세정보")