import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

export function FileImportStack(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Importing file..."
      label="File import stack loading state"
      submessage="Parsing, validating, and saving rows"
    >
      <span className="ol-import" aria-hidden="true">
        <span className="ol-import-file">
          <span className="ol-import-fold" />
          <span className="ol-import-line" />
          <span className="ol-import-line" />
          <span className="ol-import-line" />
        </span>
        <span className="ol-import-rail" />
        <span className="ol-import-step" />
        <span className="ol-import-step" />
        <span className="ol-import-step" />
      </span>
    </LoaderFrame>
  );
}
