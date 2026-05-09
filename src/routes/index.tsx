import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [showMore, setShowMore] = useState(false);

  return (
    <main className="flex justify-center min-h-screen text-base px-8 sm:px-4 py-12 sm:py-28 2xl:pt-0 2xl:items-center">
      <div className="flex flex-col space-y-6 max-w-3xl w-full">
        <h3 className="font-serif font-semibold text-2xl sm:text-3xl">
          Session-Based Authentication with Tokenless CSRF Defense
        </h3>
        <div className="space-y-4">
          <p className="leading-6 text-justify">
            Session-based authentication stores a user&apos;s identity on the server and relies on
            cookies the browser automatically includes with every matching request which in turn
            introduces the risk of Cross-Site Request Forgery (CSRF). The tokenless defense pattern,
            a modern approach to secure web authentication, mitigates this not with a shared secret,
            but by enforcing browser-level constraints that attackers cannot satisfy: requiring
            non-simple Content-Types to force CORS preflight, validating Origin and Referer headers,
            and leveraging Fetch Metadata headers that browsers set and attackers cannot forge.
            {!showMore && "... "}{" "}
            <span>
              <Button
                variant="link"
                className="p-0 h-auto font-medium ml-1 text-muted-foreground"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </Button>
            </span>
          </p>
          <div className={cn("space-y-4", showMore ? "" : "hidden")}>
            <p>
              In local development, the frontend runs on localhost:5173 and the API on
              localhost:4000. Although these are different ports, browsers treat them as the same
              site because ports are excluded from the same-site determination. This means
              Sec-Fetch-Site resolves to same-site for all requests between them, the session cookie
              flows freely, and every security middleware behaves exactly as it will in production.
              The only intentional relaxations are that Secure is not set on the cookie since there
              is no HTTPS, and the Domain attribute is omitted since localhost does not require it.
            </p>
            <p>
              In production, the frontend is served from example.com and the API from
              api.example.com. As subdomains of the same registrable domain, the browser treats
              these as same-site, so Sec-Fetch-Site remains same-site and the session cookie is
              attached to all API requests as intended. The cookie is set with Secure: true, Domain:
              .example.com to cover both subdomains, and SameSite: Lax. CORS is locked to
              https://example.com as the only allowed origin. Any request arriving from outside this
              domain such as a phishing link, a cross-site form, or a scripted fetch is rejected at
              the Fetch Metadata layer before the handler is ever reached.
            </p>
            <p>
              If the frontend and API were on entirely separate domains like example.com and
              api.test.com they would be cross-site to each other. The browser would set
              Sec-Fetch-Site: cross-site on every request the frontend makes to the API, which the
              current middleware would reject as an attack. The session cookie would also not be
              sent cross-site under SameSite=Lax. Making this architecture work would require
              loosening both the Fetch Metadata policy and the SameSite setting to None; Secure,
              which significantly expands the attack surface and would require explicit CSRF tokens
              as a compensating control which is precisely the complexity the same-site setup was
              designed to avoid.
            </p>
          </div>
        </div>
        <Button className="w-fit rounded-none" asChild>
          <Link to="/signup">Try Now</Link>
        </Button>
      </div>
    </main>
  );
}
