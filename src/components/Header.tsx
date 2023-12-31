"use client";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const items = useAppSelector((state) => state.cart.items);
  const session = useSession();
  const router = useRouter();

  const handleLogIn = () => {
    if (session.status === "authenticated") return signOut();
    router.push("/api/auth/signin");
  };

  return (
    <div className="">
      {/* Top Navbar */}
      <div className="bg-amazon_blue flex items-center justify-between">
        <Link href="/" className="p-2 mt-1 sm:p-3">
          <Image
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            priority
            height={20}
            width={100}
            style={{ width: "80px", height: "40px", objectFit: "contain" }}
            alt="logo"
          />
        </Link>

        <div className="hidden group md:inline-flex flex-grow items-center bg-yellow-400 rounded-md">
          <input
            className="rounded-l-md flex-grow outline-none p-2"
            type="text"
            placeholder="Search for Product"
          />
          <MagnifyingGlassIcon className="mx-3 cursor-pointer" width={20} />
        </div>

        <div className="flex items-center text-white space-x-5 mx-3">
          <div
            onClick={() => handleLogIn()}
            className=" cursor-pointer hover:underline"
          >
            <p className="text-xs">
              Hello, {session.data?.user ? session.data.user.name : `sign in`}
            </p>
            <p className="font-bold text-sm">Account & Lists</p>
          </div>
          <Link href="/orders" className=" cursor-pointer hover:underline">
            <p className="text-xs">Returns</p>
            <p className="font-bold text-sm">& Orders</p>
          </Link>
          <Link href="/cart" className="flex cursor-pointer hover:underline">
            <div className="relative">
              <ShoppingCartIcon className="h-10 w-10" />
              <p className="absolute top-0 right-0 bg-yellow-400 text-center text-xs px-1 text-black rounded-full">
                {items.length}
              </p>
            </div>
            <p className="hidden md:inline font-bold text-xs pt-6">Cart</p>
          </Link>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="flex bg-amazon_blue-light text-white items-center p-2 overflow-x-scroll scrollbar-hide">
  
        {/* For Bigger Screen */}
        <div className="flex items-center cursor-pointer">
          <Bars3Icon className="h-7" />
          <p className="text-sm font-bold">All</p>
        </div>

        <div className="flex items-center space-x-5">
          <p></p>
          <span className="text-sm cursor-pointer whitespace-nowrap">{"Today's Deal"}</span>
          <span className="text-sm cursor-pointer whitespace-nowrap">Customer Service</span>
          <span className="text-sm cursor-pointer whitespace-nowrap">Registry</span>
          <span className="text-sm cursor-pointer whitespace-nowrap">Gift Cards</span>
          <span className="text-sm cursor-pointer whitespace-nowrap">Sell</span>
        </div>
      </div>
    </div>
  );
}
