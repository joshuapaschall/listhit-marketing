import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  href?: string;
};

export function Button({ children, variant = "primary", href, className = "", ...props }: Props) {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
