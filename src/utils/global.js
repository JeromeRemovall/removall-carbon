export const isMobile = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

export const isInViewport = (element) => {
  const rect = element?.getBoundingClientRect();
  return (
    (rect?.top <= 0 + 60 && rect?.bottom >= 0) ||
    (rect?.top >= 0 - 60 && rect?.bottom <= 0)
  );
};
