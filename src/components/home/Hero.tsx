interface Props {
  lastUpdate: string;
}

const Hero = ({ lastUpdate }: Props) => {
  return (
    <div>
      <h1>Ghana Devs</h1>

      <p>
        We provide an index of Ghanaian developers with Github profile
        statistics.
      </p>
      <p>
        The original index is based on the
        <a href="https://github.com/gayanvoice/top-github-users/blob/main/markdown/total_contributions/ghana.md">
          Top Github Users Repo
        </a>
      </p>

      <p>
        You need at least <i>14 followers</i> and location set to <i>Ghana</i>{" "}
        to be found by the bot.
      </p>
      <p>
        However, a simple username search will still return the user profile
        statistics if the user can&apos;t be found in the list.
      </p>
      <p>
        Kindly submit a <i>PR</i> at
        <a href="https://github.com/owbird/Ghana-Devs">
          {" "}
          https://github.com/owbird/Ghana-Devs{" "}
        </a>
        if you can&apos;t find your name but want to be indexed.
      </p>

      <h2>Last updated: {lastUpdate}</h2>
    </div>
  );
};

export default Hero;
