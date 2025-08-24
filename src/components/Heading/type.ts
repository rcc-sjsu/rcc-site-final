export type headingProps = {
  headingTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  className?: string;
  children: React.ReactNode;
  customStyle?: React.CSSProperties;
  align?: "left" | "center";
  logoPath?: string;
  logoAlign?: "left" | "right";
  logoSize?: number;
}


