Run bun run build
$ tsc -b && vite build
src/components/CurvedLoop.tsx(1,55): error TS1484: 'FC' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
src/components/CurvedLoop.tsx(1,59): error TS1484: 'PointerEvent' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled.
src/components/Dock.tsx(84,84): error TS2769: No overload matches this call.
  The last overload gave the following error.
    Object literal may only specify known properties, and 'isHovered' does not exist in type 'Partial<unknown> & Attributes'.
src/components/Squares.tsx(23,3): error TS6133: 'hoverFillColor' is declared but its value is never read.
src/lib/sheets.ts(9,2): error TS6133: 'TechStackSchema' is declared but its value is never read.
src/pages/Achievements.tsx(62,5): error TS2322: Type '({ name: string; label: string; ariaLabel: string; options: { label: string; value: string; }[]; setValue: Dispatch<SetStateAction<string>>; value: string; } | { name: string; ... 5 more ...; value: string; } | undefined)[]' is not assignable to type '{ name: string; label: string; ariaLabel?: string | undefined; defaultValue?: string | undefined; options: { label: string; value: string; sortingMethod?: ((a: { [x: string]: string; name: string; ... 5 more ...; images: string[]; }, b: { ...; }) => number) | undefined; }[]; setValue: Dispatch<...>; value: string; }[]'.
  Type '{ name: string; label: string; ariaLabel: string; options: { label: string; value: string; }[]; setValue: Dispatch<SetStateAction<string>>; value: string; } | { name: string; ... 5 more ...; value: string; } | undefined' is not assignable to type '{ name: string; label: string; ariaLabel?: string | undefined; defaultValue?: string | undefined; options: { label: string; value: string; sortingMethod?: ((a: { [x: string]: string; name: string; ... 5 more ...; images: string[]; }, b: { ...; }) => number) | undefined; }[]; setValue: Dispatch<...>; value: string; }'.
    Type 'undefined' is not assignable to type '{ name: string; label: string; ariaLabel?: string | undefined; defaultValue?: string | undefined; options: { label: string; value: string; sortingMethod?: ((a: { [x: string]: string; name: string; ... 5 more ...; images: string[]; }, b: { ...; }) => number) | undefined; }[]; setValue: Dispatch<...>; value: string; }'.
src/pages/Blog.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
src/pages/Blog.tsx(2,18): error TS6133: 'AnimatePresence' is declared but its value is never read.
src/pages/Profile.tsx(9,2): error TS6133: 'Globe' is declared but its value is never read.
src/pages/Profile.tsx(10,2): error TS6133: 'TerminalSquare' is declared but its value is never read.
src/pages/Profile.tsx(11,2): error TS6133: 'ExternalLink' is declared but its value is never read.
src/pages/Profile.tsx(12,2): error TS6133: 'BrainCircuit' is declared but its value is never read.
src/pages/Profile.tsx(16,1): error TS6133: 'ListCards' is declared but its value is never read.
src/pages/Profile.tsx(17,1): error TS6133: 'Button' is declared but its value is never read.
src/pages/Profile.tsx(18,1): error TS6133: 'ImagesSlider' is declared but its value is never read.
src/pages/Profile.tsx(19,1): error TS6133: 'DetailsModal' is declared but its value is never read.
src/pages/Profile.tsx(20,1): error TS6133: 'IframeMedia' is declared but its value is never read.
src/pages/Profile.tsx(69,28): error TS6133: 'progress' is declared but its value is never read.
src/pages/Projects.tsx(1,8): error TS6133: 'React' is declared but its value is never read.
src/pages/TechStack.tsx(28,64): error TS6133: 'currentLang' is declared but its value is never read.
src/pages/TechStack.tsx(42,28): error TS6133: 'progress' is declared but its value is never read.
src/pages/TechStack.tsx(76,7): error TS2304: Cannot find name 'categories'.
src/pages/TechStack.tsx(76,23): error TS7006: Parameter 'category' implicitly has an 'any' type.
src/pages/TechStack.tsx(76,33): error TS7006: Parameter 'categoryIndex' implicitly has an 'any' type.
Error: Process completed with exit code 2.