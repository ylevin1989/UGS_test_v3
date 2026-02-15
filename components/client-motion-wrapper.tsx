"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface ClientMotionWrapperProps extends HTMLMotionProps<any> {
    tag?: keyof typeof motion;
    children: React.ReactNode;
}

export function ClientMotionWrapper({
    tag = "div",
    children,
    ...props
}: ClientMotionWrapperProps) {
    const MotionComponent = (motion as any)[tag];
    return <MotionComponent {...props}>{children}</MotionComponent>;
}
