import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

export function ProgressPulse(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Uploading context..."
      label="Progress pulse loading state"
      submessage="72% complete"
    >
      <span className="ol-progress-track" aria-hidden="true">
        <span className="ol-progress-bar" />
      </span>
    </LoaderFrame>
  );
}
