"use client";

import GitHubCalendar from "react-github-calendar";

interface Props {
  username: string;
  years: number[];
}

const ContributionsCalender = ({ username, years }: Props) => {
  if (typeof window === "undefined") return <div></div>;

  return years.map((year) => (
    <div key={year}>
      <h1>Contributions for {year}</h1>

      <GitHubCalendar
        username={username}
        year={year}
        colorScheme={"light"}
        showWeekdayLabels
      />
      <br />
      <br />
    </div>
  ));
};

export default ContributionsCalender;
