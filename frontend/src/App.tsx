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
import image from './logo1.png'
import WorkflowCarousel from './components/WorkflowCarousel';
import WorkflowList from './components/WorkflowList';

export default function App() {

  const [showError, setShowError] = React.useState(false);
  const [showNoResult, setShowNoResult] = React.useState(false);

  const [showResults, setShowResults] = React.useState(false);
  const { scrollYProgress } = useScroll();
  const [value, setValue] = React.useState(0);
  const [inputValue, updateInputValue] = React.useState("");
  const [outputValue, updateOutputValue] = React.useState("");
  const [labelValue, updateLabelValue] = React.useState("");
  const [workflow, setWorkflow] = React.useState("{}");
  const [showMoreOptions, setShowMoreOptions] = React.useState<boolean>(false);
  const [depth, setDepth] = React.useState<number>(2);
  const [limit, setLimit] = React.useState<number>(2);
  const [validated, setValidated] = React.useState(false);
  const [carouselVisible, setCarouselVisible] = React.useState(true);

  async function onClick() {
    if (inputValue == "" || outputValue == "" || labelValue == "") {
      setShowError(true);
      if (validated != true) scrollYProgress.set(0);

    }
    else {
      const wf = await ApiForm(inputValue, outputValue, labelValue, depth, limit);
      if (wf == "[]") {
        setShowNoResult(true);
        setShowResults(false);
      }

      else {
        setValidated(true);
        setShowError(false);
        setShowNoResult(false);
        setShowResults(true);
        setTimeout(() => { document.getElementById("rfcanva")?.scrollIntoView({ behavior: "smooth", block: "start" }) }, 1);
        setWorkflow(wf);
        console.log(wf);
      }
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

  function updateDepthValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value >= 2 && value <= 8) {
      setDepth(value);
    }
  }

  function updateLimitValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(event.target.value);
    if (value >= 2 && value <= 10) {
      setLimit(value);
    }
  }

  function toggleMoreOptions() {
    if (validated != true) scrollYProgress.set(0);
    setShowMoreOptions(!showMoreOptions);
  }

  function changeDisplay() {
    setCarouselVisible(!carouselVisible)
  }

  // modal export
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btns = document.querySelectorAll(".export");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal!.style.display = "flex";
      if (carouselVisible) modal!.style.top = (window.scrollY - 250) + "px";
      else modal!.style.top = "70px";
      modal!.querySelector("pre")!.textContent = JSON.stringify(JSON.parse(workflow)[parseInt(btn.id.slice(7))], null, 4)
      document.body.style.overflow = 'hidden'
    })
  })

  // When the user clicks on <span> (x), close the modal
  span?.addEventListener("click", () => {
    modal!.querySelector("pre")!.scrollTo(0, 0)
    modal!.style.display = "none";
    document.body.style.overflow = 'auto'
  })

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener("click", (event) => {
    if (event.target == modal) {
      modal!.querySelector("pre")!.scrollTo(0, 0)
      modal!.style.display = "none";
      document.body.style.overflow = 'auto'
    }
  })


  return (
    <div>
      <header>
        <div className="logo">
          <img src={image} />
        </div>
      </header>

      <section className="hero">
        <div className="all">
          <motion.div
            style={{ opacity: (1 - (scrollYProgress.get() * 1.2)) }}
          >
            <div className='menu'>
              <div className="text" >
                <h2 data-aos="fade-up" data-aos-delay="100">All your tools on hand</h2>
                <p data-aos="fade-up" data-aos-delay="100">Bio4T is an advanced <strong>search engine</strong> made for biologists.<br />
                  Find all the tools you need with <strong>workflows</strong> made from a big database.<br />
                  Select an <strong>input</strong>, an <strong>output</strong> and optionnaly a <strong>topic</strong> to start.</p>
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
            {showNoResult ?
              <div className='error'>
                <p>
                  No Result
                </p>
              </div>
              : null}
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
                      <input type="number" id="depth" value={depth} onChange={updateDepthValue} min="2" max="8" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <label htmlFor="limit" style={{ marginBottom: "4px" }}>
                        Limit :
                      </label>
                      <input type="number" id="limit" value={limit} onChange={updateLimitValue} min="2" max="10" />
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
              style={{ opacity: (scrollYProgress.get() * 2.5), marginTop: '10%' }}
            >
              <div id="myModal" className="truemodal" style={{ display: "none" }}>
                <div className="modal-content">
                  <span className="close">&times;</span>
                  <pre></pre>
                </div>
              </div>
              <div id="rfcanva">
                {showResults ?
                  <div style={{ width: "100%" }}>
                    {!carouselVisible && <WorkflowCarousel json={workflow} ></WorkflowCarousel>}
                    {carouselVisible && <WorkflowList json={workflow}></WorkflowList>}
                  </div>
                  : null}
                {showResults && <button id="changeWorkflowDisplay" type="button" className="btn btn-secondary btnfont" onClick={changeDisplay}></button>}
              </div>
            </motion.div>
          </div>

        </div>
      </section >
      {/* <div className='particles'>
        <AnimateParticles />
      </div> */}
    </div >
  );
}
