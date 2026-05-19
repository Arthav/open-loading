import type { LoaderProps } from "../types";
import { LoaderFrame } from "./common";

export function ErrorRetry(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Retrying safely..."
      label="Error retry loading state"
      submessage="Fallback path is ready"
    >
      <span className="ol-error-mark" aria-hidden="true">
        <span>!</span>
      </span>
    </LoaderFrame>
  );
}
