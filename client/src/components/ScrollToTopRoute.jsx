import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTopRoute - Resets the page scroll position to the top
 * whenever the route (pathname) changes. This ensures pages like
 * Login/Register always open from the top even if the user was
 * scrolled down on the previous page.
 */
const ScrollToTopRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTopRoute;
