import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

export function ButtonHold(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Saving..."
      label="Button hold loading state"
      layout="inline"
      submessage="Action is locked"
      supportsError={false}
    >
      <span className="ol-button-glyph" aria-hidden="true">
        <span className="ol-button-ring" />
        <span className="ol-button-core" />
      </span>
    </LoaderFrame>
  );
}
