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
import ApiForm from './components/apiForm'
import Joke from './components/Joke'
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useEffect } from 'react';

export default function App() {

  const [showError, setShowError] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const [value, setValue] = React.useState(0);
  const [inputValue, updateInputValue] = React.useState("");
  const [outputValue, updateOutputValue] = React.useState("");
  const [labelValue, updateLabelValue] = React.useState("");
  const [workflow, setWorkflow] = React.useState("");
  const [showMoreOptions, setShowMoreOptions] = React.useState<boolean>(false);
  const [depth, setDepth] = React.useState<number>(2);
  const [limit, setLimit] = React.useState<number>(2);
  const [validated, setValidated] = React.useState(false);

  async function onClick() {
    if (inputValue == "" || outputValue == "" || labelValue == "") {
      setShowError(true);
      if (validated != true) scrollYProgress.set(0);

    }
    else {
      setValidated(true)
      setShowError(false)
      setShowResults(true);
      setTimeout(() => { document.getElementById("rfcanva")?.scrollIntoView({ behavior: "smooth", block: "start" }) }, 1);
      const wf = await ApiForm(inputValue, outputValue, labelValue, depth, limit);
      setWorkflow(wf);
      console.log(workflow)
    }
  }

  useEffect(() => {
    if (validated != true) scrollYProgress.set(0);
    console.log("input")
    console.log(inputValue)
  }, [inputValue]);
  useEffect(() => {
    if (validated != true) scrollYProgress.set(0);
    console.log("output")
    console.log(outputValue)
  }, [outputValue]);
  useEffect(() => {
    if (validated != true) scrollYProgress.set(0);
    console.log("label")
    console.log(labelValue)
  }, [labelValue]);

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

  function handleDepthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value >= 2 && value <= 8) {
      setDepth(value);
    }
  }

  function handleLimitChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value >= 2 && value <= 10) {
      setLimit(value);
    }
  }

  function toggleMoreOptions() {
    if (validated != true) scrollYProgress.set(0);
    setShowMoreOptions(!showMoreOptions);
  }

  return (
    <div>
      <section className="hero">
        <div className="all">
          <motion.div
            style={{ opacity: (1 - (scrollYProgress.get() * 1.2)) }}
          >
            <div className='menu'>
              <div className="text" >
                <h2 data-aos="fade-up" data-aos-delay="100">All your tools on hand</h2>
                <p data-aos="fade-up" data-aos-delay="100">blablablblablablabla
                  blablablblablablabla blablablblablablabla blablablblablablabla
                  blablablblablablabla blablablblablablabla blablablblablablabla
                  blablablblablablabla blablablblablablabla blablablblablablabla
                  blablablblablablabla blablablblablablabla</p>
              </div>
            </div>
          </motion.div>
          <div className="sticky" >
            <form>
              <div className="dropdown inputbtn">
                <AutoCompleteInputType inputValue={inputValue} updateInputValue={updateInputValue} />
              </div>
              <div className="dropdown">
                <AutoCompleteOutputType outputValue={outputValue} updateOutputValue={updateOutputValue} />
              </div>
              <div className="d-flex align-items-center" >
                <div>
                  <AutoCompleteLabel labelValue={labelValue} updateLabelValue={updateLabelValue} />
                </div>
              </div>
              <button type="button" className="btn btn-secondary btnfont" onClick={onClick}>Search</button>
            </form>
            {showError ?
              <div className='error'>
                <p>
                  At least one element is missing !
                </p>
              </div>
              : null}
            <div className='moreOption'>
              {showMoreOptions ? (
                <>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div style={{ display: "flex", flexDirection: "column", marginRight: "16px" }}>
                      <label htmlFor="depth" style={{ marginBottom: "4px" }}>
                        Depth :
                      </label>
                      <input type="number" id="depth" value={depth} onChange={handleDepthChange} min="2" max="8" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="limit" style={{ marginBottom: "4px" }}>
                        Limit :
                      </label>
                      <input type="number" id="limit" value={limit} onChange={handleLimitChange} min="2" max="10" />
                    </div>
                  </div>
                  <div
                    style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer", marginLeft: "8px" }}
                    onClick={toggleMoreOptions}
                  >
                    Less options
                  </div>
                </>
              ) : (
                <div
                  style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
                  onClick={toggleMoreOptions}
                >
                  More options
                </div>
              )}
            </div>

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

        </div>
      </section >
    </div >
  );
}


