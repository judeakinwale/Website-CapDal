export const splitTitle = (text: string): string[] => {
  // split text by special characters like , & : ;
  const reg = /[,&:;]/i;
  return text?.split(reg);
};

export const joinTitle = (text: string[]): string => {
  // join text with "&"
  return text?.join(" & ");
};
