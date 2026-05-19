import type { LoaderProps } from "../types";
import { OpenLoadingStyles } from "./styles";

interface LoaderFrameProps extends LoaderProps {
  children: React.ReactNode;
  defaultMessage: string;
  submessage?: string;
  label?: string;
}

export function LoaderFrame({
  children,
  className,
  defaultMessage,
  error,
  label,
  message,
  reducedMotion,
  size = "md",
  submessage,
  tone = "brand"
}: LoaderFrameProps) {
  const isError = Boolean(error);
  const live = isError ? "assertive" : "polite";
  const displayMessage =
    typeof error === "string" ? error : message || defaultMessage;

  return (
    <>
      <OpenLoadingStyles />
      <div
        aria-label={label || displayMessage}
        aria-live={live}
        className={["ol-root", className].filter(Boolean).join(" ")}
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
