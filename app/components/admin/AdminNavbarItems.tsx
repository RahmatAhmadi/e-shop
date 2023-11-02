import { IconType } from "react-icons";

interface AdminNavbarItemsProps {
  selected?: boolean;
  icon: IconType;
  label: string;
  isMediumOrSmaller: boolean;
}

const AdminNavbarItems: React.FC<AdminNavbarItemsProps> = ({
  selected,
  icon: Icon,
  label,
  isMediumOrSmaller,
}) => {
  return (
    <div
      className={`
  flex
  items-center
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
      <div
        className="
      text-medium
      text-sm
      text-center
      break-normal
      "
      >
        {label}
      </div>
    </div>
  );
};

export default AdminNavbarItems;
