import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { motion } from "framer-motion";
import { Logo } from "../ui/Logo";
import { useEffect, useState } from 'react'
import { Switch } from "../ui/switch";

interface NavBarProps {
  onContactClick: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isServicesPage = location.pathname === "/services" || location.pathname === '/startaproject';
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

    // Close sheet when the route changes
    useEffect(() => {
      setIsOpen(false);
    }, [location.pathname, setIsOpen]);

  return (
    <motion.nav
      initial={{ backgroundColor: "rgba(20,0,33, .7)", boxShadow: "none" }}
      animate={{
        backgroundColor: isServicesPage
          ? scrolled
            ? "rgba(255,255,255, .9)"
            : "rgba(255,255,255, 1)"
          : scrolled
            ? "rgba(20,0,33, .9)"
            : "rgba(20,0,33, 0)",
        boxShadow: scrolled ? "0px 4px 10px rgba(0, 0, 0, 0.2)" : "none",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full px-4 sm:px-6  md:px-8 lg:px-40 py-10 sm:py-4 flex items-center justify-between"
    >
      <Logo isServicePage={isServicesPage} />

      <ul className="hidden lg:flex items-center space-x-6 xl:space-x-14">
        {["About", "Services"].map((item, index) => {
          const itemPath = `/${item.toLowerCase()}`;
          const isActive = location.pathname === itemPath;

          return (
            <motion.li key={index} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
              <Link
                to={itemPath}
                className={`relative text-sm md:text-base tracking-wider capitalize whitespace-nowrap transition-all duration-300 
                  ${isServicesPage ? "text-black" : "text-white"} 
                  ${isActive ? "font-bold text-[#870a81]" : "opacity-80 hover:opacity-100"}`}
              >
                {item}
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 bottom-0 w-full h-[2px] bg-[#870a81]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </motion.li>
          );
        })}

        <motion.li whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
          <button
            onClick={onContactClick}
            className={`text-sm md:text-base tracking-wider whitespace-nowrap transition-all opacity-80 hover:opacity-100 duration-300 ${isServicesPage ? "text-black" : "text-white"
              }`}
          >
            Contact
          </button>
        </motion.li>

        <motion.li whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
          <div className="flex items-center gap-2">
            {darkMode ? (
              <Moon  className={`w-5 h-5 ${isServicesPage ? "text-black" : "text-white"}`}  />
            ) : (
              <Sun className={`w-5 h-5 ${isServicesPage ? "text-black" : "text-white"}`} />
            )}
            <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} />
          </div>

        </motion.li>
      </ul>

      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }} className="hidden sm:block">
        <Link
          to="/startaproject"
          className="text-white text-sm md:text-base tracking-wider bg-[#870a81] px-4 sm:px-5 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-[#9c1396] whitespace-nowrap"
        >
          Start a Project
        </Link>
      </motion.div>

      {/* MOBILE NAVIGATION */}
      <Sheet open={isOpen} onOpenChange={setIsOpen} >
        <SheetTrigger className="lg:hidden">
          <Menu className={`w-6 h-6 ${isServicesPage ? 'text-black' : 'text-white'}  `} />
        </SheetTrigger>

        <SheetContent side="right" className="w-[80vw] sm:w-[300px] bg-gray-900">
          <SheetHeader />
          <ul className="flex flex-col space-y-6 p-4 sm:p-6 mt-8">
            {["About", "Services"].map((item, index) => {
              const itemPath = `/${item.toLowerCase()}`;
              const isActive = location.pathname === itemPath;

              return (
                <motion.li key={index} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                  <Link
                    to={itemPath}
                    className={`text-white text-base sm:text-lg font-semibold uppercase tracking-wider hover:opacity-80 transition-all duration-300 block ${isActive ? "text-[#870a81]" : ""
                      }`}
                  >
                    {item}
                  </Link>
                </motion.li>
              );
            })}

            <motion.li initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
              <button onClick={()=>{ onContactClick(); setIsOpen(false)}} className="text-white text-base sm:text-lg font-semibold uppercase tracking-wider hover:opacity-80 transition-all duration-300">
                Contact
              </button>
            </motion.li>

            <motion.li whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 200 }}>
              <div className="flex items-center gap-2">
                {darkMode ? <Moon className="w-5 h-5 text-black" /> : <Sun className="w-5 h-5 text-black" />}
                <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} />
              </div>
            </motion.li>

            <motion.li initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="sm:hidden">
              <Link to="/startaproject" className="text-white text-base font-semibold uppercase tracking-wider hover:opacity-80 transition-all duration-300 bg-[#870a81] px-4 py-2 rounded-full block text-center">
                Start a Project
              </Link>
            </motion.li>
          </ul>
        </SheetContent>
      </Sheet>
    </motion.nav>
  );
};
