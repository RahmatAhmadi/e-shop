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

const AdminNavbar = () => {
  const pathName = usePathname();

  return (
    <div
      className="
    w-full
    shadow-sm
    top-20
    border-b-[1px]
    pt-4
    "
    >
      <Container>
        <div
          className="
        flex
        flex-row
        items-center
        justify-between
        md:justify-center
        gap-8
        md:gap-12
        overflow-x-auto
        flex-nowrap
        "
        >
          <Link href="/admin">
            <AdminNavbarItems
              label="Summary"
              icon={MdDashboard}
              selected={pathName === "/admin"}
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavbarItems
              label="Add products"
              icon={MdLibraryAdd}
              selected={pathName === "/admin/add-products"}
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavbarItems
              label="Manage products"
              icon={MdDns}
              selected={pathName === "/admin/manage-products"}
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavbarItems
              label="Manage orders"
              icon={MdFormatListBulleted}
              selected={pathName === "/admin/manage-orders"}
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNavbar;
