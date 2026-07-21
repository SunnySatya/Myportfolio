import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for IntersectionObserver with callback
 * @param {Object} options - Observer options
 * @param {number} options.threshold - Visibility threshold
 * @param {string} options.rootMargin - Margin around root
 * @param {Function} callback - Optional callback when intersection changes
 * @returns {Array} [ref, isIntersecting, entry]
 */
const useIntersectionObserver = ({
  threshold = 0,
  rootMargin = "0px",
  callback = null,
} = {}) => {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setEntry(entry);
        if (callback) callback(entry);
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, callback]);

  return [ref, isIntersecting, entry];
};

export default useIntersectionObserver;
