import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";

export function NavigationMenu() {
  return (
    <div className="relative z-[999] md:hidden">
      <Menu
        animate={{
          mount: { y: 10 },
          unmount: { y: 0 },
        }}
      >
        <MenuHandler>
          <Button className="flex h-7 w-fit flex-row items-center justify-center gap-1 bg-transparent px-1 py-1 text-xs text-white">
            <span>Browse</span>
            <ArrowDropDownIcon fontSize="small" />
          </Button>
        </MenuHandler>

        <MenuList className="z-[999] flex w-3/5 flex-col items-center justify-center gap-3 rounded-md border-0 bg-black/45 p-3 shadow-md backdrop-blur-md">
          {["Home", "TV Shows", "Categories"].map((item) => (
            <MenuItem key={item} className="text-md font-md text-white">
              <Link to="/">{item}</Link>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}
