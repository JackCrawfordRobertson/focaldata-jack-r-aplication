import React from "react";
import {ResponsiveScatterPlot} from "@nivo/scatterplot";
import chart_three from "../../../data/chart_three"; // Ensure the path is correct

// Define colors for each party
const partyColors = {
    "The Labour Party": "#E63946",
    "The Conservative Party": "#1D3557",
    "Liberal Democrats": "#F4A261",
    "Green Party": "#2A9D8F",
    "Don’t know": "#6D6875",
    // Add more parties and their colors as needed
};

const educationLevels = [
    "No Qualifications",
    "1-4 GCSEs",
    "5+ GCSEs",
    "Apprenticeship",
    "2+ A-levels",
    "Bachelor's degree or higher",
    "Professional qualifications",
    "Other qualifications",
];

const ethnicityOrder = [
    "White",
    "Mixed",
    "Asian or Asian British",
    "Black or Black British",
    "Chinese",
    "Other ethnic group",
    "Prefer not to say",
];

// Map your groups (education levels) to index positions
const groupToIndex = (group) => educationLevels.indexOf(group);

// Map your ethnicities to index positions
const ethnicityToIndex = (ethnicity) => ethnicityOrder.indexOf(ethnicity);

const getNodeSize = (volume) => Math.max(volume * 2, 10); // Ensures that dots are at least of size 10

const transformDataForScatterPlot = (originalData) => {
    // Transform your data to the format that Nivo expects for a scatter plot
    const transformedData = originalData.map((item) => {
        return {
            id: item.id,
            data: [
                {
                    x: groupToIndex(item.group),
                    y: ethnicityToIndex(item.ethnicity),
                    size: item.volume,
                },
            ],
            color: partyColors[item.id],
        };
    });

    return transformedData;
};

const MyResponsiveScatterPlot = () => {
    const scatterPlotData = transformDataForScatterPlot(chart_three);

    return (
        <div style={{height: "700px"}}>
            <ResponsiveScatterPlot
                data={scatterPlotData}
                margin={{top: 60, right: 0, bottom: 90, left: 90}}
                xScale={{type: "linear", min: 0, max: educationLevels.length - 1}}
                yScale={{type: "linear", min: -1, max: ethnicityOrder.length}}
                blendMode="multiply"
                nodeSize={(d) => getNodeSize(d.volume)} // Use the new getNodeSize function
                colors={(d) => d.color} // Adjusted to use `color` property directly
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Education Level",
                    legendPosition: "middle",
                    legendOffset: 46,
                    format: (d) => educationLevels[d],
                }}
                axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Ethnicity",
                    legendPosition: "middle",
                    legendOffset: -60,
                    format: (d) => ethnicityOrder[d],
                }}
                // Add legends and other necessary configurations
            />
        </div>
    );
};

export default MyResponsiveScatterPlot;
