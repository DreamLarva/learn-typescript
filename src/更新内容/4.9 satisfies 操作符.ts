/**
 * 给予对象字面量 类型约束, 会丢失部分原来可以识别的类型
 * */
{
  type Colors = "red" | "green" | "blue";

  type RGB = [red: number, green: number, blue: number];

  const palette: Record<Colors, string | RGB> = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0, 255],
    // bleu: [0, 0, 255],
    //  ~~~~ The typo is now correctly detected
  };

  // But we now have an undesirable error here - 'palette.red' "could" be a string.
  const redComponent = palette.red.at(0);
}
/**
 * 符合 Record<string, string | RGB>;
 * 又保持字面量的类型
 * */
{
  type RGB = [red: number, green: number, blue: number];

  const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    // blue: [0, 0] //    ~~~~~~ error!
  } satisfies Record<string, string | RGB> ;

// Information about each property is still maintained.
  const redComponent = palette.red.at(0);
  const greenNormalized = palette.green.toUpperCase();
}

