import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const configured =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = configured ? Redis.fromEnv() : null;

const make = (n: number, windowMinutes: number) =>
  redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(n, `${windowMinutes} m`),
        prefix: "rl",
      })
    : null;

const limiters = {
  login: make(10, 10),
  verify: make(10, 10),
  register: make(5, 10),
  resend: make(3, 10),
  booking: make(10, 10),
};

export async function limit(kind: keyof typeof limiters, extraKey = "") {
  const limiter = limiters[kind];
  if (!limiter) {
    // No Upstash keys: allow in development, refuse to run unprotected in production.
    if (process.env.NODE_ENV === "production") {
      console.error("Rate limiter not configured: set UPSTASH_REDIS_REST_URL and _TOKEN");
      return false;
    }
    return true;
  }
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = await limiter.limit(`${kind}:${ip}:${extraKey}`);
  return success;
}





// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
// import { headers } from "next/headers";

// const redis = Redis.fromEnv();
// const make = (n: number, w: `${number} m`) =>
//   new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(n, w) });

// export const limiters = {
//   login: make(10, "10 m"), verify: make(10, "10 m"),
//   register: make(5, "10 m"), resend: make(3, "10 m"), booking: make(10, "10 m"),
// };

// export async function limit(kind: keyof typeof limiters, extraKey = "") {
//   const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] ?? "unknown";
//   const { success } = await limiters[kind].limit(`${kind}:${ip}:${extraKey}`);
//   return success;
// }