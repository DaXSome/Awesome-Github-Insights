"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

const SearchUserInput = () => {
  const router = useRouter();

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
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchUserInput;
