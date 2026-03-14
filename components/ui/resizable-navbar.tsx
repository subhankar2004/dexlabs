"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";
import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose?: () => void;
}


export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 60);
  });

  return (
    <div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<any>, { visible });
      })}
    </div>
  );
};


export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      initial={{
        backgroundColor: "rgba(0,0,0,0)",
        backdropFilter: "none",
        boxShadow: "none",
        width: "100%",
        marginTop: "0px",
        borderRadius: "0px",
      }}
      animate={{
        width: visible ? "60%" : "100%",
        marginTop: visible ? "16px" : "0px",
        borderRadius: visible ? "10px" : "0px",
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.04)"
          : "rgba(0, 0, 0, 0)",
        backdropFilter: visible
          ? "blur(32px) saturate(200%) brightness(1.1)"
          : "blur(0px)",
        boxShadow: visible
          ? "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.05), inset 1px 0 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.12)"
          : "none",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 40 }}
      style={{
        WebkitBackdropFilter: visible
          ? "blur(32px) saturate(200%) brightness(1.1)"
          : "none",
      }}
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-7xl flex-row items-center justify-between px-5 py-3 lg:flex",
        className
      )}
    >
      {children}
    </motion.div>
  );
};


export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 items-center justify-center space-x-1 lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-1.5 text-[15px] font-[450] tracking-[-0.01em] text-white/80 transition-colors duration-150 hover:text-white"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hover"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};


export const MobileNav = ({ children, className, visible }: MobileNavProps) => (
  <motion.div
    initial={{
      backgroundColor: "rgba(0,0,0,0)",
      backdropFilter: "blur(0px)",
      boxShadow: "none",
      width: "100%",
      marginTop: "0px",
      borderRadius: "0px",
    }}
    animate={{
      backdropFilter: visible
        ? "blur(32px) saturate(200%) brightness(1.1)"
        : "blur(0px)",
      backgroundColor: visible
        ? "rgba(255, 255, 255, 0.04)"
        : "rgba(0, 0, 0, 0)",
      width: visible ? "92%" : "100%",
      marginTop: visible ? "10px" : "0px",
      borderRadius: visible ? "24px" : "0px",
      boxShadow: visible
        ? "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(255,255,255,0.12)"
        : "none",
    }}
    transition={{ type: "spring", stiffness: 280, damping: 40 }}
    style={{
      WebkitBackdropFilter: visible
        ? "blur(32px) saturate(200%) brightness(1.1)"
        : "none",
    }}
    className={cn(
      "relative z-50 mx-auto flex w-full flex-col items-center px-4 py-2.5 lg:hidden",
      className
    )}
  >
    {children}
  </motion.div>
);


export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => (
  <div className={cn("flex w-full items-center justify-between", className)}>
    {children}
  </div>
);


export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        style={{ WebkitBackdropFilter: "blur(32px) saturate(200%)" }}
        className={cn(
          "absolute inset-x-0 top-16 z-50 mx-4 flex flex-col gap-1 rounded-2xl px-3 py-4",
          "backdrop-blur-2xl bg-white/[0.07]",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_32px_rgba(0,0,0,0.4),0_0_0_0.5px_rgba(255,255,255,0.1)]",
          className
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);


export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) =>
  isOpen ? (
    <IconX className="text-white/80" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-white/80" onClick={onClick} />
  );


export const NavbarLogo = () => (
  <a href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1">
    <Image src="/dexlab.png" alt="DexLabs logo" width={54} height={54} />
    <span className="font-medium text-black dark:text-white">Dexlabs</span>
  </a>
);


type NavbarButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
};

export const NavbarButton = ({
  href,
  children,
  className,
  variant = "primary",
}: NavbarButtonProps) => {
  const base =
    "px-4 py-2 rounded-[5px] text-sm font-bold inline-block text-center hover:-translate-y-0.5 transition";

  const variants = {
    primary: "bg-white text-black shadow",
    secondary: "bg-transparent text-white",
    dark: "bg-black text-white shadow-md",
    gradient: "bg-gradient-to-b from-blue-500 to-blue-700 text-white",
  };

  return (
    <a href={href} className={cn(base, variants[variant], className)}>
      {children}
    </a>
  );
};