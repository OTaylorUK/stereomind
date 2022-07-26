import React from "react";
import { motion } from "framer-motion";
import { loadingCircleTransition, loadingCircleVariants, loadingContainerVariants } from "lib/framerSettings";



const Loader = ({ }): JSX.Element => {
    const dotStyle = `block w-2 h-2 bg-black rounded-md`
    
    return(
        <div className="flex justify-center items-center h-full w-full flex-1">
            <motion.div
                className="flex justify-around h-8 w-8 "
                variants={loadingContainerVariants}
                initial="start"
                animate="end"
                >
                <motion.span
                    className={dotStyle}
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                <motion.span
                     className={dotStyle}
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                <motion.span
                     className={dotStyle}
                    variants={loadingCircleVariants}
                    transition={loadingCircleTransition}
                />
                </motion.div>
        </div>
    )
}

export default Loader