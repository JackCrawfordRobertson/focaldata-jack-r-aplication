import dynamic from "next/dynamic";
import React from "react";
import styles from "../styles/Home.module.css";

// Dynamic Imports for Charts
const ChartOne = dynamic(() => import("../src/components/charts/ChartOne"));
const ChartTwo = dynamic(() => import("../src/components/charts/ChartTwo"));
import BubbleChartComponent from "../src/components/charts/ChartThreeV2";
import RadarChart from "../src/components/charts/ChartFour";

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

                    <BodyCopy htmlText="With an estimated … voters expected to turn out to the ballot this year the United Kingdom is set to bring a significant number of people to what is already set to be a significant voting year for many countries around the world. Alongside this international voting perspective the main focus of most political parties this year is the economy and their representative plan to integrate a solution of decreasing deficits across the board. <br /><br />Alongside this in the prediod of 2022–23, England’s education system alone was estimated to total £116 billion with the output teaching of 10.7 million pupils across the country, which in the shadow of the upcoming election sparked a thought over here at Focaldata." />

                    <PullQuote
                        text="“How would a visual comparative analysis illuminate the interplay between educational background and ethnicity in shaping political opinions and party support among voters in the United Kingdom during the 2024 general election?”"
                        author="Focaldata Team"
                    />

                    <SubHead sectionNumber="1" title="The Educational Divide in Political Affiliation" />

                    <h3 className={styles.date}>Drag the slider to explore education level</h3>

                    <ChartOne />

                    <BodyCopy
                        htmlText="We ran a survey of 2,700 respondents out of which the following correlations between voting preference and educational experience was as follows: individuals with below degree level qualifications demonstrated a stronger preference for the Conservative Party, with 35.6% of their support, compared to 23.4% among those with degree level or above qualifications. In contrast, the Labour Party found greater favor among voters with higher educational attainment, securing 32.6% of their support against 23.1% from the lower education group. The Liberal Democrats and the Green Party both saw increased backing as well from those with degree-level qualifications or higher, suggesting a political affinity that correlates with educational advancement. Support for other parties, such as the Brexit Party, Scottish National Party, and Plaid Cymru, exhibited minor variations based on education levels but remained relatively small.<br /><br />Despite these differences, a significant portion of the electorate, interestingly around 19.6%, across educational backgrounds, reported not voting or being unable to vote, underlining a universal disengagement factor underscoring education as a potential opportunity to grow and shape political preferences, revealing an educational divide that mirrors the broader, complex range of British voter's political affiliation."/>

                    <SubHead sectionNumber="2" title="Ethnicity and Political Representation" />

                    <h3 className={styles.date}>Hover to view detailed journey</h3>

                    <ChartTwo data={chart_two} />

                    <BodyCopy htmlText="Further analysis into how ethnicity influences political party support, underscores the complex interplay between representation, policies that resonate with various ethnic communities, and historical ties. The data reveals distinct preferences across ethnic groups, with The Labour Party generally receiving more support from Asian, Black, and Mixed ethnic groups. This support likely reflects the party's historical emphasis on policies geared towards social equality, inclusion, and its efforts to represent diverse communities within its ranks. Conversely, The Conservative Party was more favored among White respondents, perhaps indicating a different set of priorities or historical affiliations that resonate more with this demographic.<br /><br /> The varying levels of engagement, from active support to non-voting, across ethnic lines highlight the need for all political movements to address the specific concerns and aspirations of each community. This includes not only crafting policies that address the unique challenges faced by different ethnic groups but also ensuring meaningful representation within party structures and candidate selections." />

                    <SubHead sectionNumber="3" title="Intersection of Education and Ethnicity in Politics" />

                    <h3 className={styles.date}>Drag the slider to filter by political party</h3>

                    <BubbleChartComponent width={800} height={600} />

                    <BodyCopy htmlText="The connection between education and ethnicity within the UK's political environment reveals a complex voter landscape ahead of the 2024 general election. Based on our polling data, individuals from ethnic minority backgrounds with higher education levels gravitate towards parties like the Labour Party, aligning educational attainment with political ideologies centred on social equality and inclusivity.<br /><br />Conversely, the Conservative Party garners support across diverse educational and ethnic demographics, suggesting its broader appeal might be rooted in traditional values or economic policies. This intricate interplay highlights the multifaceted nature of British voters and the importance of inclusive, political engagement. Engaging in debate of representation and fostering a political dialogue that encompasses the multifaceted concerns of all communities, especially those feeling marginalised, becomes crucial." />

                    <SubHead sectionNumber="4" title="The Role of Policy and Campaign Messaging" />

                    <h3 className={styles.date}>Drag the slider to filter policy questions</h3>

                    <RadarChart />

                    <BodyCopy htmlText="The above visualisation shows the average answer from the case study participants, with the first question being at the centre of the chart and the second on the outside. From the case study data set, the intricate dance of policy and campaign messaging takes on a crucial role, especially in engaging the diversity of the 2024 British voting population. Political parties are keenly refining their strategies, aiming to connect deeply with various educational and ethnic groups. Insights reveal a landscape where tailored policies not only resonate but are pivotal in forging voter loyalty and engagement.<br /><br />Parties adept at aligning their messaging with the specific priorities of different demographic segments find themselves at an advantage. This nuance is evident in how policies related to education, healthcare, and economic stability influence voter preferences across educational and ethnic lines. Such tailored approaches underscore a broader trend: the growing importance of personalised, inclusive campaign narratives in the contemporary political arena." />

                    <SubHead sectionNumber="5" title="Future Implications, Recommendations and Conclusions" />

                    <BodyCopy htmlText="The findings from this analysis underscore the impact of education and identity on voter preferences and political engagement in the United Kingdom. As the nation's electorate grows increasingly diverse, it is crucial for political parties, policymakers, and civic organisations to adapt and foster an political dialogue that respects and represents the varied needs and perspectives of everyone.<br /><br /> Political parties must use tailored messaging, policies, and outreach efforts to resonate with different educational and ethnic communities. Policymakers should prioritise initiatives that address disparities, promote educational opportunities, and empower underrepresented groups. Civic organisations can play a vital role in raising awareness, encouraging participation, and amplifying diverse voices in the political process." />

                    <PullQuote
                        text="“Focaldata online polling of 2,700 respondents in United Kingdom. Data is weighted by age, gender, education, race, and more.
                        <br /><br />
                        Enjoyed this week's newsletter but haven't subscribed yet? Why not subscribe and get the next one straight to your inbox. You can also follow Focaldata on Twitter and LinkedIn.
                        <br /><br />
                        Feel free to check out our previous editions of Bi_Focal:
                        <br /><br />
                        Our two-part edition on the rise of Reform, and the shape of public attitudes on social and economic issues, available here (Part I) and here (Part II) A new theory of 'elastic seats', a defining feature of pivotal areas with large variation voter support over time - link here Our MRP of the Voice referendum in Australia last October (we were one of the closest pollsters to the final vote tally) - link here Our (now year old) stress test of predictions about a Labour landslide -- still valid a year on, we think! -- link here Finally, if you or anyone you know regularly run polling, we'd be happy to run a free couple of questions for you -- we'd love to demonstrate the speed of our platform and showcase the technical capacity of our research team."
                        author="Written by the Focaldata Team."
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
