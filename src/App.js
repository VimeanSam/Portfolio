import React, { Component } from "react";
import './App.css';
import 'react-typist/dist/Typist.css';
import Typist from 'react-typist';
import photo from './Images/Me.jpg';
import ultimo from './Images/ultimo.png';
import acm from './Images/acmlogo.png';
import edduus from './Images/edduus.png';
import sfsu from './Images/sfsu.png';
import {FaEnvelope, FaHome, FaPhone, FaCode, FaDatabase, FaBrain, FaTools, FaBriefcase, FaCalendarAlt, FaLaptopCode, FaGraduationCap, FaGlobe, FaGithub, FaPaperclip, FaInfoCircle, FaCommentAlt, FaLinkedin, FaBasketballBall} from "react-icons/fa";
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
        backgroundImg: '',
        color: '',
        greet: '',
        open: false,
        index: -1,
        photoIndex: 0,
        slides: [],
        page: 1,
        projects: [],
        start: 0,
        stop: 2,
    };
  } 

  componentDidMount() {
        this.tick()
        //this.getProjects(1);
  }

  componentWillUnmount() {
      clearInterval(this.interval);
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
            backgroundImg: require('./Images/sfmorning.jpg')
        }); 
        
    }else if(currentTime < 18){
        this.setState({
            backgroundColor: '#D5E6F5',
            variant: '4,129,191',
            greet: 'Good Afternoon,',
            color: 'white',
            backgroundImg: require('./Images/sfday.jpg')
        }); 
    }else{
        this.setState({
            backgroundColor: '#282c34',
            variant: '0,32,96',
            greet: 'Good Evening,',
            color: 'white',
            backgroundImg: require('./Images/sf.jpg')
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
        let prev = this.state.page-1;
        if(prev > 0){
            this.setState({page: prev});
            let start = ((prev-1)*3)
            let stop = start+2
            if(stop >= projectLists.length){
                stop = projectLists.length;
            }
            this.setState({start: start})
            this.setState({stop: stop})
        }
    }

    nextPage = () =>{
        let next = this.state.page;
        let overallLength = Math.ceil(projectLists.length/3);
        if(next < overallLength){
            let newPage = next+1;
            this.setState({page: newPage});
            let start = ((newPage-1)*3)
            let stop = start+2
            if(stop >= projectLists.length){
                stop = projectLists.length;
            }
            this.setState({start: start})
            this.setState({stop: stop})
        }
    }

  render() {
        const list = projectLists.map((data, index) => 
        (index >= this.state.start && index <= this.state.stop) &&
        <Fade key={index}>
        <div className="card mb-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                <img className="card-img projectImg" id={data.title} onClick={this.showSlides} src={require(`./projectPics/${data.mainpic}.jpg`)} alt="" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        {data.link === ''? 
                        <h4><a target="_blank" href={data.githubLink} rel="noopener noreferrer">{data.title}</a></h4>
                        :
                        <h4><a target="_blank" href={data.githubLink} rel="noopener noreferrer">{data.title}</a> <a className="linkIcon" style={{color: `rgb(${this.state.variant})`}} target="_blank" href={data.link} rel="noopener noreferrer"><FaGlobe/></a></h4>
                        }
                        <p style={{fontSize: '19px'}}>Stack: <b style={{color: `rgb(${this.state.variant})`}}>{data.skills}</b></p>
                        <details style={{fontSize: '19px'}}>
                            <summary>More information</summary>
                            <Fade>
                                <p>{data.description}</p>
                            </Fade>
                        </details>
                    </div>
                </div>
            </div>
        </div>
        </Fade>
        )
        const slideshow = this.state.slides.map((data) => 
                require(`./projectPics/${data}.jpg`)
        )
        return (
        <React.Fragment>
                <div className="header" style={{backgroundImage: `url(${this.state.backgroundImg})`, color:`${this.state.color}`}}>
                    <h1>{this.state.greet}</h1>
                    <Typist avgTypingDelay={75} cursor={{show: true, blink: true, element: '|', hideWhenDone: true}}>
                        <span style={{fontWeight: '600'}}>I am a web developer.</span>       
                        <Typist.Backspace count={14} delay={700} />
                        <span style={{fontWeight: '600'}}>software engineer.</span>
                        <Typist.Backspace count={20} delay={700} />
                        <span style={{fontWeight: '600'}}>an aspiring individual.</span>
                        <Typist.Backspace count={23} delay={700} />
                        <span style={{fontWeight: '600'}}>Vimean Sam.</span>
                    </Typist>   
                    <p>Welcome to my website</p>
                </div>
                <div className="portfolioContainer">
                    <div className="row">
                        <div className="column" >
                            <div className="cardTab">
                                <Fade>
                                    <div style={{textAlign: 'center'}}>
                                        <img id="me" src={photo} alt="vs"></img>
                                    </div>
                                </Fade>
                                <Zoom>
                                <h1 style={{marginTop: '10px', marginBottom: '20px'}}><b>Vimean Sam</b></h1>
                                    <p style={{fontSize: '19px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaHome/></span> California</p>
                                    <p style={{fontSize: '19px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaEnvelope/></span> <a target="_blank" href="mailto:vimeansam2017@gmail.com" rel="noopener noreferrer">vimeansam2017@gmail.com</a></p>
                                    <p style={{fontSize: '19px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaPhone/></span> (209)-968-8736</p>
                                    <p style={{fontSize: '19px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaPaperclip/></span> <a target="_blank" href={resume} rel="noopener noreferrer">Resume</a></p>
                                    <p style={{fontSize: '19px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaGithub/></span> <a target="_blank" href="https://github.com/VimeanSam" rel="noopener noreferrer">GitHub</a></p>
                                    <p style={{fontSize: '19px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaLinkedin/></span> <a target="_blank" href="https://www.linkedin.com/in/vimean-sam-4040a713a/" rel="noopener noreferrer">Linkedin</a></p>
                                <hr></hr>
                                <h2 style={{marginBottom: '10px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaInfoCircle/></span><b> About</b></h2>
                                <p style={{fontSize: '19px'}}>Greetings, my name is Vimean Sam. I am a San Francisco State University Alumni with a keen interest in full stack web development. 
                                    I am a highly motivated individual who is successful in both individual and team settings.
                                </p>
                                <hr></hr>
                                <h2 style={{marginBottom: '10px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaBrain/></span><b> Skills</b></h2>
                                <span className="category"><span style={{color: `rgb(${this.state.variant})`}}><FaCode/></span> Programming Languages</span>
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
                                <span className="category"><span style={{color: `rgb(${this.state.variant})`}}><FaDatabase/></span> Database Languages</span>
                                <div>
                                    <ul className="multi-column">
                                        <li>MySQL</li>
                                        <li>MongoDB</li>
                                    </ul>
                                </div>
                                <span className="category"><span style={{color: `rgb(${this.state.variant})`}}><FaTools/></span> Other Tools</span>
                                <div>
                                    <ul className="multi-column">
                                        <li>Photoshop</li>
                                        <li>Microsoft Office</li>
                                        <li>Linux</li>
                                    </ul>
                                </div>
                                <span className="category"><span style={{color: `rgb(${this.state.variant})`}}><FaCommentAlt/></span> Soft Skills</span>
                                <div>
                                    <ul className="multi-column">
                                        <li>Teamwork</li>
                                        <li>Adaptibility</li>
                                        <li>Communication</li>
                                        <li>Problem-solving</li>
                                    </ul>
                                </div>
                                <hr></hr>
                                <h2 style={{marginBottom: '10px'}}><span style={{color: `rgb(${this.state.variant})`}}><FaBasketballBall/></span><b> Hobbies</b></h2>
                                    <ul className="multi-column">
                                        <li>Basketball</li>
                                        <li>Hiking</li>
                                        <li>Watch movies</li>
                                        <li>Workout</li>
                                        <li>Skateboarding</li>
                                    </ul>
                                </Zoom>
                            </div>
                        </div>
                        <div className="column-3">
                            <div className="cardTab">
                                <Zoom>
                                <h2><span style={{color: `rgb(${this.state.variant})`}}><FaBriefcase/></span><b> Work Experience</b></h2>
                                <div style={{padding: '15px'}}>
                                    <h4>Software Engineer (Remote)</h4>
                                    <img src={edduus} height="40px" width="40px" title="Edduus" alt="edduus"></img>
                                    <h5 style={{color: `rgb(${this.state.variant})`, marginTop: '10px'}}><span><FaCalendarAlt/></span> Aug 2020 - present</h5>
                                    <ul className="bullet-point">
                                        <li>Developing payment gateway via <b style={{color: `rgb(${this.state.variant})`}}>Stripe API</b> for Edduus Livestream website using <b style={{color: `rgb(${this.state.variant})`}}>PHP</b>,
                                            <b style={{color: `rgb(${this.state.variant})`}}> HTML</b>, <b style={{color: `rgb(${this.state.variant})`}}> Postgres</b>, and <b style={{color: `rgb(${this.state.variant})`}}> JavaScript</b>.
                                        </li>
                                    </ul>
                                    <hr></hr>
                                    <h4>Web Developer (Freelance)</h4>
                                    <img src={acm} height="50px" width="55px" title="ACM" alt="ACM"></img>
                                    <h5 style={{color: `rgb(${this.state.variant})`, marginTop: '10px'}}><span><FaCalendarAlt/></span> May 2020 - Aug 2020</h5>
                                    <ul className="bullet-point">
                                        <li>
                                            Contributed to the development of a <a target="_blank" href="https://sfsu-acm.club/posts" rel="noopener noreferrer">website</a> for ACM organization at SFSU.
                                        </li>
                                        <li>
                                            Designed and integrated <b style={{color: `rgb(${this.state.variant})`}}>Markdown</b> and <b style={{color: `rgb(${this.state.variant})`}}>HTML</b> compatible post page to <b style={{color: `rgb(${this.state.variant})`}}>Node.js/Express</b> server, <b style={{color: `rgb(${this.state.variant})`}}>MongoDB</b> database, and <b style={{color: `rgb(${this.state.variant})`}}>Socket.IO</b> network.
                                        </li>
                                        <li>
                                            Unified <b style={{color: `rgb(${this.state.variant})`}}>frontend</b> team and designed <b style={{color: `rgb(${this.state.variant})`}}>UI</b>/<b style={{color: `rgb(${this.state.variant})`}}>UX</b> interface using <b style={{color: `rgb(${this.state.variant})`}}>React.js</b> for users to view/comment on ACM posts in real-time.
                                        </li>
                                    </ul>
                                    <h5 style={{color: `rgb(${this.state.variant})`, marginTop: '10px'}}><span><FaCalendarAlt/></span> Apr 2020</h5>
                                    <ul className="bullet-point">
                                        <li>Designed and developed a static <a target="_blank" href="https://bagelsnmore.netlify.app/" rel="noopener noreferrer">website</a> to display contact information and menu for a local sandwich shop in my hometown.
                                        </li>
                                        <li>Used <b style={{color: `rgb(${this.state.variant})`}}>HTML</b>, <b style={{color: `rgb(${this.state.variant})`}}>CSS</b>, <b style={{color: `rgb(${this.state.variant})`}}>BootStrap</b>, and <b style={{color: `rgb(${this.state.variant})`}}>JavaScript </b>
                                        for client-side development and host website deployment with <b style={{color: `rgb(${this.state.variant})`}}>Netlify</b>.
                                        </li>
                                    </ul>
                                    <hr></hr>
                                    <h4>Software Engineer Intern</h4>
                                    <img src={ultimo} height="40px" width="150px" title="UltimoSoft" alt="ultimo"></img>
                                    <h5 style={{color: `rgb(${this.state.variant})`, marginTop: '10px'}}><span><FaCalendarAlt/></span> Jan 2020 - Mar 2020</h5>
                                    <ul className="bullet-point">
                                        <li>Learned techniques of Software Integrations by using <b style={{color: `rgb(${this.state.variant})`}}>MuleSoft </b>
                                        to implement API flows that connect different web services (<b style={{color: `rgb(${this.state.variant})`}}>REST</b>, <b style={{color: `rgb(${this.state.variant})`}}>SOAP</b>) with various systems and databases (mainly <b style={{color: `rgb(${this.state.variant})`}}>MySQL</b>).
                                        </li>
                                        <li>
                                            Utilized <b style={{color: `rgb(${this.state.variant})`}}>DataWeave</b> to transform API data into various content types such as <b style={{color: `rgb(${this.state.variant})`}}>JSON</b> and <b style={{color: `rgb(${this.state.variant})`}}>XML</b>
                                        </li>
                                        <li>
                                        Connected, retrieved, and modfied data between <b style={{color: `rgb(${this.state.variant})`}}>Java</b> client and <b style={{color: `rgb(${this.state.variant})`}}>Oracle Netsuite</b>.
                                        </li>
                                        <li>
                                        Used <b style={{color: `rgb(${this.state.variant})`}}>Salesforce</b> Platform to create, connect, and modify data using Salesforce language of <b style={{color: `rgb(${this.state.variant})`}}>Apex Code</b>, <b style={{color: `rgb(${this.state.variant})`}}>SOQL</b>, and <b style={{color: `rgb(${this.state.variant})`}}>SOSL</b>. 
                                        </li>
                                    </ul>
                                </div>
                                </Zoom>
                            </div>
                            <br></br>
                            <div className="cardTab">
                                <Zoom>
                                <h2><span style={{color: `rgb(${this.state.variant})`}}><FaGraduationCap/></span> <b>Education</b></h2>
                                <div style={{padding: '15px'}}>
                                    <h4>San Francisco State University</h4>
                                    <h5>B.S, Computer Science</h5>
                                    <img src={sfsu} height="40px" width="150px" title="UltimoSoft" alt="SFSU"></img>   
                                    <h5 style={{color: `rgb(${this.state.variant})`, marginTop: '10px'}}><span><FaCalendarAlt/></span> Aug 2015 - Jul 2019</h5>
                                    <p style={{fontSize: '19px'}}>3.69 GPA (Cum Laude)</p>
                                </div>
                                </Zoom>
                            </div>
                            <br></br>
                            <div className="cardTab">
                                <h2><span style={{color: `rgb(${this.state.variant})`}}><FaLaptopCode/></span><b> Projects</b></h2>
                                <p style={{fontSize: '19px'}}>The GitHub repo of the project is accessible by clicking the title. 
                                    <b> The globe icon </b> contains a link to the live demo of the project.
                                </p>
                                {list}
                                <div className="control">
                                    {
                                        (this.state.page-1 > 0)?
                                            <span className="arrow round" style={{textDecoration: 'none', backgroundColor: `rgb(${this.state.variant})`}} onClick={this.previousPage}>&#9665;</span>
                                            :
                                            <span className="arrowDisabled round" style={{textDecoration: 'none'}}>&#9665;</span>
                                    }
                                   
                                    <span style={{fontSize: '19px'}}> Page <b>{this.state.page}</b> of {Math.ceil(projectLists.length/3)} </span>
                                    {
                                        (this.state.page + 1 <= Math.ceil(projectLists.length/3))?
                                            <span className="arrow round" style={{textDecoration: 'none', backgroundColor: `rgb(${this.state.variant})`}} onClick={this.nextPage}>&#9655;</span>
                                            :
                                            <span className="arrowDisabled round" style={{textDecoration: 'none'}}>&#9655;</span>
                                    }
                                   
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
                <p style={{fontSize: '19px'}}>Simple static portfolio website created by Vimean Sam using React.js and CSS</p>
            </footer>
        </React.Fragment>
        );
    }
}
    
 
export default App;