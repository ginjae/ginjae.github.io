class ScatterPlot {
  constructor() {
    this.data = null;
    this.xScale = null;
    this.yScale = null;
    this.currentK = null;
    this.lastEvent = null;
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
      // .range([293, 755]); // 1000
      // .range([342, 805]); // 1100
      .range([192, 655]);
    this.xScale = xScale;

    const yScale = d3.scaleLinear()
      .domain(d3.extent(data, d => { return d["좌표정보(y)"]; }))
      // .range([516, 68]); // 1000
      // .range([515, 67]); // 1100
      .range([519, 70.5]);
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
      .attr("class", "not_selected")
      // .attr("display", "none")
      .style("opacity", "0")
      .attr("pointer-events", "none")
      .attr("id", d => {
        for (var region of regions) {
          if (d['소재지전체주소'].includes(region)) {
            return "dot" + region;
          }
        }
      })
      .attr("cx", d => { return xScale(d["좌표정보(x)"]); })
      .attr("cy", d => { return yScale(d["좌표정보(y)"]); })
      .attr("r", "1")
      .attr("fill", d => { return cScale(d["업태구분명"]); })
      // .attr("pointer-events", "none");
      .on("click", function(d) {
        d3.select("#maps")
          .selectAll("circle")
          .style("stroke", "none");
        d3.select(this)
          .raise()
          .style("stroke-width", 0.6 * this.currentK + "px")
          .style("stroke", "blue");
        info.html("<b>상세정보</b>" +
          "<br>사업장명: " + d.target.__data__["사업장명"] +
          "<br>구분: " + d.target.__data__["업태구분명"] +
          "<br>도로명주소: " + d.target.__data__["도로명전체주소"] +
          "<br>지번주소: " + d.target.__data__["소재지전체주소"]);
        repositionInfo();
        selected_restaurant = d.target.__data__;
      })
      .on("mouseover", function(event, d) {
        if (d3.select(this).style("stroke") !== "blue") {
          d3.select(this)
            .raise()
            .style("stroke-width", 0.6 * this.currentK + "px")
            .style("stroke", "red");
        }
      })
      .on("mouseout", function(event, d) {
        if (d3.select(this).style("stroke") !== "blue") {
          d3.select(this)
            .style("stroke", "none");
        }
      });
      
      document.getElementById("load").style.display = "none";
  }

  updateScatterPlot(event) {
    this.currentK = Math.sqrt(event.transform.k);
    const newX = event.transform.rescaleX(this.xScale);
    const newY = event.transform.rescaleY(this.yScale);
    d3.select("#maps")
      .selectAll("circle")
      // .selectAll(".selected")
      .attr("cx", d => { return newX(d["좌표정보(x)"]); })
      .attr("cy", d => { return newY(d["좌표정보(y)"]); })
      .attr("r", this.currentK)
      .style("stroke-width", 0.6 * this.currentK);
    this.currentK = event.transform.k;
    this.lastEvent = event;
  }
  
  filterScatterDataByRegion(regionList) {
    d3.selectAll("circle")
      .attr("class", "not_selected")
      .attr("pointer-events", "none")
      .transition()
      .duration(200)
      .style("opacity", "0");
    for (var region of regionList) {
      d3.selectAll("#dot" + region)
        .attr("class", "selected")
        .attr("pointer-events", "all")
        .transition()
        .duration(200)
        .style("opacity", "1");
    }
    if (this.lastEvent !== null) {
      this.updateScatterPlot(this.lastEvent);
    }
  }
}