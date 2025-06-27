import React from "react";
import { Link } from "react-router-dom";
import movieflix_logo from "../../assets/movieflix-logo.png";
import Menu from "./Menu";
import { ProfileMenu } from "../Navigation/ProfileMenu";
import NotificationsNoneSharpIcon from "@mui/icons-material/NotificationsNoneSharp";
import NotificationsSharpIcon from "@mui/icons-material/NotificationsSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

const Header = () => {
  const [scroll, setScroll] = React.useState(false);
  const [over, setOver] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${scroll ? "fixed top-0 bg-black/80 backdrop-blur-sm" : "relative top-0 bg-transparent"} z-50 flex w-full min-w-[320px] items-center justify-between px-4 py-3 transition-all duration-300 sm:px-8 sm:py-4`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <Link to="/" reloadDocument>
          <img
            src={movieflix_logo}
            alt="MovieFlix Logo"
            className="w-[150px] sm:max-w-[110px]"
          />
        </Link>
        <Menu />
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-around gap-4 px-4 md:gap-6">
        <SearchSharpIcon className="text-gray-300 hover:cursor-pointer" />
        <Link
          className="text-gray-300 hover:cursor-pointer"
          onMouseOver={() => setOver(true)}
          onMouseOut={() => setOver(false)}
        >
          {over ? <NotificationsSharpIcon /> : <NotificationsNoneSharpIcon />}
        </Link>
        <ProfileMenu />
      </div>
    </header>
  );
};

export default Header;
