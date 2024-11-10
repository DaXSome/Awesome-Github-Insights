"use client";

import SearchUserInput from "@/components/home/SearchUserInput";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <main className=" flex flex-col justify-center items-center mx-auto px-4 py-16">
        <h1>Awesome Github Insights</h1>
        <SearchUserInput />
      </main>
    </Fragment>
  );
}
