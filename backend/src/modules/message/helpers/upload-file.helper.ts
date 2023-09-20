import { extname } from "path";

export const generateFileName = (filename: string) => {
  const name = filename.split(".")[0];
  const fileExtName = extname(filename);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join("");

  return `${name}-${randomName}${fileExtName}`;
};
