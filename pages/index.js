import dynamic from 'next/dynamic';
import React from "react";
import styles from "../styles/Home.module.css";

// Dynamic Imports for Charts
const ChartOne = dynamic(() => import("../src/components/charts/ChartOne"));
const ChartTwo = dynamic(() => import("../src/components/charts/ChartTwo"));
const MyResponsiveScatterPlot = dynamic(() => import("../src/components/charts/ChartThree"), { ssr: false });
import BubbleChartComponent from "../src/components/charts/ChartThreeV2"

//Comps
import BodyCopy from "../src/components/BodyCopy";
import PullQuote from "../src/components/PullQuote";
import SubHead from "../src/components/SubHead";

//Data
import chart_two from "../data/chart_two";

const Home = () => {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <h1 className={styles.mainTitle}>The Changing Fabric of British Voters</h1>

                    <h3 className={styles.date}>February 23, 2024</h3>

                    <BodyCopy htmlText="With an estimated … voters expected to turn out to the ballot this year the United Kingdom is set to bring a significant number of people to what is already set to be a significant voting year for many countries around the world. Alongside this international voting perspective the main focus of most political parties this year is the economy and their representative plan to integrate a solution of increasing deficits across the board. <br /><br />In 2022–23 England’s education system alone was estimated to total £116 billion with the output teaching of 10.7 million pupils across the country, which in the shadow of the upcoming education sparked a thought over here at Focaldata." />

                    <PullQuote
                        text="“How would a visual comparative analysis illuminate the interplay between educational background and ethnicity in shaping political opinions and party support among voters in the United Kingdom during the 2024 general election?”"
                        author="Focaldata Team"
                    />

                    <SubHead sectionNumber="1" title="The Educational Divide in Political Affiliation" />
                    <h3 className={styles.date}>Drag the slider to explore education level</h3>

                    <ChartOne />

                    <BodyCopy
                        htmlText="We ran a survey of 2,700 respondents out of which the following correlations between voting preference and educational experience was as follows: individuals with below degree level qualifications demonstrated a stronger preference for the Conservative Party, with 35.6% of their support, compared to 23.4% among those with degree level or above qualifications. In contrast, the Labour Party found greater favor among voters with higher educational attainment, securing 32.6% of their support against 23.1% from the lower education group. The Liberal Democrats and the Green Party both saw increased backing as well from those with degree-level qualifications or higher, suggesting a political affinity that correlates with educational advancement. Support for other parties, such as the Brexit Party, Scottish National Party, and Plaid Cymru, exhibited minor variations based on education levels but remained relatively small.<br /><br />Despite these differences, a significant portion of the electorate, interestingly around 19.6%, across educational backgrounds, reported not voting or being unable to vote, underlining a universal disengagement factor underscoring education as a potential opportunity to grow and shape political preferences, revealing an educational divide that mirrors the broader, complex range of British voters political affiliation.
"
                    />

                    <SubHead sectionNumber="2" title="Ethnicity and Political Representation" />

                    <h3 className={styles.date}>Hover to view detailed jorney</h3>

                    <ChartTwo data={chart_two} />

                    <BodyCopy htmlText="Further analysis into how ethnicity influences political party support, underscoring the complex interplay between representation, policies that resonate with various ethnic communities, and historical ties. The data reveals distinct preferences across ethnic groups, with The Labour Party generally receiving more support from Asian, Black, and Mixed ethnic groups. This support likely reflects the party's historical emphasis on policies geared towards social equality, inclusion, and its efforts to represent diverse communities within its ranks. Conversely, The Conservative Party was more favored among White respondents, perhaps indicating a different set of priorities or historical affiliations that resonate more with this demographic.<br /><br /> The varying levels of engagement, from active support to non-voting, across ethnic lines highlight the need for all political movements to address the specific concerns and aspirations of each community. This includes not only crafting policies that address the unique challenges faced by different ethnic groups but also ensuring meaningful representation within party structures and candidate selections." />

                    <SubHead sectionNumber="3" title="Intersection of Education and Ethnicity in Politics" />

                    <h3 className={styles.date}>Hover to view detailed jorney</h3>

                    {/* <MyResponsiveScatterPlot /> */}

                    <BubbleChartComponent width={800} height={600} />

                    <BodyCopy htmlText="Further analysis " />
                </div>
            </div>
        </div>
    );
};

export default Home;
