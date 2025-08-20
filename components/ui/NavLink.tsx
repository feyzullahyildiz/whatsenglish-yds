import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  activeClassName?: string;
  className?: string;
  exact?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  activeClassName = "",
  className = "",
  exact = false,
  ...props
}) => {
  const pathname = usePathname();
  // If href is an object, get its pathname
  const linkPath = typeof href === "string" ? href : href.pathname || "";
  const isActive = exact
    ? pathname === linkPath
    : pathname.startsWith(linkPath);
  const combinedClassName = isActive
    ? `${className} ${activeClassName}`.trim()
    : className;

  return <Link href={href} className={combinedClassName} {...props} />;
};
