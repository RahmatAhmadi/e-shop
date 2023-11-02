"use client";

import { useCallback } from "react";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

interface CategoryProps {
  label: string;
  icon: IconType;
  selected?: boolean;
  isMediumOrSmaller: boolean;
}

const Category: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  selected,
  isMediumOrSmaller,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};

      if (params) {
        currentQuery = queryString.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        }
      );

      router.push(url);
    }
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
    flex
    items-center
    justify-start
    gap-1
    p-2
    border-b-2
    hover:bg-gray-200/25 
    transition
    cursor-pointer
    ${isMediumOrSmaller ? "hover:text-slate-800" : ""}
    ${selected && isMediumOrSmaller ? "bg-gray-200/75 text-slate-800" : ""}
    ${
      selected && !isMediumOrSmaller
        ? "border-b-slate-800 text-slate-800"
        : "border-transparent text-slate-500"
    }
    `}
    >
      <Icon size={20} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default Category;
