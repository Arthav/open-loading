import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

export function ToolCallTrace(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Calling tools..."
      label="Tool call trace loading state"
      submessage="External actions are running"
    >
      <span className="ol-tool" aria-hidden="true">
        <span className="ol-tool-node" />
        <span className="ol-tool-line" />
        <span className="ol-tool-step" />
        <span className="ol-tool-step" />
        <span className="ol-tool-step" />
      </span>
    </LoaderFrame>
  );
}
