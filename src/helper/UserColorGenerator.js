import chroma from "chroma-js";

export default function userColorGenrator(min, max, input, minColor, maxColor) {
  const color = chroma.scale([minColor, maxColor, "black"]);

  const weight = (input - min) / (max - min);

  console.log(weight);

  return color(weight).toString();
}
