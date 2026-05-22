import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

export function ErrorRetry(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Request needs attention"
      label="Error retry loading state"
      submessage="Fallback path is ready"
    >
      <span className="ol-error-mark" aria-hidden="true">
        <span>!</span>
      </span>
    </LoaderFrame>
  );
}
