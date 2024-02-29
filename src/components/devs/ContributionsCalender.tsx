"use client";

import { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

interface Props {
  username: string;
  years: number[];
}

const ContributionsCalender = ({ username, years }: Props) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(typeof window !== "undefined");
  }, []);

  if (!domLoaded) {
    return null;
  }

  return years.map((year) => (
    <div key={year} className="mb-8">
      <h1 className="text-2xl font-semibold pb-2">Contributions for {year}</h1>

      <GitHubCalendar
        username={username}
        year={year}
        colorScheme={"light"}
        showWeekdayLabels
      />
    </div>
  ));
};

export default ContributionsCalender;
