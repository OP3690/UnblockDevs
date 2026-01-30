'use client';

type CommissionDisclosureVariant = 'default' | 'belowInput';

interface CommissionDisclosureProps {
  variant?: CommissionDisclosureVariant;
}

export default function CommissionDisclosure({ variant = 'default' }: CommissionDisclosureProps) {
  const isBelowInput = variant === 'belowInput';
  return (
    <div className={isBelowInput ? 'mt-6 pt-4 border-t border-gray-200 text-center' : 'mb-8 pb-6 border-b border-gray-200'}>
      <p className="text-xs text-gray-500 italic mb-4">
        We earn commissions when you shop through the links below.
      </p>
      <div className={`space-y-4 ${isBelowInput ? 'flex flex-col items-center' : ''}`}>
        <p className="text-sm">
          <a
            href="https://www.tkqlhce.com/click-101640091-15836247"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
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
            className="text-blue-600 hover:underline"
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
          >
            <img
              src="https://www.tqlkg.com/image-101640091-15836241"
              width={300}
              height={250}
              alt=""
              className="border-0"
            />
          </a>
        </p>
      </div>
    </div>
  );
}
