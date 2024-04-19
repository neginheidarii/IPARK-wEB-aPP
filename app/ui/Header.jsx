"use client";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Link,
  Navbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import React from "react";
import { UserIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathRoundedSquareIcon,
  ArrowsPointingInIcon,
  Cog8ToothIcon,
  CreditCardIcon,
  DocumentTextIcon,
  HomeIcon,
  LinkIcon,
  NewspaperIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import LogoutButton from "@/ui/LogoutButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", Icon: HomeIcon },
    {
      href: "/dashboard/virtual_terminal",
      label: "Parking Lots",
      Icon: CreditCardIcon,
    },
    {
      href: "/user/clients",
      label: "Parking Spots",
      Icon: ArrowsPointingInIcon,
    },
    { href: "/invoices", label: "Issues", Icon: DocumentTextIcon },
    { href: "/payment_links", label: "Reservation History", Icon: LinkIcon },
    {
      href: "/subscriptions",
      label: "Settings",
      Icon: ArrowPathRoundedSquareIcon,
    },
    // { href: "/contracts", label: "Contracts", Icon: NewspaperIcon },
    // { href: "/users", label: "Users and Permissions", Icon: UserGroupIcon },
    // { href: "/user-settings", label: "Settings", Icon: Cog8ToothIcon },
  ];
  return (
    <div>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth={"full"}
      >
        <NavbarContent className="lg:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${index}`}>
              <Link
                className="text-sm text-gray-500 px-1 space-x-2"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={item.href}
              >
                <item.Icon className={"text-gray-400 h-5 w-5"} />
                <span>{item.label}</span>
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarContent justify="end">
          <Popover placement={"bottom-end"} color="primary">
            <PopoverTrigger>
              <UserIcon className="w-10 h-10 text-gray-500 bg-gray-200 rounded-full p-2 hover:cursor-pointer duration-400 hover:bg-gray-300" />
              {/*<span className="text-sm text-gray-500 font-semibold">Profile</span>*/}
            </PopoverTrigger>
            <PopoverContent className={"bg-red-300 p-0"}>
              <Card className="p-2">
                <CardHeader className="space-x-4">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="md"
                      src="/avatars/avatar-1.png"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        User
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        Email
                      </h5>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-3 text-small text-default-400">
                  <Listbox
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                  >
                    <ListboxItem key="number">
                      <LogoutButton />
                    </ListboxItem>
                  </Listbox>
                </CardBody>
              </Card>
            </PopoverContent>
          </Popover>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default Header;
