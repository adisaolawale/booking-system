"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { CategoryIcon } from "@/lib/category-icons";
import { Reveal } from "@/components/homepage/Reveal";

type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
};

type Tab = "categories" | "popular";

export function PopularServicesCategories({ categories }: { categories: Category[] }) {
  const [tab, setTab] = useState<Tab>("categories");

  return (
    <section id="popular-services" className="bg-background px-4 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="mb-3 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
            Popular Services & Categories
          </h2>
          <p className="text-base text-muted-foreground">
            Browse by category, or see what&rsquo;s trending across BookEase.
          </p>
        </div>

        {/* Same sliding-thumb toggle as How It Works and the register form —
            one pill slides between two fixed-width options. */}
        <div className="mb-10 flex justify-center">
          <div className="relative inline-flex rounded-full border border-border bg-muted p-1">
            <span
              aria-hidden
              className={`absolute inset-y-1 left-1 w-36 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                tab === "popular" ? "translate-x-36" : "translate-x-0"
              }`}
            />
            <button
              type="button"
              onClick={() => setTab("categories")}
              className={`relative z-10 w-36 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                tab === "categories"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Categories
            </button>
            <button
              type="button"
              onClick={() => setTab("popular")}
              className={`relative z-10 w-36 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                tab === "popular"
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Popular Services
            </button>
          </div>
        </div>

        <div key={tab} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {tab === "categories" ? (
            categories.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">No categories yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/services?category=${category.slug}`}
                    className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary">
                      <CategoryIcon
                        name={category.icon as string}
                        size={20}
                        className="text-primary transition-colors group-hover:text-primary-foreground"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                  </Link>
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-14 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                <Sparkles size={20} className="text-primary" />
              </div>
              <h3 className="mb-1 font-heading text-base font-semibold text-foreground">
                Not available yet
              </h3>
              <p className="max-w-xs text-sm text-muted-foreground">
                We&rsquo;re working on surfacing trending services here soon.
              </p>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}



// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { Sparkles } from "lucide-react";
// import { CategoryIcon } from "@/lib/category-icons";
// import { Reveal } from "@/components/homepage/Reveal";

// type Category = {
//   id: string;
//   name: string;
//   slug: string;
//   icon: string | null;
// };

// type Tab = "categories" | "popular";

// export function PopularServicesCategories({ categories }: { categories: Category[] }) {
//   const [tab, setTab] = useState<Tab>("categories");

//   return (
//     <section className="bg-background px-4 py-20 sm:py-28">
//       <Reveal className="mx-auto max-w-6xl">
//         <div className="mx-auto mb-10 max-w-xl text-center">
//           <h2 className="mb-3 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
//             Popular Services & Categories
//           </h2>
//           <p className="text-base text-muted-foreground">
//             Browse by category, or see what&rsquo;s trending across BookEase.
//           </p>
//         </div>

//         {/* Same sliding-thumb toggle as How It Works and the register form —
//             one pill slides between two fixed-width options. */}
//         <div className="mb-10 flex justify-center">
//           <div className="relative inline-flex rounded-full border border-border bg-muted p-1">
//             <span
//               aria-hidden
//               className={`absolute inset-y-1 left-1 w-36 rounded-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
//                 tab === "popular" ? "translate-x-36" : "translate-x-0"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setTab("categories")}
//               className={`relative z-10 w-36 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
//                 tab === "categories"
//                   ? "text-primary-foreground"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               Categories
//             </button>
//             <button
//               type="button"
//               onClick={() => setTab("popular")}
//               className={`relative z-10 w-36 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
//                 tab === "popular"
//                   ? "text-primary-foreground"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               Popular Services
//             </button>
//           </div>
//         </div>

//         <div key={tab} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
//           {tab === "categories" ? (
//             categories.length === 0 ? (
//               <p className="text-center text-sm text-muted-foreground">No categories yet.</p>
//             ) : (
//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
//                 {categories.map((category) => (
//                   <Link
//                     key={category.id}
//                     href={`/services?category=${category.slug}`}
//                     className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
//                   >
//                     <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary">
//                       <CategoryIcon
//                         name={category.icon as string}
//                         size={20}
//                         className="text-primary transition-colors group-hover:text-primary-foreground"
//                       />
//                     </div>
//                     <span className="text-sm font-medium text-foreground">{category.name}</span>
//                   </Link>
//                 ))}
//               </div>
//             )
//           ) : (
//             <div className="flex flex-col items-center rounded-2xl border border-dashed border-border p-14 text-center">
//               <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
//                 <Sparkles size={20} className="text-primary" />
//               </div>
//               <h3 className="mb-1 font-heading text-base font-semibold text-foreground">
//                 Not available yet
//               </h3>
//               <p className="max-w-xs text-sm text-muted-foreground">
//                 We&rsquo;re working on surfacing trending services here soon.
//               </p>
//             </div>
//           )}
//         </div>
//       </Reveal>
//     </section>
//   );
// }