"use client";

import SearchUserInput from "@/components/home/SearchUserInput";
import Script from "next/script";
import { Fragment } from "react";

export default function Home() {
  return (
    <Fragment>
      <main className=" flex flex-col justify-center items-center mx-auto px-4 py-16">
        <h1>Awesome Github Insights</h1>
        <SearchUserInput />
        <Script
          id="credit"
          defer={false}
          strategy="beforeInteractive"
          src="https://owbird.site/api/cdn/js/credit.js"
        />{" "}
      </main>
    </Fragment>
  );
}
