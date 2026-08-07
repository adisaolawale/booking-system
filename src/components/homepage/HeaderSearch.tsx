"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  X,
  CornerDownLeft,
  SearchX,
  Building2,
  Tag,
} from "lucide-react";
import { searchAll, type SearchResults } from "@/lib/actions/search";

type Phase = "hint" | "loading" | "results";
type Tab = "all" | "business" | "services";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "business", label: "Business" },
  { id: "services", label: "Services" },
];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("hint");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleChange(value: string) {
    setQuery(value);

    if (value.length === 0) {
      setIsOpen(false);
      setPhase("hint");
      setResults(null);
      return;
    }

    setIsOpen(true);
    setPhase("hint");
  }

  async function runSearch() {
    if (!query.trim()) return;
    setPhase("loading");
    const data = await searchAll(query);
    setResults(data);
    setActiveTab("all");
    setPhase("results");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleCancel() {
    setQuery("");
    setIsOpen(false);
    setPhase("hint");
    setResults(null);
    inputRef.current?.focus();
  }

  function handleFocus() {
    if (query.length > 0) setIsOpen(true);
  }

  function closeOverlay() {
    setIsOpen(false);
  }

  const businesses = results?.businesses ?? [];
  const services = results?.services ?? [];
  const totalCount = businesses.length + services.length;
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);

  // Empty is evaluated per-tab, not just "both are empty" — a business
  // match with zero services shouldn't leave the Services tab blank when
  // you switch to it, it should say so.
  const isEmpty =
    (activeTab === "all" && totalCount === 0) ||
    (activeTab === "business" && businesses.length === 0) ||
    (activeTab === "services" && services.length === 0);

  return (
    <div ref={wrapperRef} className="relative hidden max-w-xs flex-1 md:block">
      <Search
        size={15}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder="Search services or studios..."
        className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
      />
      {query.length > 0 && (
        <button
          type="button"
          onClick={handleCancel}
          aria-label="Cancel search"
          className="absolute right-2.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
        >
          <X size={13} />
        </button>
      )}

      {isOpen && (
        <>
          {/* Backdrop — full viewport below the header */}
          <div
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-foreground/10 animate-in fade-in duration-200"
            onClick={closeOverlay}
          />

          {/* Fixed + centered against the viewport, not anchored to the
              (narrow, off-center) input wrapper anymore. */}
          <div className="fixed left-1/2 top-20 z-50 w-[min(90vw,480px)] -translate-x-1/2 rounded-2xl border border-border bg-card shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            {phase === "hint" && (
              <div className="flex items-center justify-center gap-2 px-5 py-8 text-sm text-muted-foreground">
                <CornerDownLeft size={14} />
                Press Enter to search
              </div>
            )}

            {phase === "loading" && (
              <div className="flex flex-col gap-2 p-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-12 animate-pulse rounded-xl bg-muted"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            )}

            {phase === "results" && (
              <div>
                <div className="flex justify-center border-b border-border p-3">
                  <div className="relative inline-flex rounded-full border border-border bg-muted p-1">
                    <span
                      aria-hidden
                      className="absolute inset-y-1 left-1 rounded-full bg-primary transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
                      style={{
                        width: `calc(${100 / TABS.length}% - 2px)`,
                        transform: `translateX(${activeIndex * 100}%)`,
                      }}
                    />
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative z-10 w-20 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${
                          activeTab === tab.id
                            ? "text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  key={activeTab}
                  className="max-h-80 overflow-y-auto p-3 animate-in fade-in duration-200"
                >
                  {isEmpty ? (
                    <div className="flex flex-col items-center gap-2 px-5 py-8 text-center">
                      <SearchX size={18} className="text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No results for &ldquo;{query}&rdquo;
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {(activeTab === "all" || activeTab === "business") &&
                        businesses.length > 0 && (
                          <div>
                            {activeTab === "all" && (
                              <p className="mb-1.5 px-2 text-xs font-medium text-muted-foreground">
                                Businesses
                              </p>
                            )}
                            <div className="flex flex-col gap-1">
                              {(activeTab === "all" ? businesses.slice(0, 4) : businesses).map(
                                (b) => (
                                  <Link
                                    key={b.id}
                                    href={`/b/${b.slug}`}
                                    onClick={closeOverlay}
                                    className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
                                  >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xs font-semibold text-background">
                                      {initials(b.name)}
                                    </div>
                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-medium text-foreground">
                                        {b.name}
                                      </p>
                                      {b.description && (
                                        <p className="truncate text-xs text-muted-foreground">
                                          {b.description}
                                        </p>
                                      )}
                                    </div>
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {(activeTab === "all" || activeTab === "services") &&
                        services.length > 0 && (
                          <div>
                            {activeTab === "all" && (
                              <p className="mb-1.5 px-2 text-xs font-medium text-muted-foreground">
                                Services
                              </p>
                            )}
                            <div className="flex flex-col gap-1">
                              {(activeTab === "all" ? services.slice(0, 4) : services).map(
                                (s) => (
                                  <Link
                                    key={s.id}
                                    href={`/b/${s.businessSlug}/book?service=${s.id}`}
                                    onClick={closeOverlay}
                                    className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
                                  >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
                                      <Tag size={14} className="text-primary" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm font-medium text-foreground">
                                        {s.title}
                                      </p>
                                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                                        <Building2 size={11} />
                                        {s.businessName}
                                      </p>
                                    </div>
                                    <span className="shrink-0 font-mono text-xs text-muted-foreground">
                                      ${(s.price / 100).toFixed(2)}
                                    </span>
                                  </Link>
                                )
                              )}
                            </div>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}


// "use client";

// import { useEffect, useRef, useState } from "react";
// import Link from "next/link";
// import {
//   Search,
//   X,
//   CornerDownLeft,
//   SearchX,
//   Building2,
//   Tag,
// } from "lucide-react";
// import { searchAll, type SearchResults } from "@/lib/actions/search";

// type Phase = "hint" | "loading" | "results";
// type Tab = "all" | "business" | "services";

// const TABS: { id: Tab; label: string }[] = [
//   { id: "all", label: "All" },
//   { id: "business", label: "Business" },
//   { id: "services", label: "Services" },
// ];

// function initials(name: string) {
//   return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
// }

// export function HeaderSearch() {
//   const [query, setQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [phase, setPhase] = useState<Phase>("hint");
//   const [results, setResults] = useState<SearchResults | null>(null);
//   const [activeTab, setActiveTab] = useState<Tab>("all");

//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Click outside closes the overlay, but keeps whatever was typed —
//   // only "Cancel" clears the actual text.
//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
//         setIsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   function handleChange(value: string) {
//     setQuery(value);

//     if (value.length === 0) {
//       // Backspaced to empty — close entirely, per spec.
//       setIsOpen(false);
//       setPhase("hint");
//       setResults(null);
//       return;
//     }

//     setIsOpen(true);
//     // Any edit invalidates whatever results were showing — needs a fresh
//     // Enter before it searches again.
//     setPhase("hint");
//   }

//   async function runSearch() {
//     if (!query.trim()) return;
//     setPhase("loading");
//     const data = await searchAll(query);
//     setResults(data);
//     setActiveTab("all");
//     setPhase("results");
//   }

//   function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       runSearch();
//     }
//     if (e.key === "Escape") {
//       setIsOpen(false);
//     }
//   }

//   function handleCancel() {
//     setQuery("");
//     setIsOpen(false);
//     setPhase("hint");
//     setResults(null);
//     inputRef.current?.focus();
//   }

//   function handleFocus() {
//     if (query.length > 0) setIsOpen(true);
//   }

//   function closeOverlay() {
//     setIsOpen(false);
//   }

//   const businesses = results?.businesses ?? [];
//   const services = results?.services ?? [];
//   const totalCount = businesses.length + services.length;
//   const activeIndex = TABS.findIndex((t) => t.id === activeTab);

//   return (
//     <div ref={wrapperRef} className="relative hidden max-w-xs flex-1 md:block">
//       <Search
//         size={15}
//         className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
//       />
//       <input
//         ref={inputRef}
//         type="text"
//         value={query}
//         onChange={(e) => handleChange(e.target.value)}
//         onKeyDown={handleKeyDown}
//         onFocus={handleFocus}
//         placeholder="Search services or studios..."
//         className="w-full rounded-full border border-border bg-muted py-2 pl-9 pr-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
//       />
//       {query.length > 0 && (
//         <button
//           type="button"
//           onClick={handleCancel}
//           aria-label="Cancel search"
//           className="absolute right-2.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-border hover:text-foreground"
//         >
//           <X size={13} />
//         </button>
//       )}

//       {isOpen && (
//         <>
//           {/* Backdrop — dims the rest of the page, click closes but doesn't clear text */}
//           <div
//             className="fixed inset-x-0 bottom-0 top-16 z-40 bg-foreground/10 animate-in fade-in duration-200"
//             onClick={closeOverlay}
//           />

//           <div className="absolute left-0 right-0 top-full z-50 mt-2 min-w-[380px] rounded-2xl border border-border bg-card shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
//             {phase === "hint" && (
//               <div className="flex items-center justify-center gap-2 px-5 py-8 text-sm text-muted-foreground">
//                 <CornerDownLeft size={14} />
//                 Press Enter to search
//               </div>
//             )}

//             {phase === "loading" && (
//               <div className="flex flex-col gap-2 p-4">
//                 {[0, 1, 2].map((i) => (
//                   <div
//                     key={i}
//                     className="h-12 animate-pulse rounded-xl bg-muted"
//                     style={{ animationDelay: `${i * 100}ms` }}
//                   />
//                 ))}
//               </div>
//             )}

//             {phase === "results" && (
//               <div>
//                 <div className="flex justify-center border-b border-border p-3">
//                   <div className="relative inline-flex rounded-full border border-border bg-muted p-1">
//                     <span
//                       aria-hidden
//                       className="absolute inset-y-1 left-1 rounded-full bg-primary transition-transform duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]"
//                       style={{
//                         width: `calc(${100 / TABS.length}% - 2px)`,
//                         transform: `translateX(${activeIndex * 100}%)`,
//                       }}
//                     />
//                     {TABS.map((tab) => (
//                       <button
//                         key={tab.id}
//                         type="button"
//                         onClick={() => setActiveTab(tab.id)}
//                         className={`relative z-10 w-20 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${
//                           activeTab === tab.id
//                             ? "text-primary-foreground"
//                             : "text-muted-foreground hover:text-foreground"
//                         }`}
//                       >
//                         {tab.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div
//                   key={activeTab}
//                   className="max-h-80 overflow-y-auto p-3 animate-in fade-in duration-200"
//                 >
//                   {totalCount === 0 ? (
//                     <div className="flex flex-col items-center gap-2 px-5 py-8 text-center">
//                       <SearchX size={18} className="text-muted-foreground" />
//                       <p className="text-sm text-muted-foreground">
//                         No results for &ldquo;{query}&rdquo;
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-4">
//                       {(activeTab === "all" || activeTab === "business") &&
//                         businesses.length > 0 && (
//                           <div>
//                             {activeTab === "all" && (
//                               <p className="mb-1.5 px-2 text-xs font-medium text-muted-foreground">
//                                 Businesses
//                               </p>
//                             )}
//                             <div className="flex flex-col gap-1">
//                               {(activeTab === "all" ? businesses.slice(0, 4) : businesses).map(
//                                 (b) => (
//                                   <Link
//                                     key={b.id}
//                                     href={`/b/${b.slug}`}
//                                     onClick={closeOverlay}
//                                     className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
//                                   >
//                                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground font-heading text-xs font-semibold text-background">
//                                       {initials(b.name)}
//                                     </div>
//                                     <div className="min-w-0">
//                                       <p className="truncate text-sm font-medium text-foreground">
//                                         {b.name}
//                                       </p>
//                                       {b.description && (
//                                         <p className="truncate text-xs text-muted-foreground">
//                                           {b.description}
//                                         </p>
//                                       )}
//                                     </div>
//                                   </Link>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         )}

//                       {(activeTab === "all" || activeTab === "services") &&
//                         services.length > 0 && (
//                           <div>
//                             {activeTab === "all" && (
//                               <p className="mb-1.5 px-2 text-xs font-medium text-muted-foreground">
//                                 Services
//                               </p>
//                             )}
//                             <div className="flex flex-col gap-1">
//                               {(activeTab === "all" ? services.slice(0, 4) : services).map(
//                                 (s) => (
//                                   <Link
//                                     key={s.id}
//                                     href={`/b/${s.businessSlug}/book?service=${s.id}`}
//                                     onClick={closeOverlay}
//                                     className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
//                                   >
//                                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
//                                       <Tag size={14} className="text-primary" />
//                                     </div>
//                                     <div className="min-w-0 flex-1">
//                                       <p className="truncate text-sm font-medium text-foreground">
//                                         {s.title}
//                                       </p>
//                                       <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
//                                         <Building2 size={11} />
//                                         {s.businessName}
//                                       </p>
//                                     </div>
//                                     <span className="shrink-0 font-mono text-xs text-muted-foreground">
//                                       ${(s.price / 100).toFixed(2)}
//                                     </span>
//                                   </Link>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }