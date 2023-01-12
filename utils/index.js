export const simplifyUrl = (url, section = "hostname") => new URL(url)[section];

export const getBrush = () => {
  const brushes = Array.from({ length: 10 }, (_, index) => index + 1);
  return brushes[Math.floor(Math.random() * brushes.length)];
};

export const brushStroke = (color, brush) => ({
  background: `url("http://s2.svgbox.net/pen-brushes.svg?ic=brush-${brush}&color=${color.replace(
    "#",
    ""
  )}")`,
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
});
