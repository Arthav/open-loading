import type { LoaderProps } from "../types";
import { LoaderFrame } from "./common";

export function ThinkingOrbit(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Analyzing your request..."
      label="Thinking Orbit loading state"
      submessage="This may take a few moments"
    >
      <div className="ol-orbit" aria-hidden="true">
        <span className="ol-orbit-ring" />
        <span className="ol-orbit-ring" />
        <span className="ol-orbit-ring" />
        <span className="ol-orbit-core" />
        <span className="ol-orbit-particle" />
        <span className="ol-orbit-particle" />
        <span className="ol-orbit-particle" />
      </div>
    </LoaderFrame>
  );
}
