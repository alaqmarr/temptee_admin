import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MainNav } from "./MainNav";
import StoreSwitcher from "./store-swtitcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* Small screens: MainNav first */}
        <div className="flex flex-row items-center justify-evenly h-16 sm:flex-row lg:hidden w-[80%]">
          <MainNav />
          <StoreSwitcher items={stores} />
        </div>

        {/* Large screens: StoreSwitcher first */}
        <div className="hidden h-16 justify-evenly lg:flex lg:items-center lg:space-x-4 w-[80%]">
          <StoreSwitcher items={stores} />
          <MainNav />
        </div>

        {/* User button */}
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
