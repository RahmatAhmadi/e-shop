import { AiOutlineDesktop, AiOutlineLaptop } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { MdOutlineKeyboard, MdStorefront, MdTv, MdWatch } from "react-icons/md";

export const categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Phone",
    icon: BsPhone,
  },
  {
    label: "Laptop",
    icon: AiOutlineLaptop,
  },
  {
    label: "Desktop",
    icon: AiOutlineDesktop,
  },
  {
    label: "Watch",
    icon: MdWatch,
  },
  {
    label: "TV",
    icon: MdTv,
  },
  {
    label: "Accessories",
    icon: MdOutlineKeyboard,
  },
];
