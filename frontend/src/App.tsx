import * as React from 'react'
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css';
import AnimateParticles from './components/AminateParticles';
import ReactFlowCanva from './components/Reactflow';
import AutoComplete from './components/autocomplete';
import apiTest from './components/api'
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

export default function App() {

  const [showResults, setShowResults] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const [value, setValue] = React.useState(0);

  const onClick = () => {
    apiTest();
    setShowResults(true);
    setTimeout(() => { document.getElementById("rfcanva")?.scrollIntoView({ behavior: "smooth", block: "start" }) }, 1);
  }

  /**
   * Animation on scroll function and init
   */
  React.useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", () => {
    setValue(1 - scrollYProgress.get())
  });


  return (
    <div>
      <header id="header" className="header fixed-top">
        <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
          <a href="App.js" className="logo d-flex align-items-center">
            <h1>BIO4T</h1>
          </a>
          <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
          <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
        </div>
      </header>
      <section className="hero">
        <div className="grid">
          <motion.div
            style={{ opacity: -1.70 + ((scrollYProgress.get() * 2.5)), transform: 'translateX(' + (-100 + scrollYProgress.get() * 110) + 'vh)' }}
          >
            <div className='advice1'>
            {showResults ?
              <p data-aos="fade-right" data_aos-delay="400">blablablblablablabla
                blablablblablablabla blablablblablablabla blablablblablablabla
                blablablblablablabla blablablblablablabla blablablblablablabla
                blablablblablablabla blablablblablablabla blablablblablablabla
                blablablblablablabla blablablblablablabla
              </p>
              : null}
            </div>
          </motion.div>

          <div className="all">
            <div className='menu'>
              <div className="text" >
                <motion.div
                  style={{ opacity: (1 - (scrollYProgress.get() * 2.5)), transform: 'translateX(' + scrollYProgress.get() * 100 + 'vh)' }}
                >
                  <h2 data-aos="fade-up" data-aos-delay="100">All your tools on hand</h2>
                </motion.div>

                <motion.div
                  style={{ opacity: (1 - (scrollYProgress.get() * 2.5)), transform: 'translateX(' + scrollYProgress.get() * -100 + 'vh)' }}
                >
                  <p data-aos="fade-up" data-aos-delay="100">blablablblablablabla
                    blablablblablablabla blablablblablablabla blablablblablablabla
                    blablablblablablabla blablablblablablabla blablablblablablabla
                    blablablblablablabla blablablblablablabla blablablblablablabla
                    blablablblablablabla blablablblablablabla</p>
                </motion.div>

              </div>
            </div>
            <form className="d-flex sticky" data-aos="fade-up" data-aos-delay="300">
              <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Type 2
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
              <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Type 2
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </div>
              <div className="d-flex align-items-center" >
                <div style={{ width: 210, margin: 5 }}>
                  <AutoComplete />
                </div>
              </div>
              <button type="button" className="btn btn-primary btnfont" onClick={onClick}>Search</button>
            </form>
            <motion.div
              style={{ opacity: (scrollYProgress.get() * 2.5) }}
            >
              <div id="rfcanva">
                {showResults ?
                  <div className="reactflowCanva">
                    <ReactFlowCanva/>
                  </div>
                  : null}
              </div>
            </motion.div>
          </div>
          <div></div>
        </div>
      </section >
    </div >
  );
}


