interface Props {
  lastUpdate: string;
}

const Hero = ({ lastUpdate }: Props) => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800">Ghana Devs</h1>

      <p className="mt-4 text-lg text-gray-600">
        Welcome to Ghana Devs, your go-to resource for discovering Ghanaian
        developers and exploring beautiful insights on their profiles.
      </p>

      <p className="mt-4 text-lg text-gray-600">
        The original index is sourced from the{" "}
        <a
          href="https://github.com/gayanvoice/top-github-users/blob/main/markdown/total_contributions/ghana.md"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Top Github Users Repo
        </a>{" "}
        and is continuously updated to ensure accuracy.
      </p>

      <p className="mt-4 text-lg text-gray-600">
        To be discovered, developers must have at least{" "}
        <span className="font-bold text-blue-500">14 followers</span> on GitHub
        and have their location set to{" "}
        <span className="font-bold text-blue-500">Ghana</span>. However, even if
        you don&apos;t meet these criteria, you can still be found via a simple
        username search.
      </p>

      <p className="mt-4 text-lg text-gray-600">
        Can&apos;t find your name on the index? Don&apos;t worry! Simply submit
        an <span className="font-bold text-blue-500">Issue</span> to{" "}
        <a
          href="https://github.com/owbird/Ghana-Devs/issues/new"
          className="text-blue-500 hover:text-blue-700 underline"
        >
          Ghana-Devs
        </a>{" "}
        to be included.
      </p>

      <h2 className="mt-8 text-xl font-medium text-gray-600">
        Last updated: {lastUpdate}
      </h2>
    </div>
  );
};

export default Hero;
