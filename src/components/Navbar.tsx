import SearchInput from './SearchInput';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function Navbar() {
  return (
    <div className="flex h-80 w-full flex-col items-center justify-between bg-gradient-to-b from-[#4d2444] to-black">
      <Avatar className="absolute right-3 top-3">
        <AvatarImage src="https://i.imgur.com/aF6aSn5.jpeg" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div className="flex h-full items-center justify-center">
        <p className="text-6xl text-white">ReView</p>
      </div>
      <SearchInput />
    </div>
  );
}
