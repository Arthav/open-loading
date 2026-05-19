import type { LoaderProps } from "../types";
import { LoaderFrame } from "./common";

export function NeuralGalaxy(props: LoaderProps) {
  return (
    <LoaderFrame
      {...props}
      defaultMessage="Mapping possibilities..."
      label="Neural galaxy loading state"
      submessage="Experimental motion profile"
    >
      <span className="ol-galaxy" aria-hidden="true">
        <span className="ol-galaxy-core" />
      </span>
    </LoaderFrame>
  );
}
