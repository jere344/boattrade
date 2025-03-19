import { ReactNode, useRef } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { useScroll, useTransform, useSpring } from "framer-motion";

const MotionBox = motion(Box);

interface ScrollAnimatedSectionProps {
    children: ReactNode;
    id: string;
}

const ScrollAnimatedSection = ({ children, id }: ScrollAnimatedSectionProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.25"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

    return (
        <MotionBox
            ref={ref}
            id={id}
            initial="hidden"
            style={{
                opacity,
                y: useSpring(y, { stiffness: 100, damping: 20 }),
                scale: useSpring(scale, { stiffness: 100, damping: 20 }),
            }}
            sx={{
                py: 10,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            {children}
        </MotionBox>
    );
};

export default ScrollAnimatedSection;
