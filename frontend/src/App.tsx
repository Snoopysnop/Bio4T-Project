import * as React from 'react'
import AOS from 'aos';
import "aos/dist/aos.css";
import './App.css';
import AnimateParticles from './components/AminateParticles';
import ReactFlowCanva from './components/Reactflow';
import Gif from './components/Gif';
import AutoCompleteLabel from './components/AutoCompleteLabel';
import AutoCompleteInputType from './components/AutoCompleteInputType';
import AutoCompleteOutputType from './components/AutoCompleteOutputType';
import Joke from './components/Joke'

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function App() {

  const [showResults, setShowResults] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const [value, setValue] = React.useState(0);

  const onClick = () => {
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
      <section className="hero">
        <div className="grid">

          <motion.div
            style={{ opacity: -1.70 + ((scrollYProgress.get() * 2.5)), }}
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
            <form className="d-flex sticky" >
              <div className="dropdown inputbtn">
                <AutoCompleteInputType />
              </div>
              <div className="dropdown">
                <AutoCompleteOutputType />
              </div>
              <div className="d-flex align-items-center" >
                <div>
                  <AutoCompleteLabel />
                </div>
              </div>
              <button type="button" className="btn btn-secondary btnfont" onClick={onClick}>Search</button>
            </form>
            <motion.div
              style={{ opacity: (scrollYProgress.get() * 2.5) }}
            >
              <div id="rfcanva">
                {showResults ?
                  <div className="reactflowCanva">
                    <ReactFlowCanva />
                  </div>
                  : null}
              </div>
            </motion.div>
          </div>
          <motion.div
            style={{ opacity: -1.70 + ((scrollYProgress.get() * 2.5)), transform: 'translateX(' + (110 + scrollYProgress.get() * -110) + 'vh)' }}
          >
            <div className='meme'>
              <div className='blockMeme'>
              <div>
                {showResults ?
                  <Gif />
                  : null}
              </div>
              <div>
                {showResults ?
                  <Joke />
                  : null}
              </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section >
    </div >
  );
}


