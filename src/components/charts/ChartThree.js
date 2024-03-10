import React from "react";
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
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

const transformDataForScatterPlot = (originalData) => {
    const transformed = [];
    const ethnicityMap = new Map();

    // Create a map of unique ethnicity values
    originalData.forEach(item => {
        const { price } = item;
        if (!ethnicityMap.has(price)) {
            ethnicityMap.set(price, ethnicityMap.size);
        }
    });

    // Group data by 'id' and 'group'
    originalData.forEach(item => {
        const { id, group, volume, price } = item;
        const groupKey = `${id}-${group}`;

        let groupData = transformed.find(d => d.id === groupKey);
        if (!groupData) {
            groupData = {
                id: groupKey,
                data: [],
                label: `${id} - ${group}`,
                ethnicity: price,
                ethnicityIndex: ethnicityMap.get(price)
            };
            transformed.push(groupData);
        }

        groupData.data.push({ x: group, y: volume });
    });

    // Sort data by ethnicity
    transformed.forEach(group => {
        group.data.sort((a, b) => b.y - a.y);
    });

    // Sort transformed array by ethnicity index
    transformed.sort((a, b) => a.ethnicityIndex - b.ethnicityIndex);

    return { data: transformed, ethnicityMap };
};

const MyResponsiveScatterPlot = () => {
    const { data: scatterPlotData, ethnicityMap } = transformDataForScatterPlot(chart_three);
    
    const ethnicityLabels = [
        'White',
        'Mixed',
        'Asian or Asian British',
        'Black or Black British',
        'Chinese',
        'Other ethnic group',
        'Prefer not to say',
    ];

    return (
        <div style={{ height: "500px" }}>
            <ResponsiveScatterPlot
                data={scatterPlotData}
                margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
                xScale={{ type: 'point' }}
                yScale={{ type: 'linear', min: 0, max: 'auto' }}
                blendMode="multiply"
                nodeSize={24}
                colors={node => partyColors[node.id] || 'red'}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    legend: 'Education Level',
                    legendPosition: 'middle',
                    legendOffset: 46,
                }}
                axisLeft={{
                    orient: 'left',
                    legend: 'Ethnicity',
                    legendPosition: 'middle',
                    legendOffset: -60,
                    legendValues: ethnicityLabels.map((label, index) => `${index + 1}. ${label}`),
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 130,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 12,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ],
                        data: Object.entries(partyColors).map(([key, value]) => ({
                            id: key,
                            label: key,
                            color: value
                        }))
                    }
                ]}
            />
        </div>
    );
};

export default MyResponsiveScatterPlot;