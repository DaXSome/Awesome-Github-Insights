import Link from "next/link";
import { format } from "timeago.js";

interface Props {
  event: GhPublicEvent;
}

const PublicEvents = ({ event }: Props) => {
  switch (event.type) {
    case "PushEvent":
      return (
        <div
          className="bg-white p-4 rounded-lg shadow-md mb-4"
        >
          <p>
            Made {event.payload.commits.length} commits to{" "}
            <Link
              className="text-blue-400"
              target="_blank"
              href={`https://github.com/${event.repo.name}/tree/${event.payload.ref.replaceAll("refs/heads/", "")}`}
            >
              {event.payload.ref.replaceAll("refs/heads/", "")}
            </Link>{" "}
            at{" "}
            <Link
              className="text-blue-400"
              target="_blank"
              href={`https://github.com/${event.repo.name}`}
            >
              {event.repo.name}
            </Link>
          </p>

          <div className="mt-4 mb-4">
            {event.payload.commits.map((commit) => (
              <div key={commit.sha}>
                <p>
                  {commit.message}

                  <Link
                    className="text-blue-400"
                    target="_blank"
                    href={`https://github.com/${event.repo.name}/commit/${commit.sha}`}
                  >
                    {" "}
                    ({commit.sha.slice(0, 7)})
                  </Link>
                </p>
              </div>
            ))}
          </div>

          <span className="text-gray-400">{format(event.created_at)}</span>
        </div>
      );

    case "WatchEvent":
      return (
        <div
          className="bg-white p-4 rounded-lg shadow-md mb-4"
        >
          <p>
            Starred{" "}
            <Link
              className="text-blue-400"
              target="_blank"
              href={`https://github.com/${event.repo.name}`}
            >
              {event.repo.name}
            </Link>
          </p>

          <span className="text-gray-400">{format(event.created_at)}</span>
        </div>
      );

    case "PullRequestEvent":
      return (
        <div
          className="bg-white p-4 rounded-lg shadow-md mb-4"
        >
          <p>
            {event.payload.action} a pull request{" "}
            <Link
              className="text-blue-400"
              target="_blank"
              href={event.payload.pull_request.html_url}
            >
              (#{event.payload.number}){" "}
            </Link>
            at{" "}
            <Link
              className="text-blue-400"
              target="_blank"
              href={`https://github.com/${event.repo.name}`}
            >
              {event.repo.name}
            </Link>
          </p>

          <div className="mt-4 mb-4">{event.payload.pull_request.title}</div>

          <span className="text-gray-400">{format(event.created_at)}</span>
        </div>
      );

    case "CreateEvent":
      return (
        <div
          className="bg-white p-4 rounded-lg shadow-md mb-4"
        >
          <p>
            Created a {event.payload.ref_type}{" "}
            <Link
              className="text-blue-400"
              target="_blank"
              href={`https://github.com/${event.repo.name}/tree/${event.payload.ref}`}
            >
              {event.payload.ref}{" "}
            </Link>
            at{" "}
            <Link
              className="text-blue-400"
              target="_blank"
              href={`https://github.com/${event.repo.name}`}
            >
              {event.repo.name}
            </Link>
          </p>

          <div className="mt-4 mb-4">{event.payload.description}</div>

          <span className="text-gray-400">{format(event.created_at)}</span>
        </div>
      );
  }
};

export default PublicEvents;
