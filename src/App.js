import React, { Component } from "react";
import './App.css';
import 'react-typist/dist/Typist.css';
import Typist from 'react-typist';
import photo from './Images/Me.jpg';
import ultimo from './Images/ultimo.png';
import sfsu from './Images/sfsu.png';
import {FaEnvelope, FaHome, FaPhone, FaCode, FaDatabase, FaBrain, FaTools, FaBriefcase, FaCalendarAlt, FaLaptopCode, FaGraduationCap, FaGlobe, FaGithub, FaPaperclip, FaInfoCircle, FaCommentAlt, FaLinkedin} from "react-icons/fa";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import projectLists from './api/Projects.json';
import resume from './Files/VimeanSamResume2020.pdf';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
 
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        backgroundColor: '',
        variant: '',
        opacity: '0',
        backgroundId: '',
        color: '',
        greet: '',
        open: false,
        index: -1,
        photoIndex: 0,
        slides: [],
        page: 1,
        projects: []
    };
  } 

  componentDidMount() {
        this.tick()
        this.getProjects(1);
  }

  componentWillUnmount() {
      clearInterval(this.interval);
  }

  getProjects(page) {
      let start = ((page-1)*3)
      let stop = start+3
      if(stop >= projectLists.length){
          stop = projectLists.length;
      }
      let arr = [];
      for(let i = start; i < stop; i++){
        arr.push(projectLists[i])
      }
      this.setState({projects: arr});
  }

  tick = () =>{
      var getdate = new Date();
      var currentTime = getdate.getHours();
      if(currentTime < 12){
          this.setState({
              backgroundColor: '#EADCD1',
              variant: '191,98,4',
              greet: 'Good Morning,',
              color: 'white',
              backgroundId: '1VJzPiCvofgSlfR7no3kFAuoltc-5OEeR'
          }); 
          
      }else if(currentTime < 18){
          this.setState({
              backgroundColor: '#D5E6F5',
              variant: '4,129,191',
              greet: 'Good Afternoon,',
              color: 'white',
              backgroundId: '1Br1JZEvgDx9FizKjIOo6KqD5k2Nwk5kK'
          }); 
      }else{
          this.setState({
              backgroundColor: '#282c34',
              variant: '0,32,96',
              greet: 'Good Evening,',
              color: 'white',
              backgroundId: '1no8T54uBNz1SphdfpfbOmlQwZy7y6Mvv'
          });
      }
  }

  showSlides = (e) =>{
        let idx = -1;
        for(let i = 0; i < projectLists.length; i++){
            if(projectLists[i].title === e.target.id){
                idx = i;
            }
        }

        this.setState({
            index: parseInt(idx),
            open: true,
            slides: projectLists[idx].pics,
            photoIndex: 0,
        });
    }

    handleClose = () =>{
        this.setState({open: false});
    }

    previousPage = () =>{
        let prev = this.state.page;
        if(prev-1 > 0){
            this.setState({page: prev-1});
            this.getProjects(prev-1);
        }
    }

    nextPage = () =>{
        let next = this.state.page;
        let overallLength = Math.ceil(projectLists.length/3);
        if(next < overallLength){
            this.setState({page: next+1});
            this.getProjects(next+1);
        }
    }

  render() {
      if(this.state.backgroundId === ''){
        return(
            <div></div>
        )
      }else{

        const list = this.state.projects.map((data, index) => 
        <Zoom>
        <div className="testimonial">
            <img id={data.title} onClick={this.showSlides} className="projectPic" src={require(`./projectPics/${data.mainpic}.jpg`)} alt="" style={{width: '280px'}} />
            {data.link === ''? 
                <h4><a target="_blank" href={data.githubLink} rel="noopener noreferrer">{data.title}</a></h4>
                :
                <h4><a className="linkIcon" style={{color: `rgb(${this.state.variant})`}} target="_blank" href={data.link} rel="noopener noreferrer"><FaGlobe/></a> <a target="_blank" href={data.githubLink} rel="noopener noreferrer">{data.title}</a></h4>
            }
            <p>{data.description}</p>
            <p>Stack: <b style={{color: `rgb(${this.state.variant})`}}>{data.skills}</b></p>
        </div>
        </Zoom>
        )
        const slideshow = this.state.slides.map((data) => 
                require(`./projectPics/${data}.jpg`)
        )
        return (
        <React.Fragment>
                <header>
                    <div className="overlay"></div>
                    <video playsInline="playsinline" autoPlay="autoplay" muted="muted" loop="loop">
                        <source src={`https://drive.google.com/uc?export=download&id=${this.state.backgroundId}`} type="video/mp4" />
                    </video>
                    <div className="container h-100">
                        <div className="d-flex h-100 text-center align-items-center">
                            <div className="w-100 text-white">
                                <span className='text' style={{fontWeight: '600'}}>{this.state.greet}</span>
                                <Typist className='text' avgTypingDelay={75} cursor={{show: true, blink: true, element: '|', hideWhenDone: true}}>
                                    <span className='text' style={{fontWeight: '600'}}>I am a web developer.</span>       
                                    <Typist.Backspace count={14} delay={700} />
                                    <span className='text' style={{fontWeight: '600'}}>software engineer.</span>
                                    <Typist.Backspace count={20} delay={700} />
                                    <span className='text' style={{fontWeight: '600'}}>an aspiring individual.</span>
                                    <Typist.Backspace count={23} delay={700} />
                                    <span className='text' style={{fontWeight: '600'}}>Vimean Sam.</span>
                                </Typist>   
                                <p className='text'>Welcome to my website</p>
                            </div>
                        </div>
                    </div>       
                </header>
                <div className="portfolioContainer">
                    <div className="row">
                        <div className="column" >
                            <Fade>
                            <img className="picture" src={photo} alt="vs" width="100%"></img>
                            </Fade>
                            <div className="cardTab">
                                <Zoom>
                                <h3 style={{marginTop: '10px', marginBottom: '20px'}}>Vimean Sam</h3>
                                    <p><span style={{color: `rgb(${this.state.variant})`}}><FaHome/></span> California</p>
                                    <p><span style={{color: `rgb(${this.state.variant})`}}><FaEnvelope/></span> <a target="_blank" href="mailto:vimeansam2017@gmail.com" rel="noopener noreferrer">vimeansam@gmail.com</a></p>
                                    <p><span style={{color: `rgb(${this.state.variant})`}}><FaPhone/></span> (209)-968-8736</p>
                                    <p><span style={{color: `rgb(${this.state.variant})`}}><FaPaperclip/></span> <a target="_blank" href={resume} rel="noopener noreferrer">Resume</a></p>
                                    <p><span style={{color: `rgb(${this.state.variant})`}}><FaGithub/></span> <a target="_blank" href="https://github.com/VimeanSam" rel="noopener noreferrer">GitHub</a></p>
                                    <p><span style={{color: `rgb(${this.state.variant})`}}><FaLinkedin/></span> <a target="_blank" href="https://www.linkedin.com/in/vimean-sam-4040a713a/" rel="noopener noreferrer">Linkedin</a></p>
                                <hr></hr>
                                <h4 style={{marginBottom: '10px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaInfoCircle/></span> About</h4>
                                <p>Greetings, my name is Vimean Sam. I am a San Francisco State University Alumni with a keen interest in full stack web development. 
                                    I am a highly motivated individual who is successful in both individual and team settings. Aside from programming, I like to watch movies, play basketball, and workout.  
                                </p>
                                <hr></hr>
                                <h4 style={{marginBottom: '10px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaBrain/></span> Skills</h4>
                                <h6><span style={{color: `rgb(${this.state.variant})`}}><FaCode/></span> Programming Languages</h6>
                                <div>
                                    <ul className="multi-column">
                                        <li>JavaScript</li>
                                        <li>HTML</li>
                                        <li>CSS</li>
                                        <li>Java</li>
                                        <li>C++</li>
                                        <li>C</li>
                                        <li>Python</li>
                                        <li>Go</li>
                                        <li>React.js</li>
                                    </ul>
                                </div>
                                <h6><span style={{color: `rgb(${this.state.variant})`}}><FaDatabase/></span> Database Languages</h6>
                                <div>
                                    <ul className="multi-column">
                                        <li>MySQL</li>
                                        <li>MongoDB</li>
                                    </ul>
                                </div>
                                <h6><span style={{color: `rgb(${this.state.variant})`}}><FaTools/></span> Other Tools</h6>
                                <div>
                                    <ul className="multi-column">
                                        <li>Photoshop</li>
                                        <li>Microsoft Office</li>
                                        <li>Linux</li>
                                    </ul>
                                </div>
                                <h6><span style={{color: `rgb(${this.state.variant})`}}><FaCommentAlt/></span> Soft Skills</h6>
                                <div>
                                    <ul className="multi-column">
                                        <li>Teamwork</li>
                                        <li>Adaptibility</li>
                                        <li>Communication</li>
                                        <li>Problem-solving</li>
                                    </ul>
                                </div>
                                </Zoom>
                            </div>
                        </div>
                        <div className="column-3">
                            <div className="cardTab">
                                <Zoom>
                                <h3><span style={{color: `rgb(${this.state.variant})`}}><FaBriefcase/></span> Work Experience</h3>
                                <div style={{padding: '15px'}}>
                                    <h5><b>Freelance Web Developer</b></h5>
                                    <h6 style={{color: `rgb(${this.state.variant})`, marginTop: '10px'}}><span><FaCalendarAlt/></span> Apr 2020</h6>
                                    <p>Designed and developed <a target="_blank" href="https://bagelsnmore.netlify.app/" rel="noopener noreferrer">https://bagelsnmore.netlify.app/</a> to display contact information and menu for a local sandwich shop in my hometown.</p>
                                    <p>Used <b style={{color: `rgb(${this.state.variant})`}}>HTML</b>, <b style={{color: `rgb(${this.state.variant})`}}>CSS</b>, <b style={{color: `rgb(${this.state.variant})`}}>BootStrap</b>, and <b style={{color: `rgb(${this.state.variant})`}}>JavaScript </b>
                                    for client-side development and host website deployment with <b style={{color: `rgb(${this.state.variant})`}}>Netlify</b>.
                                    </p>

                                    <h5><b>Software Engineer Intern</b></h5>
                                    <img src={ultimo} height="40px" width="150px" title="UltimoSoft" alt="ultimo"></img>
                                    <h6 style={{color: `rgb(${this.state.variant})`, marginTop: '10px'}}><span><FaCalendarAlt/></span> Jan 2020 - Mar 2020</h6>
                                    <p>Learned techniques of Software Integrations by using <b style={{color: `rgb(${this.state.variant})`}}>MuleSoft </b>
                                    to implement API flows that connect different web services (<b style={{color: `rgb(${this.state.variant})`}}>REST</b>, <b style={{color: `rgb(${this.state.variant})`}}>SOAP</b>) with various systems and databases (mainly <b style={{color: `rgb(${this.state.variant})`}}>MySQL</b>)
                                    and transform data for valid API results using <b style={{color: `rgb(${this.state.variant})`}}>DataWeave</b>.</p>
                                    <p>
                                    Connected, retrieved, and modfied data between <b style={{color: `rgb(${this.state.variant})`}}>Java</b> client and <b style={{color: `rgb(${this.state.variant})`}}>Oracle Netsuite</b>.
                                    </p>
                                    <p>
                                    Used <b style={{color: `rgb(${this.state.variant})`}}>Salesforce</b> Platform to create, connect, and modify data using Salesforce language of <b style={{color: `rgb(${this.state.variant})`}}>Apex Code</b>, <b style={{color: `rgb(${this.state.variant})`}}>SOQL</b>, and <b style={{color: `rgb(${this.state.variant})`}}>SOSL</b>. 
                                    </p>
                                    <p>
                                    Wrote an automated test script in <b style={{color: `rgb(${this.state.variant})`}}>Python</b> and deployed to <b style={{color: `rgb(${this.state.variant})`}}>AWS</b> and included a <b style={{color: `rgb(${this.state.variant})`}}>Cron</b> scheduler.
                                    </p>
                                </div>
                                </Zoom>
                            </div>
                            <br></br>
                            <div className="cardTab">
                                <Zoom>
                                <h3><span style={{color: `rgb(${this.state.variant})`}}><FaGraduationCap/></span> Education</h3>
                                <div style={{padding: '15px'}}>
                                    <h5>San Francisco State University</h5>
                                    <img src={sfsu} height="40px" width="150px" title="UltimoSoft" alt="SFSU"></img>
                                    <h6 style={{color: `rgb(${this.state.variant})`, marginTop: '10px'}}><span><FaCalendarAlt/></span> Aug 2015 - Jul 2019</h6>
                                    <p>Received a <b style={{color: `rgb(${this.state.variant})`}}>Bachelor's Degree</b> in <b style={{color: `rgb(${this.state.variant})`}}>Computer Science</b> and graduated as a <b style={{color: `rgb(${this.state.variant})`}}>Cum Laude Honor</b> with a GPA of 3.69.</p>
                                </div>
                                </Zoom>
                            </div>
                            <br></br>
                            <div className="cardTab">
                                <h3><span style={{color: `rgb(${this.state.variant})`}}><FaLaptopCode/></span> Projects</h3>
                                <p>The GitHub repo of the project is accessible by clicking the title. 
                                    If there is a valid URL for project demo, it can be accessed by clicking the globe icon.
                                </p>
                                {list}
                                <div className="control">
                                    <span className="arrow round" style={{textDecoration: 'none'}} onClick={this.previousPage}>&#8249;</span>
                                    <span> {this.state.page} / {Math.ceil(projectLists.length/3)} </span>
                                    <span className="arrow round" style={{textDecoration: 'none'}} onClick={this.nextPage}>&#8250;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.open && (
                        <Lightbox
                        mainSrc={slideshow[this.state.photoIndex]}
                        nextSrc={slideshow[(this.state.photoIndex + 1) % slideshow.length]}
                        prevSrc={slideshow[(this.state.photoIndex + slideshow.length - 1) % slideshow.length]}
                        animationOnKeyInput={true}
                        onCloseRequest={() => this.setState({ open: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                            photoIndex: (this.state.photoIndex + slideshow.length - 1) % slideshow.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                            photoIndex: (this.state.photoIndex + 1) % slideshow.length
                            })
                        }
                />)}
                <br></br>
            <footer>
                <br></br>
                <p>Simple resume website created by Vimean Sam using React.js and CSS</p>
            </footer>
        </React.Fragment>
        );
        }
    }
}
    
 
export default App;