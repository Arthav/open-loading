import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

export function SimpleSpinner(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Loading..."
      label="Simple spinner loading state"
      submessage="Fetching the latest state"
    >
      <span className="ol-spinner" aria-hidden="true" />
    </LoaderFrame>
  );
}
