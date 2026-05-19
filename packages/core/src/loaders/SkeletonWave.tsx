import type { LoaderProps } from "../types";
import { LoaderFrame } from "./common";

export function SkeletonWave(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Preparing layout..."
      label="Skeleton wave loading state"
      submessage="Content placeholders are visible"
    >
      <span className="ol-skeleton" aria-hidden="true">
        <span className="ol-skeleton-row" />
        <span className="ol-skeleton-row" />
        <span className="ol-skeleton-row" />
      </span>
    </LoaderFrame>
  );
}
