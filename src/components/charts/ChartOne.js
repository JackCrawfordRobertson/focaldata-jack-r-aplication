import React, {useState} from "react";
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel, VictoryTooltip} from "victory";
import {Slider, Box} from "@mui/material";
import chart_one from "../../../data/chart_one";

// Example color array (add more colors as needed)
const colors = [
    "#ebf4fd99",
    "#1c8e3e99",
    "#ebf4fd99",
    "#ffce3e99",
    "#f5f5f599",
    "#4aae3599",
    "#2b9e8b99",
    "#a3357199",
    "#1f5eaa99",
    "#c11c2599",
];

const customTooltipStyles = {
    style: {fontSize: 6, fill: "black"}, // Text styling
    flyoutStyle: {
        stroke: "#6babf2",
        strokeWidth: 1,
        fill: "white", // Background color of the tooltip
    },
};

const EducationChart = () => {
    const [ selectedIndex, setSelectedIndex ] = useState(0);
    const isValidIndex = selectedIndex >= 0 && selectedIndex < chart_one.length;
    const selectedData = isValidIndex
        ? Object.entries(chart_one[selectedIndex])
          .filter(([ key, _ ]) => key !== "Educational Achievement")
          .map(([ key, value ], index) => ({
              y: key,
              x: value,
              color: colors[index % colors.length],
          }))
          .sort((a, b) => b.x - a.x)
        : [];

    const handleSliderChange = (event, newValue) => {
        setSelectedIndex(newValue);
    };

    return (
        <Box sx={{ padding: "0", paddingTop: '0px' }}>
            <Slider
                min={1}
                max={chart_one.length - 1}
                value={selectedIndex}
                onChange={handleSliderChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                sx={{
                    width: "100%",
                     
                    "& .MuiSlider-thumb": {
                        color: "#6babf2", // Changes the thumb color
                    },
                    "& .MuiSlider-track": {
                        color: "#6babf2", // Changes the track color
                    },
                    "& .MuiSlider-rail": {
                        color: "#b2dffb", // Optionally changes the rail color to a lighter shade for contrast
                    },
                    "& .MuiSlider-mark": {
                        color: "#6babf2", // Changes the mark color
                    },
                    "& .MuiSlider-markLabel": {
                        color: "#6babf2", // Optionally changes the mark label color if you're using labels
                    },
                }}
                marks={chart_one.map((_, index) => ({value: index}))}
                step={null}
            />
            <div style={{margin: "0 0  30px",  }}>
                {isValidIndex
                    ? `Viewing data for: ${chart_one[selectedIndex]["Educational Achievement"]}`
                    : "Please select a valid entry."}
            </div>
            <VictoryChart
                domainPadding={20}
                theme={VictoryTheme.material}
                animate={{duration: 500}}
                style={{parent: {border: "0px solid #ccc"}}}
                padding={{left: 80, bottom: 20, right:10}} // Adjust left padding as needed
            >
                <VictoryAxis
                    dependentAxis
                    tickLabelComponent={<VictoryLabel angle={0} />}
                    style={{tickLabels: {fontSize: 6, padding: 5}}}
                />
                <VictoryAxis style={{tickLabels: {fontSize: 6, padding: 5}}} />
                <VictoryBar
                    data={selectedData}
                    horizontal
                    x="y"
                    y="x"
                    style={{
                        data: {fill: ({datum}) => datum.color}, // Use color from each datum
                    }}
                    labels={({datum}) => `${datum.y}: ${datum.x}`}
                    labelComponent={
                        <VictoryTooltip
                            {...customTooltipStyles}
                            cornerRadius={5} // Adjust for rounded corners
                            pointerLength={5} // Adjust pointer length
                        />
                    }
                />
            </VictoryChart>
            
        </Box>
    );
};

export default EducationChart;
