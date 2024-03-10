import dynamic from 'next/dynamic';
import React from 'react';
import chart_two from '../../../data/chart_two'; // Adjust the import path as necessary

const ResponsiveSankey = dynamic(() => import('@nivo/sankey').then(mod => mod.ResponsiveSankey), {
  ssr: false,
});

// Correctly processes the provided data into a format suitable for the Sankey diagram
const processData = (data) => {
  const nodes = [];
  const links = [];
  let nodeId = 0;

  Object.keys(data).forEach(party => {
    nodes.push({ id: `${party}`, name: party });
  });

  // Add ethnic group nodes and ensure uniqueness
  Object.values(data).forEach(groups => {
    Object.keys(groups).forEach(group => {
      if (!nodes.some(node => node.name === group)) {
        nodes.push({ id: `${group}`, name: group });
      }
    });
  });

  // Create links
  Object.entries(data).forEach(([party, demographics]) => {
    Object.entries(demographics).forEach(([ethnicity, value]) => {
      const source = nodes.find(node => node.name === party).id;
      const target = nodes.find(node => node.name === ethnicity).id;
      if (value > 0) { // Filter out zero values to avoid clutter
        links.push({
          source,
          target,
          value,
        });
      }
    });
  });

  return { nodes, links };
};

const ChartTwo = () => {
  const { nodes, links } = processData(chart_two);

  return (
    <div style={{ height: "600px" }}>
      <ResponsiveSankey
        data={{ nodes, links }}
        margin={{ top: 40, right: 40, bottom: 30, left: 20 }} // Increase right and left margins
        align="justify"
        colors={{ scheme: 'category10' }}
        nodeOpacity={1}
        nodeThickness={18}
        nodeInnerPadding={3}
        nodeSpacing={30}
        nodeBorderWidth={0}
        nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        labelPosition="outside"
        labelOrientation="vertical"
        labelPadding={16}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      
      />
    </div>
  );
};

export default ChartTwo;
