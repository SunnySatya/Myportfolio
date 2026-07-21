import { useEffect, useRef } from "react";

/**
 * Custom hook for scroll reveal animations using IntersectionObserver
 * @param {Object} options - Observer options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Margin around root
 * @param {boolean} options.once - Animate only once (default: true)
 * @returns {React.RefObject} Ref to attach to the element
 */
const useScrollReveal = ({
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  once = true,
} = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("visible");
          if (once) observer.unobserve(element);
        } else if (!once) {
          element.classList.remove("visible");
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
};

export default useScrollReveal;
