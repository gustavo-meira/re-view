import React from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SearchInput from "./SearchInput";

export default function Navbar() {
	return (
		<div className="flex flex-col items-center justify-between w-full h-80 bg-gradient-to-b from-[#4d2444] to-black  justify-between">
			<Avatar className="absolute top-3 right-3">
				<AvatarImage src="https://i.imgur.com/aF6aSn5.jpeg" />
				<AvatarFallback>AC</AvatarFallback>
			</Avatar>
			<div className="flex justify-center items-center h-full">
				<p className="text-6xl text-white">ReView</p>
			</div>
			<SearchInput />
		</div>
	);
}
