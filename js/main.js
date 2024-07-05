const sandwiches = [
  { name: "Thesis", price: 7.95, size: "large" },
  { name: "Dissertation", price: 8.95, size: "large" },
  { name: "Highlander", price: 6.50, size: "small" },
  { name: "Just Tuna", price: 6.50, size: "small" },
  { name: "So-La", price: 7.95, size: "large" },
  { name: "Special", price: 12.50, size: "small" }
];

// Add <svg> element (drawing space)
const svg = d3.select('body').append('svg')
    .attr('width', 500)
    .attr('height', 500);

// Add rectangle
svg.selectAll('circle')
    .data(sandwiches)
    .enter()
  .append('circle')
    .attr('fill',  d => {
      if (d.price < 7.00)
        return 'green';
      return 'yellow';
    })
    .attr('stroke', 'black')
    .attr('r', d => {
      if (d.size === "large")
        return 20;
      return 10;
    })
    .attr('cy', 30)
    .attr('cx', (d, index) => 30 + index * 60);