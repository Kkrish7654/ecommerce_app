"use client";
import React, { useState } from "react";
import ThemeSwitch from "./ThemeSwitch";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/reducers/auth.reducer";
import { useRouter } from "next/navigation";
import Drawer from "../helper/ui/Drawer";
import Cart from "../home/segments/Cart";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

const Header = () => {
  const { isAuthenticate } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [openCart, setOpenCart] = useState<boolean>(false);
  // const [welcomeMsg, setWelcomeMsg] = useState(true);

  // function handleWelcomeMsg() {
  //   setTimeout(() => {
  //     setWelcomeMsg(false);
  //   }, 4000);
  // }
  // handleWelcomeMsg();

  function handleLogout() {
    dispatch(logout());
    window.location.reload();
  }
  return (
    <div className="w-full">
      <header className="dark:bg-black dark:text-white text-neutral-800 bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <Link href="/">BrandLogo</Link>
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components that you can copy
                            and paste into your apps. Accessible. Customizable.
                            Open Source.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink>Products</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="pl-5">
                <NavigationMenuLink
                  className=" cursor-pointer"
                  onClick={() => setOpenCart(!openCart)}
                >
                  Cart
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-8">
            {isAuthenticate ? (
              <>
                <Button variant="outline">
                  <Link href="/profile">Profile</Link>
                </Button>

                <Button onClick={handleLogout} variant="destructive">
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="outline">Sign Up</Button>
              </Link>
            )}
            <ThemeSwitch />
          </div>
        </div>
      </header>
      {openCart && (
        <Drawer>
          <Cart />
        </Drawer>
      )}
    </div>
  );
};

export default Header;
