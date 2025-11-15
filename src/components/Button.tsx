import { memo } from "react";
import { motion, type Variants } from "framer-motion";
import { tooltipVariants as defaultTooltipVariants } from "./NavBarVariants";

interface ButtonProps {
  href?: string;
  ariaLabel?: string;
  parentVariance?: Variants;
  tooltipVariants?: Variants;
  tooltip?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: string | boolean | Variants | React.ReactNode | (() => void) | undefined;
}

const defaultParentVariance = {
  hidden: {
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.2 },
  },
  visible: {
    scale: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.2 },
  },
};

function Button(props: ButtonProps) {
  const {
    href,
    children,
    className,
    parentVariance,
    tooltipVariants,
    ariaLabel,
    tooltip,
    ...rest
  } = props;

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      initial="hidden"
      aria-label={ariaLabel}
      whileHover="visible"
      variants={parentVariance || defaultParentVariance}
      className={`inline-flex items-center justify-center rounded-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] bg-white dark:bg-zinc-900 text-black dark:text-white w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm gap-1 sm:gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-white dark:focus-visible:ring-offset-zinc-900 ${className || ""}`}
      {...(href
        ? {
            href,
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      {...rest}
    >
      {tooltip && (
        <motion.div
          variants={tooltipVariants || defaultTooltipVariants}
          className="px-1.5 py-1 absolute -top-12 left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-800 rounded-md border-2 border-zinc-900 dark:border-zinc-300 after:content-[''] after:absolute after:-bottom-1/2 after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-zinc-900 dark:after:border-t-zinc-300"
        >
          <span className="text-sm font-bold text-nowrap uppercase">{tooltip}</span>
        </motion.div>
      )}

      {children}
    </Component>
  );
}

export default memo(Button, (prevProps, nextProps) => {
  return (
    prevProps.href === nextProps.href &&
    prevProps.className === nextProps.className &&
    prevProps.tooltip === nextProps.tooltip &&
    prevProps.ariaLabel === nextProps.ariaLabel
  );
});
