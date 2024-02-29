interface Props {
  lastUpdate: string;
}

const Hero = ({ lastUpdate }: Props) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Ghana Devs</h1>

      <p className="mt-4 text-lg text-gray-600">
        We provide an index of Ghanaian developers with Github profile
        statistics.
      </p>
      <p className="mt-2 text-gray-600">
        The original index is based on the{" "}
        <a
          href="https://github.com/gayanvoice/top-github-users/blob/main/markdown/total_contributions/ghana.md"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Top Github Users Repo
        </a>
      </p>

      <p className="mt-4 text-gray-600">
        You need at least{" "}
        <i>
          <span className="font-bold text-blue-500">14 followers</span>
        </i>{" "}
        and location set to{" "}
        <i>
          <span className="font-bold text-blue-500">Ghana</span>
        </i>{" "}
        to be found by the bot.
      </p>
      <p className="mt-2 text-gray-600">
        However, a simple username search will still return the user profile
        statistics if the user can&apos;t be found in the list.
      </p>
      <p className="mt-4 text-gray-600">
        Kindly submit a{" "}
        <i>
          <span className="font-bold text-blue-500">PR</span>
        </i>{" "}
        at{" "}
        <a
          href="https://github.com/owbird/Ghana-Devs"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Ghana-Devs
        </a>{" "}
        if you can&apos;t find your name but want to be indexed.
      </p>

      <h2 className="mt-8 text-xl font-medium text-gray-600">
        Last updated: {lastUpdate}
      </h2>
    </div>
  );
};

export default Hero;
