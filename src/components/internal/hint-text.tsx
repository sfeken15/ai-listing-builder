"use client";

import type { ReactNode, Ref } from "react";
import type { TextProps as AriaTextProps } from "react-aria-components";
import { Text as AriaText } from "react-aria-components";
import { cx } from "@/utils/cx";

interface HintTextProps extends AriaTextProps {
    isInvalid?: boolean;
    ref?: Ref<HTMLElement>;
    size?: "sm" | "md";
    children: ReactNode;
}

export const HintText = ({ isInvalid, className, size = "md", ...props }: HintTextProps) => {
    return (
        <AriaText
            {...props}
            slot={isInvalid ? "errorMessage" : "description"}
            className={cx(
                "text-sm text-[var(--text-tertiary)]",
                size === "sm" && "text-xs",
                "in-data-[input-size=sm]:text-xs",
                isInvalid && "text-[var(--color-error-text)]",
                "group-invalid:text-[var(--color-error-text)]",
                className,
            )}
        />
    );
};

HintText.displayName = "HintText";
