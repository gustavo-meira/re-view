"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function SearchInput() {
	const [searchValue, setSearchValue] = useState("");
	return (
		<div className="flex w-full justify-center items-center relative">
			<Input
				className="w-1/3 h-11 bg-transparent text-white"
				placeholder="Busque por um filme aqui"
				onChange={(e) => setSearchValue(e.target.value)}
				value={searchValue}
			/>
			<Button
				className={cn("absolute right-[33.5%]", {
					hidden: searchValue.length < 1
				})}
			>
				Buscar
			</Button>
		</div>
	);
}
