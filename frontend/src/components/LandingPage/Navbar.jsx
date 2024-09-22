import React , {useEffect , useState} from "react";
import TopNavbar from "./Navbars/TopNavbar";
import HamburgerNav from "./Navbars/HamburgerNav";

function Navbar() {
  const [menuBar, setMenuBar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loadDelay, setLoadDelay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add window resize event listener
    window.addEventListener("resize", handleResize);

    const loadDelayTimeout = setTimeout(() => {
      setLoadDelay(true);
    }, 1700);

    return () => {
      // Remove window resize event listener on component unmount
      window.removeEventListener("resize", handleResize);
      clearTimeout(loadDelayTimeout);
    };
  });

  useEffect(() => {
    if (screenWidth <= 768) {
      setMenuBar(true);
    } else {
      setMenuBar(false);
    }
  }, [screenWidth]);

  return (
    <header
      className={`absolute w-full top-0 right-0 left-0 z-10 block transition-all duration-[2000ms] ease-in-out ${
        loadDelay ? "opacity-100" : "opacity-0"
      } `}
    >
      {!menuBar ? <TopNavbar></TopNavbar> : <HamburgerNav></HamburgerNav>}
    </header>
  );
}

export default Navbar;
