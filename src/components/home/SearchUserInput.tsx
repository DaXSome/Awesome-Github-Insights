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
    <div className="flex justify-center items-start mt-4 max-h-48 ">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white border rounded-lg shadow-sm overflow-hidden"
        >
          <input
            className="w-full border-none py-2 px-4 focus:outline-none text-black"
            placeholder="Search user"
            name="user"
            onChange={handleOnChange}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Search
          </button>
        </form>

        {suggestions.length !== 0 && (
          <div className="mt-2 bg-white border rounded-lg shadow-sm overflow-y-scroll max-h-48">
            <ul className="divide-y divide-gray-200">
              {suggestions.map((user) => (
                <Link href={`/devs/${user.username}`} key={user.username}>
                  <li className="px-4 py-3 text-blue-500 hover:bg-gray-50 cursor-pointer">
                    <span className="block">{user.name}</span>
                    <span className="block text-xs text-gray-500">
                      {user.username}
                    </span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUserInput;
