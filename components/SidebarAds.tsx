'use client';

/**
 * Sidebar ad unit: disclaimer + all 3 affiliate ads in a vertical layout for side white space.
 * Shown on the right side of blog content on larger screens.
 */
export default function SidebarAds() {
  return (
    <aside
      className="w-[300px] flex-shrink-0 space-y-4 pt-2"
      aria-label="Sponsored"
    >
      <p className="text-xs text-gray-500 italic">
        We earn commissions when you shop through the links below.
      </p>
      <div className="space-y-4 flex flex-col">
        <p className="text-sm">
          <a
            href="https://www.tkqlhce.com/click-101640091-15836247"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline block"
          >
            Run functions on demand. Scale automatically
          </a>
          <img
            src="https://www.lduhtrp.net/image-101640091-15836247"
            width={1}
            height={1}
            alt=""
            className="inline-block border-0"
          />
        </p>
        <p className="text-sm">
          <a
            href="https://www.anrdoezrs.net/click-101640091-15836248"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline block"
          >
            Build and deploy apps from code to production in just a few clicks
          </a>
          <img
            src="https://www.ftjcfx.com/image-101640091-15836248"
            width={1}
            height={1}
            alt=""
            className="inline-block border-0"
          />
        </p>
        <p>
          <a
            href="https://www.tkqlhce.com/click-101640091-15836241"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="https://www.tqlkg.com/image-101640091-15836241"
              width={300}
              height={250}
              alt=""
              className="border-0 w-full rounded-lg"
            />
          </a>
        </p>
      </div>
    </aside>
  );
}
