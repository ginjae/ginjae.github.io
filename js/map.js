const margin = { top: 5, right: 30, bottom: 120, left: 120 },
  width = 800,
  height = 600;

const svg = d3.select("#map")
  .append("svg")
  .attr("id", "maps")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "#FAFAFA");

//const getColor = () => "#" + Math.round(Math.random() * 0xffffff).toString(16);

// const clip = svg.append("defs").append("clipPath")
//   .attr("id", "clip")
//   .append("rect")
//   .attr("width", width)
//   .attr("height", height);

const zoom = d3.zoom()
  .scaleExtent([.5, 10000])
  .on("zoom", updateMap);

// svg.append("rect")
//   .attr("width", width)
//   .attr("height", height)
//   .style("fill", "black")
//   .style("pointer-events", "all")
//   .call(zoom);

svg.call(zoom)
  .on("dblclick.zoom", null);

const projection = d3.geoMercator()
  .center([129.2270222, 35.85316944])
  .scale(50000)
  // .scale(100000)
  .translate([width / 2, height / 2]);

const geoPath = d3.geoPath().projection(projection);

var regions = [];
var selectedRegion = [];

d3.json("data/Gyeongju.geojson").then((data) => {
  regions = data.features.map(d => { return d.properties.EMD_KOR_NM; });
  regions.sort((a, b) => b.length - a.length);
  d3.select("#maps")
    // .append("g")
    // .attr("clip-path", "url(#clip)")
    .append("g")
    .selectAll("path")
    .data(data.features)
    .enter()
    .append("path")
    .attr("fill", "#EAEAEA")
    .attr("fill-opacity", "0.4")
    .attr("d", geoPath)
    .attr("class", d => { return d.properties.EMD_KOR_NM; })
    .attr("transform", "rotate(-1.5,400,300)")
    .style("stroke", "black")
    .style("stroke-width", "0.3px")
    .on("click", function(event, d) {
      const isSelected = d3.select(this).attr("class") === d.properties.EMD_KOR_NM + "selected";
      if (isSelected) {
        d3.select(this).attr("class", d.properties.EMD_KOR_NM);
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "#EAEAEA");
          // .attr("fill", "steelblue");
        selectedRegion.splice(selectedRegion.indexOf(d.properties.EMD_KOR_NM), 1);
        scatter.RemoveDotsByRegion(d.properties.EMD_KOR_NM);

        if (selectedRestaurant !== null) {
          if (selectedRestaurant["소재지전체주소"].includes(d.properties.EMD_KOR_NM)) {
            selectedRestaurant = null;
            d3.select("#maps")
              .selectAll("#dot" + d.properties.EMD_KOR_NM)
              .style("stroke", "none");
          }
        }
      }
      else {
        d3.select(this).attr("class", d.properties.EMD_KOR_NM + "selected");
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill", "steelblue");
          // .attr("fill", "purple");
        selectedRegion.push(d.properties.EMD_KOR_NM);
        scatter.AddDotsByRegion(d.properties.EMD_KOR_NM, true);
      }

      if (selectedRestaurant === null) {
        if (selectedRegion.length === 0) {
          info.html("<b>상세정보</b><br>[읍, 면, 동] 선택 후, 사업장을 선택해주세요.");
          repositionInfo();
        }
        else {
          info.html("<b>상세정보</b><br> 사업장을 선택해주세요.");
          repositionInfo();
        }
      }
      bar.filterBarDataByRegion(selectedRegion);
      // scatter.filterScatterDataByRegion(selectedRegion);
    })
    .on("mouseover", function(event, d) {
      showTooltip(event, d);
      const isSelected = d3.select(this).attr("class") === d.properties.EMD_KOR_NM + "selected";
      d3.select(this)
        .raise()
        .style("stroke-width", "0.6px")
        .style("stroke", "red");
      scatter.AddDotsByRegion(d.properties.EMD_KOR_NM, false);
      // if (isSelected)
      //   d3.select(this).attr("fill", "purple");
      // else 
      //   d3.select(this).attr("fill", "steelblue");
    })
    .on("mousemove", moveTooltip)
    .on("mouseout", function(event, d) {
      hideTooltip(event, d);
      const isSelected = d3.select(this).attr("class") === d.properties.EMD_KOR_NM + "selected";
      d3.select(this)
        .style("stroke-width", "0.3px")
        .style("stroke", "black");
      if (!isSelected) {
        scatter.RemoveDotsByRegion(d.properties.EMD_KOR_NM);
      }
      // if (isSelected)
      //   d3.select(this).attr("fill", "red");
      // else 
      //   d3.select(this).attr("fill", "#EAEAEA");
    });

});

function updateMap(event) {
  d3.select("#maps")
    .selectAll("path")
    .attr("transform", event.transform + "rotate(-1.5,400,300)");

  tooltip
    .style("left", (event.sourceEvent.clientX + 10) + "px")
    .style("top", (event.sourceEvent.clientY + 10) + "px");

  scatter.updateScatterPlot(event);
}


const tooltip = d3.select("#map")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "black")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .style("color", "white")
  .style("display", "inline")
  .style("position", "fixed")
  .style("pointer-events", "none")
  .style("font-size", "10px");

function showTooltip(event, d) {
  tooltip
    .transition()
    .duration(10)
    .style("opacity", 1);
  tooltip
    .html(d.properties.EMD_KOR_NM)
    .style("left", (event.clientX + 10) + "px")
    .style("top", (event.clientY + 10) + "px");
}

function moveTooltip(event, d) {
  tooltip
    .style("left", (event.clientX + 10) + "px")
    .style("top", (event.clientY + 10) + "px");
}

function hideTooltip(event, d) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0);
}