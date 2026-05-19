import type { LoaderProps } from "../../packages/core/src/types";
import { LoaderFrame } from "../../packages/core/src/loaders/common";

// Add the loader animation markup inside LoaderFrame so message, error, size,
// tone, and reduced-motion behavior stay consistent with the rest of the package.
export function LoaderName(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Loading..."
      label="LoaderName loading state"
      submessage="Replace this with useful context"
    >
      <span aria-hidden="true">Replace with loader visual</span>
    </LoaderFrame>
  );
}
