import Link from "next/link";
import SearchUserInput from "@/components/home/SearchUserInput";
import { ParseMDData } from "@/lib";

const TopBar = async () => {
	const { users } = await ParseMDData();

	const userKeys = Object.keys(users).sort();

	const rawUsers = userKeys.map((key) => users[key]).flat();

	return (
		<header className="bg-gray-800 text-white px-4 py-2 flex flex-row justify-between items-center">
			<Link href="/">
				<h1 className="text-xl font-bold">Ghana Devs</h1>
			</Link>
			<div className="flex flex-row items-center gap-2">
				<a
					href="https://github.com/Owbird/Ghana-Devs"
					target="_blank"
					rel="noreferrer noopener"
					className="text-white hover:text-gray-400 ml-4"
				>
					<img
						src="/github.png"
						alt="GitHub Icon"
						width="50"
						height="50"
					/>
				</a>
				<SearchUserInput users={rawUsers} />
			</div>
		</header>
	);
};

export default TopBar;
