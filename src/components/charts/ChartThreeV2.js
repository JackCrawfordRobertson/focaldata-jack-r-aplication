import React, {useState, useEffect} from "react";
import {
    VictoryChart,
    VictoryScatter,
    VictoryAxis,
    VictoryTheme,
    VictoryTooltip,
    VictoryLegend,
    VictoryTransition,
} from "victory";
import Slider from "@mui/material/Slider";
import chartThreeData from "../../../data/data_clean-chart3.json";

// Define a set of colors for the chart
const customColors = [
    "#4E79A7",
    "#A0CBE8",
    "#F28E2B",
    "#FFBE7D",
    "#59A14F",
    "#8CD17D",
    "#B6992D",
    "#499894",
    "#86BCB6",
    "#E15759",
    "#FF9D9A",
    "#79706E",
    "#BAB0AC",
    "#D37295",
    "#FABFD2",
    "#B07AA1",
    "#FFAFF9",
    "#EDC948",
    "#BDC6E1",
    "#9D7660",
];

const partyOrder = [
    "The Conservative Party",
    "The Labour Party",
    "Green Party",
    "Liberal Democrats",
    "Reform UK", // formerly the Brexit Party
    "Scottish National Party",
    "Plaid Cymru",
    "I would not vote",
    "Don’t know",
    "Other"
];

// You would have to define the following arrays according to the actual data
const ethnicityOrder = [
    "Asian or Asian British",
    "Black or Black British",
    "Chinese",
    "Mixed",
    "Other ethnic group",
    "Prefer not to say",
    "White",
    // ... any other ethnicities as per your data
];

const educationLevels = [
    "1-4 GCSEs",
    "5+ GCSEs",
    "Apprenticeship",
    "2+ A-levels",
    "Bachelor+",
    "No Qualifications",
    "Other Qualifications",
    "Professional Qualifications",
    // ... any other education levels as per your data
];

const BubbleChartComponent = () => {
    const [processedData, setProcessedData] = useState([]);
    const [uniqueParties, setUniqueParties] = useState([]);
    const [colorMap, setColorMap] = useState({});
    const [selectedPartyIndex, setSelectedPartyIndex] = useState(0);
    const [updateKey, setUpdateKey] = useState(0);

    useEffect(() => {
        // Sort and filter the parties based on the predefined order
        const sortedAndFilteredParties = partyOrder.filter(party => chartThreeData.some(item => item.PoliticalParty === party));

        setUniqueParties(sortedAndFilteredParties);

        const colorMap = sortedAndFilteredParties.reduce((acc, party, index) => {
            acc[party] = customColors[index % customColors.length];
            return acc;
        }, {});
        setColorMap(colorMap);

        updateChartData(sortedAndFilteredParties[selectedPartyIndex]);
    }, [selectedPartyIndex]);

    const updateChartData = (selectedParty) => {
        const filteredData = chartThreeData.filter((item) => item.PoliticalParty === selectedParty);
        const transformedData = filteredData.map((item) => ({
            x: educationLevels.indexOf(item.Education_Level) + 1,
            y: ethnicityOrder.indexOf(item.A4) + 1,
            size: item.BubbleSize / 400,
            label: `${item.PoliticalParty}: ${item.Support}`,
            fill: colorMap[item.PoliticalParty],
        }));

        setProcessedData(transformedData);
    };

    const handleSliderChange = (event, newValue) => {
        setSelectedPartyIndex(newValue);
        setUpdateKey(prevKey => prevKey + 1); // Increment update key to force re-render
    };

    const isValidIndex = selectedPartyIndex >= 0 && selectedPartyIndex < uniqueParties.length;

    return (
        <>
            <Slider
                min={0}
                max={uniqueParties.length - 1}
                value={selectedPartyIndex}
                onChange={handleSliderChange}
                valueLabelDisplay="auto"
                aria-labelledby="party-selector-slider"
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
                marks={uniqueParties.map((party, index) => ({
                    value: index,
                }))}
            />

            <div style={{margin: "0 0 30px"}}>
                {isValidIndex
                    ? `Viewing data for: ${uniqueParties[selectedPartyIndex]}`
                    : "Please select a valid entry."}
            </div>

            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={40}
                width={600} // Adjust width as needed
                height={400} // Adjust height as needed
                padding={{top: 20, bottom: 110, left: 120, right: 0}}
            >
                <VictoryAxis
                    tickValues={educationLevels.map((_, index) => index + 1)}
                    tickFormat={educationLevels}
                    style={{
                        tickLabels: {angle: -45, fontSize: 10, textAnchor: "end"},
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickValues={ethnicityOrder.map((_, index) => index + 1)}
                    tickFormat={ethnicityOrder}
                    style={{
                        tickLabels: {fontSize: 10},
                    }}
                />
                {/* <VictoryLegend
                    x={250}
                    y={50}
                    title="Political Parties"
                    orientation="vertical"
                    gutter={20}
                    style={{
                        title: { fontSize: 10 },
                        labels: { fontSize: 8 },
                    }}
                    colorScale={Object.values(colorMap)}
                    data={uniqueParties.map(party => ({ name: party }))}
                /> */}
                <VictoryScatter
                    key={updateKey} // Use updateKey as key
                    data={processedData}
                    size={(datum) => datum.size}
                    style={{
                        data: {
                            fill: "#6babf299", // Ensure this directly references the color
                        },
                        labels: {fontSize: 8, fill: "black"},
                    }}
                    labelComponent={<VictoryTooltip />}
                    animate={{
                        onExit: {
                            duration: 500,
                            before: () => ({opacity: 0.3, _y: 0}),
                        },
                        onEnter: {
                            duration: 500,
                            before: () => ({opacity: 0.3, _y: 0}),
                            after: (datum) => ({opacity: 1, _y: datum._y}),
                        },
                    }}
                />
            </VictoryChart>
        </>
    );
};

export default BubbleChartComponent;
