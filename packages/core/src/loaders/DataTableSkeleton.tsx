import type { LoaderProps } from "../types.js";
import { LoaderFrame } from "./common.js";

export function DataTableSkeleton(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Loading rows..."
      label="Data table skeleton loading state"
      submessage="Column structure is preserved"
      supportsError={false}
    >
      <span className="ol-table" aria-hidden="true">
        <span className="ol-table-toolbar" />
        <span className="ol-table-grid">
          {Array.from({ length: 20 }, (_, index) => (
            <span className="ol-table-cell" key={index} />
          ))}
        </span>
      </span>
    </LoaderFrame>
  );
}
