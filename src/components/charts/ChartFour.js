import React, { useState } from "react";
import dynamic from "next/dynamic";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

//data
import rawData from "../../../data/data_clean-chart4_v2.json";
// import questionTexts from "../../../data/questionTexts.json";


// Import ResponsiveRadar using dynamic import with SSR disabled
const ResponsiveRadar = dynamic(() =>
  import("@nivo/radar").then((mod) => mod.ResponsiveRadar),
  {
    ssr: false,
  }
);

const questionTexts = {
  Q1: {
    prompt: "Which of these statements is closest to your view?",
    options: [
      "1. Legalize and tax drugs for better sense.",
      "2. Keep drugs illegal due to harm to health and society.",
    ],
  },
  Q2: {
    prompt: "Which statement aligns more with your view?",
    options: [
      "1. Redistribute income for the less well-off.",
      "2. Support individuals keeping their earned income.",
    ],
  },
  Q3: {
    prompt: "Which aligns with your view?",
    options: [
      "1. Focus on living standards over cultural issues.",
      "2. Balance living standards and address cultural issues.",
    ],
  },
  Q4: {
    prompt: "Which statement is closest to your view?",
    options: [
      "1. Prioritize growing the economy over wealth equality.",
      "2. Prioritize sharing wealth over growing the economy.",
    ],
  },
  Q5: {
    prompt: "Which aligns with your view?",
    options: [
      "1. Recent immigration enriches British culture.",
      "2. Recent immigration undermines British culture.",
    ],
  },
  Q6: {
    prompt: "Which aligns more with your view?",
    options: [
      "1. Discrimination against non-white people is more significant.",
      "2. Discrimination against white people is equally significant.",
    ],
  },
  Q7: {
    prompt: "Which aligns more with your view?",
    options: [
      "1. Support self-identification of gender.",
      "2. Gender determined by biology at birth.",
    ],
  },
  Q8: {
    prompt: "Which statement aligns more with your view?",
    options: [
      "1. Tough stance on strikers shows strong leadership.",
      "2. Tough stance on strikers lacks compassion.",
    ],
  },
  Q9: {
    prompt: "Which statement aligns more with your view?",
    options: [
      "1. Achieve Net Zero regardless of costs.",
      "2. Delay Net Zero to avoid imposing higher bills.",
    ],
  },
  Q10: {
    prompt: "Which aligns more with your view?",
    options: [
      "1. Low-emission zones necessary to limit air pollution.",
      "2. Low-emission zones are an inconvenience.",
    ],
  },
  Q11: {
    prompt: "Which aligns more with your view?",
    options: [
      "1. Disruptive protesting is necessary for change.",
      "2. Disruptive protesting is an unnecessary inconvenience.",
    ],
  },
  Q12: {
    prompt: "Which aligns more with your view?",
    options: [
      "1. Political system works; no need for radical reform.",
      "2. Political system is broken; needs radical reform.",
    ],
  },
  Q13: {
    prompt: "Which statement aligns more with your view regarding Brexit?",
    options: [
      "1. Brexit failed; consider rejoining parts of the EU.",
      "2. Make Brexit work.",
    ],
  },
};

const RadarChart = () => {
  const [selectedQuestion, setSelectedQuestion] = useState("Q1");
  const [selectedQuestionText, setSelectedQuestionText] = useState(
    questionTexts.Q1
  );
  const questions = [
    "Q1",
    "Q2",
    "Q4",
    "Q5",
    "Q6",
    "Q7",
    "Q8",
    "Q9",
    "Q10",
    "Q11",
    "Q12",
    "Q13",
  ];

  const handleSliderChange = (event, newValue) => {
    const newQuestion = questions[newValue];
    setSelectedQuestion(newQuestion);
    setSelectedQuestionText(questionTexts[newQuestion]);
  };

  const transformDataForAllQuestions = () => {
    return rawData.map((ethnicityData) => ({
      ethnicity: ethnicityData.ethnicity,
      ...questions.reduce((acc, question) => {
        if (question !== "All") {
          acc[question] = ethnicityData[question];
        }
        return acc;
      }, {}),
    }));
  };

  const radarChartData =
    selectedQuestion === "All"
      ? transformDataForAllQuestions()
      : rawData.map((ethnicity) => ({
          ethnicity: ethnicity.ethnicity,
          [selectedQuestion]: ethnicity[selectedQuestion],
        }));

  const radarKeys =
    selectedQuestion === "All" ? questions.filter((type) => type !== "All") : [selectedQuestion];

  const renderQuestionText = (questionKey) => {
    const question = questionTexts[questionKey];
    if (!question) return null; // Check if question exists

    return (
      <>
        <Typography variant="subtitle1" component="span" sx={{ fontWeight: "bold" }}>
          {question.prompt}
        </Typography>
        <Typography component="div" sx={{ ml: 0 }}>
          {question.options.map((option, index) => (
            <Typography key={index} variant="body1" component="span">
              {option}
              {index !== question.options.length - 1 && <br />}{" "}
              {/* Add line break for each option */}
            </Typography>
          ))}
        </Typography>
      </>
    );
  };

  return (
    <>
      <Box sx={{ width: "auto", p: 0 }}>
        <Slider
          aria-label="Select Question"
          value={questions.indexOf(selectedQuestion)}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          step={1}
          marks={questions.map((type, index) => ({ value: index, label: type }))}
          min={0}
          max={questions.length - 1}
          TransitionProps={{ onTransitionEnd: () => console.log("Transition ended") }} // Add this line
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
              color: "#000000", // Optionally changes the mark label color if you're using labels
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>{renderQuestionText(selectedQuestion)}</Box>
      <div style={{ height: "500px" }}>
        <ResponsiveRadar
          data={radarChartData}
          keys={radarKeys}
          indexBy="ethnicity"
          maxValue="auto"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor={{ from: "color" }}
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={36}
          enableDots={true}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={2}
          dotBorderColor={{ from: "color" }}
          enableDotLabel={true}
          dotLabel="none"
          dotLabelYOffset={-12}
          colors={["#6babf2"]} // Set the color here
          fillOpacity={0.25}
          blendMode="multiply"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          isInteractive={true}
        />
      </div>
    </>
  );
};

export default RadarChart;
