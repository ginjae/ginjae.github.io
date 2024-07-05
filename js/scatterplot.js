class ScatterPlot {
  constructor() {
    this.data = null;
    this.xScale = null;
    this.yScale = null;
  }

  initData(data) {
    try {
      this.data = data;
      // console.log(data);
      this.drawScatterPlot(data);
    }
    catch(error) {
      console.error(error);
    }
  }

  drawScatterPlot(data) {
    var category = d3.map(data, function(d) { return d["업태구분명"]; });

    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => { return d["좌표정보(x)"]; }))
      .range([192, 655]);
    this.xScale = xScale;
    // console.log(xScale(409480.516431452));  // 571
    // console.log(xScale(393737.265213606));  // 259

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => { return d["좌표정보(y)"]; }))
      .range([520, 68]);
    this.yScale = yScale;

    const cScale = d3.scaleOrdinal()
      .domain(category)
      .range(["#4E79A7", "#7B848F", "#A0CBE8", "#F28E2B", "#FFBE7D", "#59A14F", "#8CD17D", "#B6992D", "#F1CE63", "#499894", "#86BCB6",
        "#E15759", "#FF9D9A", "#79706E", "#BAB0AC", "#D37295", "#FABFD2", "#B07AA1", "#D4A6C8", "#9D7660", "#D7B5A6"]);

    d3.select("#maps")
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", d => {
        for (var region of regions) {
          if (d['소재지전체주소'].includes(region)) {
            return "dot" + region;
          }
        }
      })
      // .attr("opacity", "0")
      .attr("cx", d => { return xScale(d["좌표정보(x)"]); })
      .attr("cy", d => { return yScale(d["좌표정보(y)"]); })
      .attr("r", "1")
      .attr("fill", d => { return cScale(d["업태구분명"]); })
      .attr("pointer-events", "none");
      // .on("click", function(d) {
      //   console.log(d.target.__data__);
      // });
      
  }

  updateScatterPlot(event) {
    const newX = event.transform.rescaleX(this.xScale);
    const newY = event.transform.rescaleY(this.yScale);
    d3.select("#maps")
      .selectAll("circle")
      .attr("cx", d => { return newX(d["좌표정보(x)"]); })
      .attr("cy", d => { return newY(d["좌표정보(y)"]); })
      .attr("r", Math.sqrt(event.transform.k));
  }
  
  filterScatterDataByRegion(regionList) {
    for (var region of regions) {
      d3.selectAll(".dot" + region).attr("opacity", "0");
    }
    for (var region of regionList) {
      d3.selectAll(".dot" + region).attr("opacity", "50");
    }
  }
}