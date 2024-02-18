"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface SearchUserInputProps {
  users: MDUserData[];
}

const SearchUserInput = ({ users }: SearchUserInputProps) => {
  const [suggestions, setSuggestions] = useState<MDUserData[]>([]);

  const router = useRouter();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    if (query === "") return setSuggestions([]);

    const filteredSuggestions = users.filter((user) =>
      user.username.toLowerCase().includes(query),
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/devs/${event.target.user.value}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search user"
          name="user"
          onChange={handleOnChange}
        />
        <button type="submit">Search</button>
      </form>

      {suggestions.length != 0 && (
        <ol>
          {suggestions.map((user) => (
            <Link href={`/devs/${user.username}`} key={user.username}>
              <li>
                {user.name} || {user.username}
              </li>
            </Link>
          ))}
        </ol>
      )}
    </div>
  );
};

export default SearchUserInput;
