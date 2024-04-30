import React from "react";
import { cn } from "../utils/cn";

const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "w-[100vw] relative flex flex-col h-[100vh] items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
            [--white-gradient:repeating-linear-gradient(100deg, var(--white) 0%, var(--white) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--white) 16%)]
            [--dark-gradient:repeating-linear-gradient(100deg, var(--black) 0%, var(--black) 7%, var(--transparent) 10%, var(--transparent) 12%, var(--black) 16%)]
            [--aurora:repeating-linear-gradient(100deg, var(--blue-500) 10%, var(--indigo-300) 15%, var(--blue-300) 20%, var(--violet-200) 25%, var(--blue-400) 30%)]
            [background-image: var(--white-gradient), var(--aurora)]
            dark:[background-image: var(--dark-gradient), var(--aurora)]
            [background-size: 300%, 200%]
            [background-position: 50% 50%, 50% 50%]
            filter: blur(10px) invert;
            dark:invert-0;
            after:content-[""];
            after:absolute;
            after:inset-0;
            after:[background-image: var(--white-gradient), var(--aurora)]; 
            after:dark:[background-image: var(--dark-gradient), var(--aurora)];
            after:[background-size: 200%, 100%]; 
            after:animate-aurora;
            after:[background-attachment: fixed];
            after:mix-blend-difference;
            pointer-events-none;
            absolute -inset-[10px];
            opacity-50;
            will-change: transform;`,

              showRadialGradient &&
                `[mask-image: radial-gradient(ellipse at 100% 0%, black 10%, var(--transparent) 70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};

export default AuroraBackground;
