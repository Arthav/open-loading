import type { LoaderProps } from "../types.js";
import { OpenLoadingStyles } from "./styles.js";

interface LoaderFrameProps extends LoaderProps {
  children: React.ReactNode;
  defaultMessage: string;
  label?: string;
  layout?: "stack" | "inline";
  submessage?: string;
  supportsError?: boolean;
}

export function LoaderFrame({
  children,
  className,
  defaultMessage,
  error,
  label,
  layout = "stack",
  message,
  reducedMotion,
  size = "md",
  submessage,
  supportsError = true,
  tone = "brand"
}: LoaderFrameProps) {
  const isError = supportsError && Boolean(error);
  const live = isError ? "assertive" : "polite";
  const displayMessage =
    isError && typeof error === "string" ? error : message || defaultMessage;

  return (
    <>
      <OpenLoadingStyles />
      <div
        aria-label={label || displayMessage}
        aria-live={live}
        className={["ol-root", className].filter(Boolean).join(" ")}
        data-layout={layout}
        data-reduced-motion={reducedMotion ? "true" : undefined}
        data-size={size}
        data-tone={isError ? "danger" : tone}
        role="status"
      >
        {children}
        <p className={isError ? "ol-message ol-error-text" : "ol-message"}>
          {displayMessage}
        </p>
        {submessage ? <p className="ol-submessage">{submessage}</p> : null}
      </div>
    </>
  );
}
