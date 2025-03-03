"use client"
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LogIn, Search } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import SignOutModal from '../signOutModal';
import { useDisclosure } from "@heroui/modal";


export const Navbar = () => {
  const pathname = usePathname()
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="جستجو..."
      startContent={
        <Search className="text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (

    <SignOutModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}>
      <HeroUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarMenuToggle className="md:hidden" />
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
                <path
                  clipRule="evenodd"
                  d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
              <p className="font-bold text-inherit">AHST</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden md:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  color={item.href === pathname ? "primary" : "foreground"}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>

        <NavbarContent className="basis-1/5 md:basis-full" justify="end">
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem className="hidden md:flex">{searchInput}</NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              className="text-sm font-normal text-default-600 bg-default-100"
              startContent={<LogIn />}
              href={siteConfig.links.login}
              variant="flat"
            >
              <span className="mb-1">ورود یا ثبت‌نام</span>
            </Button>
          </NavbarItem>

          <NavbarItem>

            <Dropdown placement="bottom-start">

              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownSection showDivider>
                  <DropdownItem key="profile">
                    <p className="font-semibold mb-1">کاربرسایت</p>
                    <p className="text-default-400">09121111111</p>
                  </DropdownItem>
                </DropdownSection>
                <DropdownItem key="settings">حساب کاربری</DropdownItem>
                <DropdownItem key="configurations">تنظیمات</DropdownItem>
                <DropdownItem onPress={onOpen} key="logout" color="danger">
                  خروج از حساب
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu className="overflow-y-hidden">
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={item.href === pathname ? "primary" : "foreground"}
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>

    </SignOutModal>
  );
};
