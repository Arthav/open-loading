import type { LoaderProps } from "../types";
import { LoaderFrame } from "./common";

export function TypingDots(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Composing response..."
      label="Typing dots loading state"
      submessage="Streaming will begin soon"
    >
      <span className="ol-dots" aria-hidden="true">
        <span className="ol-dot" />
        <span className="ol-dot" />
        <span className="ol-dot" />
      </span>
    </LoaderFrame>
  );
}
