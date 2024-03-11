import React, {useState, useEffect} from "react";
import {VictoryChart, VictoryScatter, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryLegend} from "victory";
// import chartThreeData from "../../../data/chart_three"; // This should point to the actual file location
import chartThreeData from "../../../data/data_clean-chart3.json";



// Define a set of colors for the chart
const customColors = [
    "#4E79A7", "#A0CBE8", "#F28E2B", "#FFBE7D", "#59A14F", "#8CD17D",
    "#B6992D", "#499894", "#86BCB6", "#E15759", "#FF9D9A", "#79706E",
    "#BAB0AC", "#D37295", "#FABFD2", "#B07AA1", "#FFAFF9", "#EDC948",
    "#BDC6E1", "#9D7660",
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
    const [colorMap, setColorMap] = useState({}); // Define colorMap in the component state

    useEffect(() => {
        // Extract unique party names
        const parties = [...new Set(chartThreeData.map(item => item.PoliticalParty))];
        setUniqueParties(parties);

        // Map parties to colors
        const newColorMap = parties.reduce((acc, party, index) => {
            acc[party] = customColors[index % customColors.length];
            return acc;
        }, {});
        setColorMap(newColorMap); // Update the colorMap state

        // Transform the data for plotting
        const transformedData = chartThreeData.map(item => ({
            x: educationLevels.indexOf(item.Education_Level) + 1,
            y: ethnicityOrder.indexOf(item.A4) + 1,
            size: item.BubbleSize / 1000, // Adjust size scaling as needed
            label: `${item.PoliticalParty}: ${item.Support}`,
            fill: newColorMap[item.PoliticalParty], // Use the newColorMap for the fill
        }));

        setProcessedData(transformedData);
    }, []);

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
        >
            <VictoryScatter
                data={processedData}
                size={(datum) => datum.size}
                style={{
                    data: { fill: (datum) => datum.fill },
                    labels: { fontSize: 10, fill: "black" },
                }}
                labelComponent={<VictoryTooltip />}
            />
            <VictoryAxis
                tickValues={educationLevels.map((_, index) => index + 1)}
                tickFormat={educationLevels}
                style={{
                    tickLabels: { angle: -45, fontSize: 8, textAnchor: "end" },
                }}
            />
            <VictoryAxis
                dependentAxis
                tickValues={ethnicityOrder.map((_, index) => index + 1)}
                tickFormat={ethnicityOrder}
                style={{
                    tickLabels: { fontSize: 8 },
                }}
            />
            <VictoryLegend
                x={250}
                y={50}
                title="Political Parties"
                orientation="vertical"
                gutter={20}
                style={{
                    title: { fontSize: 10 },
                    labels: { fontSize: 9 }
                }}
                colorScale={Object.values(colorMap)}
                data={uniqueParties.map(party => ({ name: party }))}
            />
        </VictoryChart>
    );
};

export default BubbleChartComponent;