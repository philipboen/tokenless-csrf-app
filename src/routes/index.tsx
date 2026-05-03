import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="flex justify-center min-h-screen text-base px-8 sm:px-4 py-12 sm:py-28 2xl:pt-0 2xl:items-center">
      <div className="flex flex-col space-y-6 max-w-3xl w-full">
        <h3 className="font-serif font-semibold text-2xl sm:text-3xl">
          Session-Based Authentication & CSRF Protection with the Tokenless (Preflight + Origin +
          Fetch Metadata) Pattern
        </h3>
        <div>
          <p className="leading-6 text-justify">
            Session-based authentication stores a user&apos;s identity on the server and relies on
            cookies that the browser automatically includes with requests, which introduces the risk
            of Cross-Site Request Forgery (CSRF). The tokenless CSRF defense pattern mitigates this
            risk not by using a shared secret, but by enforcing browser-level constraints that
            attackers cannot satisfy. It requires all state-changing requests to use a non-simple
            Content-Type such as application/json, which forces a CORS preflight check that only
            trusted origins are allowed to pass.
            {!showMore && "... "}
            <span className={showMore ? "" : "hidden"}>
              {" "}
              In addition, the server strictly validates the Origin (or Referer) header to ensure
              requests come only from approved frontend domains, and leverages modern Fetch Metadata
              headers like Sec-Fetch-Site and Sec-Fetch-Mode to reject requests initiated from
              cross-site or non-JavaScript contexts. For sensitive GET endpoints, the same model is
              extended by requiring a valid Origin and trusted Fetch Metadata context, ensuring that
              even non-state-changing requests exposing private data cannot be triggered from
              cross-site HTML contexts. Because malicious sites cannot bypass preflight
              restrictions, spoof origin headers, or forge browser-controlled metadata, they are
              unable to construct valid authenticated requests, allowing the server to reliably
              block CSRF attacks without requiring explicit CSRF tokens.
            </span>
            <Button
              variant="link"
              className="p-0 h-auto font-medium ml-1 text-muted-foreground"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </Button>
          </p>
        </div>
        <Button className="w-fit rounded-none" asChild>
          <Link to="/signup">Try Now</Link>
        </Button>
      </div>
    </main>
  );
}
