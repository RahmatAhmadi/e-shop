import { IconType } from "react-icons";

interface AdminNavbarItemsProps {
  selected?: boolean;
  icon: IconType;
  label: string;
}

const AdminNavbarItems: React.FC<AdminNavbarItemsProps> = ({
  selected,
  icon: Icon,
  label,
}) => {
  return (
    <div
      className={`
  flex
  items-center
  justify-center
  text-center
  gap-1
  p-2
  border-b-2
  hover:text-slate-800
  transition
  cursor-pointer
  ${
    selected
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
