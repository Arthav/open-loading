import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

export function EmptySearch(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Checking for matches..."
      label="Empty search loading state"
      submessage="Results may resolve empty"
      supportsError={false}
    >
      <span className="ol-empty" aria-hidden="true">
        <span className="ol-empty-lens" />
        <span className="ol-empty-list">
          <span className="ol-empty-row" />
          <span className="ol-empty-row" />
          <span className="ol-empty-row" />
        </span>
        <span className="ol-empty-dot" />
      </span>
    </LoaderFrame>
  );
}
