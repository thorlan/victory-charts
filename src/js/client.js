import React from "react";
import ReactDOM from "react-dom";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryGroup,
  VictoryLabel,
  VictoryZoomContainer,
  VictoryBrushContainer,
} from "victory";

const dataLine = [
  { x: 1, y: 1550, tag: "Total" },
  { x: 2, y: 850, tag: "Total" },
  { x: 3, y: 2000, tag: "Total" },
  { x: 4, y: 200, tag: "Total" },
];

const getLabelTeste = (e) => {
  console.log(e);
  if (e.tag == "Total") {
    return e.y;
  }
  return e.tag + ":" + e.y;
};

const handleScroll = (event) => {
  if (event.deltaY > 0) {
    this.decreaseValue()
  } else {
    this.increaseValue()
  }
}

const enableScroll = () => {
  document.removeEventListener('wheel', preventDefault, false)
}

const disableScroll = () => {
  document.addEventListener('wheel', preventDefault, {
    passive: false,
  })
}

const preventDefault = (e) => {
  e = e || window.event
  if (e.preventDefault) {
    e.preventDefault()
  }
  e.returnValue = false
}

class Main extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    return (
      <div
        style={{ maxWidth: "1300px", maxHeight: "300px" }}
        //onWheel={handleScroll}
        onMouseEnter={disableScroll}
        onMouseLeave={enableScroll}
      >
        <VictoryChart
          padding={70}
          width={550}
          height={500}
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryZoomContainer
              responsive={false}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x / 1000}k`} />

          <VictoryGroup
            offset={19}
            colorScale={"qualitative"}
            categories={{ x: ["jan", "fev", "marc", "abril"] }}
          >
            <VictoryBar
              style={{
                labels: { fill: "black", fontSize: "5px" },
              }}
              labels={getLabelTeste}
              labelComponent={<VictoryLabel dy={5} dx={2} />}
              data={[
                { x: 1, y: 1000, tag: "MD" },
                { x: 2, y: 200, tag: "MD" },
                { x: 3, y: 300, tag: "MD" },
                { x: 4, y: 0, tag: "MD" },
              ]}
            />
            <VictoryBar
              labels={getLabelTeste}
              labelComponent={<VictoryLabel dy={5} />}
              style={{
                labels: { fill: "black", fontSize: "5px" },
              }}
              data={[
                { x: 1, y: 200, tag: "MB" },
                { x: 2, y: 200, tag: "MB" },
                { x: 3, y: 700, tag: "MB" },
                { x: 4, y: 0, tag: "MB" },
              ]}
            />
            <VictoryBar
              labels={getLabelTeste}
              labelComponent={<VictoryLabel dy={5} />}
              style={{
                labels: { fill: "black", fontSize: "5px" },
              }}
              data={[
                { x: 1, y: 350, tag: "EB" },
                { x: 2, y: 450, tag: "EB" },
                { x: 3, y: 1000, tag: "EB" },
                { x: 4, y: 200, tag: "EB" },
              ]}
            />

            <VictoryBar
              labels={getLabelTeste}
              labelComponent={<VictoryLabel dy={5} />}
              style={{
                labels: { fill: "black", fontSize: "5px" },
              }}
              data={[
                { x: 1, y: 150, tag: "FAB" },
                { x: 2, y: 850, tag: "FAB" },
                { x: 3, y: 300, tag: "FAB" },
                { x: 4, y: 200, tag: "FAB" },
              ]}
            />
          </VictoryGroup>

          <VictoryGroup data={dataLine}>
            <VictoryLine
              style={{
                data: {
                  stroke: "black",
                  strokeWidth: 1,
                },
                //labels: { fill: "black" },
              }}
            />
            <VictoryScatter
              size={2}
              style={{
                data: { fill: "black" },
                labels: {
                  fill: "blue",
                  border: "white",
                  fontSize: "8px",
                },
              }}
              labelComponent={<VictoryLabel dy={22} dx={5} />}
              labels={getLabelTeste}
            />
          </VictoryGroup>
        </VictoryChart>

        <VictoryChart
          width={550}
          height={90}
          scale={{ x: "time" }}
          padding={{ top: 10, right: 50, left: 50, bottom: 30 }}
          containerComponent={
            <VictoryBrushContainer
              allowDrag={false}
              allowDraw={false}
              allowResize={false}
              responsive={false}
              brushDimension="x"
              brushDomain={this.state.selectedDomain}
              onBrushDomainChange={this.handleBrush.bind(this)}
              brushStyle={{ fill: "teal", opacity: 0.2 }}
            />
          }
        >
          <VictoryAxis
            tickValues={["jan", "fev", "marc", "abril"]}
            //tickFormat={["jan", "fev", "marc", "abril"]}
          />

          {/* <VictoryGroup
            offset={14}
            colorScale={"qualitative"}
            categories={{ x: ["jan", "fev", "marc", "abril"] }}
          >
            <VictoryBar
              data={[
                { x: 1, y: 1000, tag: "MD" },
                { x: 2, y: 200, tag: "MD" },
                { x: 3, y: 300, tag: "MD" },
                { x: 4, y: 0, tag: "MD" },
              ]}
            />
            <VictoryBar
              data={[
                { x: 1, y: 200, tag: "MB" },
                { x: 2, y: 200, tag: "MB" },
                { x: 3, y: 700, tag: "MB" },
                { x: 4, y: 0, tag: "MB" },
              ]}
            />
            <VictoryBar
              data={[
                { x: 1, y: 350, tag: "EB" },
                { x: 2, y: 450, tag: "EB" },
                { x: 3, y: 1000, tag: "EB" },
                { x: 4, y: 200, tag: "EB" },
              ]}
            />

            <VictoryBar
              data={[
                { x: 1, y: 150, tag: "FAB" },
                { x: 2, y: 850, tag: "FAB" },
                { x: 3, y: 300, tag: "FAB" },
                { x: 4, y: 200, tag: "FAB" },
              ]}
            />
          </VictoryGroup> */}

          <VictoryGroup data={dataLine}>
            <VictoryLine
              size={1}
              style={{
                data: {
                  stroke: "black",
                },
              }}
            />
            <VictoryScatter
              size={2}
              style={{
                data: { fill: "black" },
              }}
            />
          </VictoryGroup>
        </VictoryChart>
      </div>
    );
  }
}

const app = document.getElementById("app");
ReactDOM.render(<Main />, app);
