export const simplifyUrl = (url) => {
  if (!url) return url;
  const { hostname, pathname } = new URL(url);

  return `${hostname.replace("www.", "")}${pathname !== "/" ? pathname : ""}`;
};

export const getBrush = () => {
  const brushes = [9, 10];
  return brushes[Math.floor(Math.random() * brushes.length)];
};

export const brushStroke = (color, brush) => ({
  background: `url("https://s2.svgbox.net/pen-brushes.svg?ic=brush-${brush}&color=${color.replace(
    "#",
    ""
  )}")`,
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
});
