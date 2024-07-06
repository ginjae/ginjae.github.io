class barChart {

  constructor() {
    this.data = null;
    this.categoryCounts = null;
    this.cScale = null;
  }

  initData(data) {
    try {
      var categoryCounts = [];
      var category = [];
      for (var d of data) {
        if (category.includes(d["업태구분명"])) {
          categoryCounts.find(obj => obj["category"] == d["업태구분명"]).count += 1;
        }
        else {
          categoryCounts.push({ category: d["업태구분명"], count: 1 });
          category.push(d["업태구분명"]);
        }
      }
      categoryCounts = categoryCounts.sort((a, b) => b.count - a.count);
      console.log(data);
      console.log(categoryCounts);

      this.data = data;
      this.categoryCounts = categoryCounts;
      this.cScale = d3.scaleOrdinal()
      .domain(category)
      .range(["#4E79A7", "#7B848F", "#A0CBE8", "#F28E2B", "#FFBE7D", "#59A14F", "#8CD17D", "#B6992D", "#F1CE63", "#499894", "#86BCB6",
        "#E15759", "#FF9D9A", "#79706E", "#BAB0AC", "#D37295", "#FABFD2", "#B07AA1", "#D4A6C8", "#9D7660", "#D7B5A6"]);
      this.drawBarChart(categoryCounts);
    }
    catch(error) {
      console.error(error);
    }
  }

  drawBarChart(data) {

    var category = d3.map(data, function(d) { return d.category; });

    const margin = { top: 5, right: 30, bottom: 120, left: 60 },
      width = 1200 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    const svg = d3.select("#barchart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand()
      .domain(category)
      .range([0, width]);
    
    const yScale = d3.scaleLinear()
      .domain([0, 1 + 1.1 * d3.max(data, d => { return d.count; })])
      .range([height, 0]);

    var bar = svg.append("g")
      .selectAll(".bar")
      .data(data)
      .enter();

    const bar_width = width * 0.8 / category.length;
    bar.append("rect")
      .attr("class", "bar")
      .attr("fill", d => { return this.cScale(d.category); })
      .attr("x", d => { return bar_width / 7 + xScale(d.category); })
      .attr("y", yScale(0))
      .attr("width", bar_width);
      // .attr("width", 20)
      // .attr("height", d => { return height - yScale(d.count); });
    bar.selectAll("rect")
      .transition()
      .duration(500)
      .ease(d3.easeCubicInOut)
      .attr("y", d => { return yScale(d.count); })
      .attr("height", d => { return height - yScale(d.count); });
    bar.append("text")
      .text(d => { return d.count; })
      .attr("x", d => { return bar_width / 7 + bar_width / 2 + xScale(d.category); })
      .attr("y", yScale(0))
      .attr("text-anchor", "middle")
      .attr("font-size", 10);
    bar.selectAll("text")
      .transition()
      .duration(500)
      .ease(d3.easeCubicInOut)
      .attr("y", d => { return yScale(d.count) - 3; })
      .attr("height", d => { return height - yScale(d.count); });


      const xAxis = d3.axisBottom(xScale);
      const yAxisTicks = yScale.ticks()
        .filter(tick => Number.isInteger(tick));
      const yAxis = d3.axisLeft(yScale)
        .tickValues(yAxisTicks)
        .tickFormat(d3.format('d'));

      svg.append("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis)
          .selectAll("text")
          .attr("transform", "rotate(-45)")
          .attr("text-anchor", "end");

      svg.append("g")
          .attr("class", "y-axis")
          .call(yAxis);

  }

  filterBarDataByRegion(regionList) {
    var categoryCounts = this.categoryCounts;
    categoryCounts.forEach(d => { d.count = 0; });
    if (regionList.length == 0) {
      for (var d of this.data) {
        categoryCounts.find(obj => obj["category"] == d["업태구분명"]).count += 1;
      }
      categoryCounts = categoryCounts.sort((a, b) => b.count - a.count);
      d3.select("#barchart").select("svg").remove();
      bar.drawBarChart(categoryCounts)
    }
    else {
      var filteredData = this.data.filter(d => {
        var isSelected = false;
        for (var region of regionList) {
          if (d['소재지전체주소'].includes(region)) {
            isSelected = true;
            break;
          }
        }
        return isSelected;
      })
      for (var d of filteredData) {
        categoryCounts.find(obj => obj["category"] == d["업태구분명"]).count += 1;
      }
      categoryCounts = categoryCounts.sort((a, b) => b.count - a.count);
      d3.select("#barchart").select("svg").remove();
      bar.drawBarChart(categoryCounts)
    }
  }
}