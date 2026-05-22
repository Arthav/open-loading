import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

export function RouteReveal(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Preparing page..."
      label="Route reveal loading state"
      submessage="Layout, data, and actions are initializing"
    >
      <span className="ol-route" aria-hidden="true">
        <span className="ol-route-shell">
          <span className="ol-route-topbar" />
          <span className="ol-route-sidebar" />
          <span className="ol-route-block" />
          <span className="ol-route-block" />
          <span className="ol-route-block" />
        </span>
        <span className="ol-route-sweep" />
      </span>
    </LoaderFrame>
  );
}
