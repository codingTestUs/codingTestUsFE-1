import Navbar from "./nav-bar"
import Hero from "./hero"
import Marquee from "./marquee"
import CTA from "./cta"
import Footer from "./footer"
import { motion } from 'framer-motion'

export default function Landing(){
    return(
        <>
            <Navbar/>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Hero/>
            </motion.div>
            
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Marquee/>
            </motion.div>
            
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            >
                <CTA/>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            >
                <Footer/>
            </motion.div>
            
        </>
    )
}