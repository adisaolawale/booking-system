import { SiteHeader } from "@/components/homepage/SiteHeader";
import { Hero } from "@/components/homepage/Hero";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { BusinessCTA } from "@/components/homepage/BusinessCTA";
import { Testimonials } from "@/components/homepage/Testimonials";
import { Footer } from "@/components/homepage/Footer"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <BusinessCTA />
        <Testimonials />
        <Footer />
      </main>
    </>
  );
}


// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"

// export default function HomePage() {
//   return (
//     <main className="flex flex-col">

//       {/* HERO SECTION */}
//       <section className="py-24 px-6 text-center">
//         <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
//           Book Appointments in Seconds
//         </h1>

//         <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
//           A simple and powerful booking system for your business.
//           Let your customers schedule appointments بسهولة and fast.
//         </p>

//         <div className="mt-8 flex justify-center gap-4">
//           <Link href="/booking">
//             <Button size="lg">Book Now</Button>
//           </Link>

//           <Link href="/services">
//             <Button variant="outline" size="lg">
//               View Services
//             </Button>
//           </Link>
//         </div>
//       </section>

//       {/* SERVICES SECTION */}
//       <section className="py-20 px-6 bg-muted/40">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-semibold text-center">
//             Our Services
//           </h2>

//           <p className="text-center text-muted-foreground mt-4">
//             Choose from our range of professional services
//           </p>

//           <div className="mt-12 grid gap-6 md:grid-cols-3">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Haircut</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   $20 • 30 minutes
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Beard Trim</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   $15 • 20 minutes
//                 </p>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle>Full Grooming</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-muted-foreground">
//                   $40 • 60 minutes
//                 </p>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="py-20 px-6">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-3xl font-semibold">
//             How It Works
//           </h2>

//           <div className="mt-12 grid gap-8 md:grid-cols-3">
//             <div>
//               <h3 className="font-medium text-lg">
//                 1. Choose Service
//               </h3>
//               <p className="text-muted-foreground mt-2">
//                 Select the service you need
//               </p>
//             </div>

//             <div>
//               <h3 className="font-medium text-lg">
//                 2. Pick Date & Time
//               </h3>
//               <p className="text-muted-foreground mt-2">
//                 Choose a convenient time slot
//               </p>
//             </div>

//             <div>
//               <h3 className="font-medium text-lg">
//                 3. Confirm Booking
//               </h3>
//               <p className="text-muted-foreground mt-2">
//                 Enter details and confirm instantly
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-24 px-6 text-center bg-muted/40">
//         <h2 className="text-3xl md:text-4xl font-semibold">
//           Ready to book your appointment?
//         </h2>

//         <p className="mt-4 text-muted-foreground">
//           Schedule your service in just a few clicks
//         </p>

//         <div className="mt-8">
//           <Link href="/booking">
//             <Button size="lg">Book Now</Button>
//           </Link>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="py-10 text-center text-sm text-muted-foreground">
//         © {new Date().getFullYear()} Booking System. All rights reserved.
//       </footer>

//     </main>
//   )
// }



// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
// //       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={100}
// //           height={20}
// //           priority
// //         />
// //         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
// //           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
// //             To get started, edit the page.tsx file.
// //           </h1>
// //           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
// //             Looking for a starting point or more instructions? Head over to{" "}
// //             <a
// //               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Templates
// //             </a>{" "}
// //             or the{" "}
// //             <a
// //               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Learning
// //             </a>{" "}
// //             center.
// //           </p>
// //         </div>
// //         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
// //           <a
// //             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={16}
// //               height={16}
// //             />
// //             Deploy Now
// //           </a>
// //           <a
// //             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Documentation
// //           </a>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
