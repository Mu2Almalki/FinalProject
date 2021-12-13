import { Component } from "react";
import '../App.css'
import Login from "./Login";
import Signup from "./Signup";

class AppLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogginActive:true
         }
    }

    componentDidMount() {
        //Add .right by default
        this.rightSide.classList.add("right");
      }

changeState(){
    const {isLogginActive}= this.state;
    if (isLogginActive) {
        this.rightSide.classList.remove("right");
        this.rightSide.classList.add("left");
      } else {
        this.rightSide.classList.remove("left");
        this.rightSide.classList.add("right");
      }
      this.setState(prevState => ({ isLogginActive: !prevState.isLogginActive }));
    }

    render() {
      const {isLogginActive} =this.state;
      const current =isLogginActive? "Signup":"Login";
      const currentActive = isLogginActive? "login": "signup";
        return ( 
            <div className="signin">
            <div className="login">
                <div className="containerf">
                  {isLogginActive && (<Login containerRef={(ref)=>this.current = ref} />)}
                  {!isLogginActive && (<Signup containerRef={(ref)=>this.current = ref} />) }
                </div>
                <RightSide current={current}
                  currentActive={currentActive}
                 containerRef={ref=>this.rightSide =ref }
                 onClick={this.changeState.bind(this)} />
            </div>
            </div>
        
         );
    }
}


const RightSide = props=>{
    return( 
    <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
        <div className="inner-container">
            <div className="text">
                {props.current}
            </div>
        </div>

    </div>
    )
}
 
export default AppLogin;