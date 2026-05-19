import type { LoaderProps } from "../types";
import { LoaderFrame } from "./common";

export function AIStream(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Streaming reasoning..."
      label="AI stream loading state"
      submessage="Tokens are arriving"
    >
      <span className="ol-stream" aria-hidden="true">
        <span className="ol-stream-bar" />
        <span className="ol-stream-bar" />
        <span className="ol-stream-bar" />
        <span className="ol-stream-bar" />
        <span className="ol-stream-bar" />
        <span className="ol-stream-bar" />
        <span className="ol-stream-bar" />
      </span>
    </LoaderFrame>
  );
}
