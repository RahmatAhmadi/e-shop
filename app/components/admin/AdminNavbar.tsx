"use client";

import Link from "next/link";
import Container from "../Container";
import AdminNavbarItems from "./AdminNavbarItems";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const AdminNavbar = () => {
  const pathName = usePathname();

  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<any>(null);

  const updateScreenSize = () => {
    setIsMediumOrSmaller(window.innerWidth <= 730);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();

    document.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("resize", updateScreenSize);

      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        {isMediumOrSmaller ? (
          <div className="flex items-center pb-4">
            <div className="relative group" ref={dropdownRef}>
              <button
                className="p-2
                border-[1px]
                border-slate-400
                flex
                flex-row
                items-center
                gap-1
                rounded-md
                cursor-pointer
                hover:shadow-md
                transition
                text-slate-700"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Menu
                <AiFillCaretDown />
              </button>
              <ul
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } absolute z-10 left-0 mt-2 space-y-2 bg-white border border-slate-400 rounded-md w-44 overflow-hidden`}
              >
                <Link href="/admin">
                  <AdminNavbarItems
                    isMediumOrSmaller={isMediumOrSmaller}
                    label="Summary"
                    icon={MdDashboard}
                    selected={pathName === "/admin"}
                  />
                </Link>
                <Link href="/admin/add-products">
                  <AdminNavbarItems
                    isMediumOrSmaller={isMediumOrSmaller}
                    label="Add products"
                    icon={MdLibraryAdd}
                    selected={pathName === "/admin/add-products"}
                  />
                </Link>
                <Link href="/admin/manage-products">
                  <AdminNavbarItems
                    isMediumOrSmaller={isMediumOrSmaller}
                    label="Manage products"
                    icon={MdDns}
                    selected={pathName === "/admin/manage-products"}
                  />
                </Link>
                <Link href="/admin/manage-orders">
                  <AdminNavbarItems
                    isMediumOrSmaller={isMediumOrSmaller}
                    label="Manage orders"
                    icon={MdFormatListBulleted}
                    selected={pathName === "/admin/manage-orders"}
                  />
                </Link>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
            <Link href="/admin">
              <AdminNavbarItems
                isMediumOrSmaller={isMediumOrSmaller}
                label="Summary"
                icon={MdDashboard}
                selected={pathName === "/admin"}
              />
            </Link>
            <Link href="/admin/add-products">
              <AdminNavbarItems
                isMediumOrSmaller={isMediumOrSmaller}
                label="Add products"
                icon={MdLibraryAdd}
                selected={pathName === "/admin/add-products"}
              />
            </Link>
            <Link href="/admin/manage-products">
              <AdminNavbarItems
                isMediumOrSmaller={isMediumOrSmaller}
                label="Manage products"
                icon={MdDns}
                selected={pathName === "/admin/manage-products"}
              />
            </Link>
            <Link href="/admin/manage-orders">
              <AdminNavbarItems
                isMediumOrSmaller={isMediumOrSmaller}
                label="Manage orders"
                icon={MdFormatListBulleted}
                selected={pathName === "/admin/manage-orders"}
              />
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AdminNavbar;
