"use client";

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName === "/";

  const [isMediumOrSmaller, setIsMediumOrSmaller] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<any>(null);

  const updateScreenSize = () => {
    setIsMediumOrSmaller(window.innerWidth <= 768);
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

  if (!isMainPage) return null;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bg-white">
      <Container>
        {isMediumOrSmaller ? (
          <div className="flex items-center py-2">
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
                onClick={toggleDropdown}
              >
                Categories
                <AiFillCaretDown />
              </button>
              <ul
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } absolute z-10 left-0 mt-2 space-y-2 bg-white border border-slate-400 rounded-md overflow-hidden`}
              >
                {categories.map((item) => (
                  <Category
                    isMediumOrSmaller={isMediumOrSmaller}
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    selected={
                      category === item.label ||
                      (category === null && item.label === "All")
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-between overflow-x-auto pt-4">
            {categories.map((item) => (
              <Category
                isMediumOrSmaller={isMediumOrSmaller}
                key={item.label}
                label={item.label}
                icon={item.icon}
                selected={
                  category === item.label ||
                  (category === null && item.label === "All")
                }
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Categories;
