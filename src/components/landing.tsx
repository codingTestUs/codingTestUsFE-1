import Navbar from "./nav-bar"
import Hero from "./hero"
import Marquee from "./marquee"
import CTA from "./cta"
import Footer from "./footer"

export default function Landing(){
    return(
        <>
            <Navbar/>
            <Hero/>
            <Marquee/>
            <CTA/>
            <Footer/>
        </>
    )
}