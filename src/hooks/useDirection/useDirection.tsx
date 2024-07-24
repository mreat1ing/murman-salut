import { useState, useRef, useEffect } from 'react';

const useDirection = () => {
  const prevScroll = useRef(window.scrollY);
  const prevDirection = useRef<string>();
  const isBlocked = useRef(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollPosition, setScrollPosition] = useState(window.scrollY);

  useEffect(() => {
    const updateScroll = () => {
      const currScroll = window.scrollY;

      if (prevScroll.current > currScroll && scrollDirection === 'down')
        setScrollDirection('up');
      else if (prevScroll.current < currScroll && scrollDirection === 'up')
        setScrollDirection('down');
      if (currScroll <= 1 || prevDirection.current !== scrollDirection) {
        setScrollPosition(currScroll);
        prevScroll.current = currScroll;
        prevDirection.current = scrollDirection;
      }

      prevScroll.current = currScroll;
      isBlocked.current = false;
    };

    const onScroll = () => {
      if (!isBlocked.current) {
        isBlocked.current = true;
        window.requestAnimationFrame(updateScroll);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => removeEventListener('scroll', onScroll);
  }, [scrollDirection, scrollPosition]);

  return [scrollDirection, scrollPosition];
};

export default useDirection;
