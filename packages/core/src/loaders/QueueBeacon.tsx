import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

// QueueBeacon uses the shared frame so live-region copy, error tone, and
// reduced-motion behavior stay consistent with the rest of the package.
export function QueueBeacon(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Holding your place..."
      label="Queue beacon loading state"
      submessage="Waiting for the next available slot"
    >
      <span className="ol-queue" aria-hidden="true">
        <span className="ol-queue-ring" />
        <span className="ol-queue-ring" />
        <span className="ol-queue-core" />
        <span className="ol-queue-pip" />
        <span className="ol-queue-pip" />
        <span className="ol-queue-pip" />
      </span>
    </LoaderFrame>
  );
}
