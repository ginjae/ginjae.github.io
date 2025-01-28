
function changeDirection() {
    const width = window.innerWidth;
    const target = d3.select("#charts");
    if (width > 1600) {
        target.style("flex-direction", "row")
            .style("justify-content", "center")
            .style("height", "100dvh");
    } else if (width > 1200) {
        target.style("flex-direction", "row")
            .style("justify-content", "start")
            .style("height", "100dvh");
    } else if (width > 800) {
        target.style("flex-direction", "column")
            .style("justify-content", "center")
            .style("height", "100dvh");
        if (window.innerHeight < 1200) {
            target.style("justify-content", "start");
        } else {
            target.style("justify-content", "center");
        }
    } else {
        target.style("flex-direction", "column")
            .style("justify-content", "start")
            .style("height", "100dvh");
        if (window.innerHeight < 1200) {
            target.style("justify-content", "start");
        } else {
            target.style("justify-content", "center");
        }
    }
    repositionInfo();
}
changeDirection();
window.addEventListener("resize", changeDirection)


const bar = new barChart();
const scatter = new ScatterPlot();

d3.csv("data/6470000_경상북도_07_24_04_P_일반음식점.csv").then(data => {

    // Data preprocessing
    //console.log(data);
    var filteredData = data.filter(d => {
        return d["소재지전체주소"].includes("경상북도 경주시") &&
            d["상세영업상태명"].includes("영업") &&
            d["좌표정보(x)"] != 0 && d["좌표정보(y)"] != 0;
    })
    // console.log(regions);
    filteredData = filteredData.filter(d => {
        var isIn = false;
        for (var r of regions) {
            if (d["소재지전체주소"].includes(r)) {
                isIn = true;
                break;
            }
        }
        return isIn;
    })
    //console.log(filteredData);

    var categoryCounts = [];
    var category = [];
    for (var d of data) {
    if (category.includes(d["업태구분명"])) {
        categoryCounts.find(obj => obj["업태구분명"] == d["업태구분명"]).count += 1;
    }
    else {
        categoryCounts.push({ "업태구분명": d["업태구분명"], count: 1 });
        category.push(d["업태구분명"]);
    }
    }
    // var categoryCounts = filteredData.reduce((acc, obj) => {    // acc: accumulator 이전 콜백 함수 실행의 결과를 포함 & 최종 결과로 리턴
    //     const category = obj['업태구분명'];
    //     if (acc[category]) {
    //         acc[category]++;
    //     } else {
    //         acc[category] = 1;
    //     }
    //     return acc;
    //     }, {});
    
    // console.log(categoryCounts);

    bar.initData(filteredData);
    scatter.initData(filteredData);

 })
     .catch(error => {
         console.error(error);
     });
