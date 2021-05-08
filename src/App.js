import React, { Fragment } from 'react';
import './App.css';
import Expand from "react-expand-animated";
import 'font-awesome/css/font-awesome.min.css';
import Shimmer from "react-shimmer-effect";
import injectSheet from "react-jss";
import errorImage from "./nointernet_connection.png"

const apiUrl = "https://private-anon-948475b39b-githubtrendingapi.apiary-mock.com/repositories";

const StyleSheet = {
  container: {
    borderTop:"1px solid rgba(0,0,0,.125)",
    borderBottom:"1px solid rgba(0,0,0,.125)",
    // boxShadow: "0px 0px 20px rgba(0, 0, 0, .1)",
    // borderRadius: "4px",
    backgroundColor: "white",
    display: "flex",
    padding: "16px",
    width: "500px"
  },
  circle: {
    height: "56px",
    width: "56px",
    borderRadius: "50%"
  },
  line: {
    width: "96px",
    height: "8px",
    alignSelf: "center",
    marginLeft: "16px",
    borderRadius: "8px"
  }
};



class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      error:null,
      isLoaded:false,
      items: []
    };
  }
  fetchRepostiories(){
    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {

          var fetched_items = []
          for(var i=0;i<result.length;i++){
            fetched_items.push({props:result[i],open:false});
          }

          this.setState({
            isLoaded: true,
            items: fetched_items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  componentDidMount() {
    this.fetchRepostiories()
  }

  toggle(index){
    var items = this.state.items.slice();
    for(var i=0;i<items.length;i++){
      if(items[i].open){
        items[i].open=false;
      } else if(i === index){
        items[i].open=true;
      }
    }

    this.setState({
      items:items,
    });
  }

  handleButtonClick = ()=>{
    this.setState({
      error:null,
      isLoaded:false,
    });
    this.fetchRepostiories();
  }

  sort(str){
    var items = this.state.items.slice();
 

    items.sort((a,b)=>(
      str==="stars"?(a.props.stars>b.props.stars?-1:1):(a.props.name.localeCompare(b.props.name))
    ));
    this.setState({
      items:items,
    })
  }

  render() {
    const {error,isLoaded,items} = this.state;
    const { classes } = this.props;
      return (
        <div className="row d-flex justify-content-center">

      <div className="App col-12">
        <div className="text-center py-3 font-weight-bold">
          <div className="">
          <div>
          Trending

            <svg id="dropdownMenuButton" className="float-right text-dark dropdown-toggle bi bi-three-dots-vertical" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>

            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={()=>this.sort("stars")}>Sort by stars</a>
              <a className="dropdown-item" onClick={()=>this.sort("name")}>Sort by name</a>
            </div>

          </div>
          </div>
        </div>
        {error?(
         <div>
           <div className="text-center align-items-center errorDiv">
           <img className="errorImg" src={errorImage} alt="Error"></img>
           <p class="error-message-heading">Something went wrong..</p>
           <p className="text-muted error-message-text">An alien is probably blocking your signal.</p>
           <div class="retry-button align-items-center" onClick={()=>this.handleButtonClick()}>
             <div class="col-12">
             RETRY
            </div>
             </div>
            </div>
         </div>
        ):(!isLoaded?(
          <div>
          <div className={classes.container}>
          <Shimmer>
            <div className={classes.circle} />
            <div className={classes.line} />
          </Shimmer>
        </div>
        <div className={classes.container}>
          <Shimmer>
            <div className={classes.circle} />
            <div className={classes.line} />
          </Shimmer>
        </div>
        <div className={classes.container}>
          <Shimmer>
            <div className={classes.circle} />
            <div className={classes.line} />
          </Shimmer>
        </div>
        <div className={classes.container}>
          <Shimmer>
            <div className={classes.circle} />
            <div className={classes.line} />
          </Shimmer>
        </div>
        </div>
        ):(

        <div className="row d-flex justify-content-center">
        <ul className="list-group px-0">
          
          {items.map((item,index)=>(
            <Fragment>
            <li className="list-group-item mx-0" key={index} onClick={()=>this.toggle(index)}>
              <div className="row align-items-center" >
                <div className="avatar col-2 m-auto">
                  <img src={item.props.avatar} className="rounded-circle" alt={item.props.name} style={{width:40}}>
                  </img>
                </div>
                <div className="col-10">
                    <p style={{fontSize:12}}>
                  {item.props.author}
                  </p>
                  <p style={{fontSize:16}}>
                  {item.props.name}
                  </p>
                  <div className="">
                  <Expand open={item.open}>
                      <p>{item.props.description}</p>
                      <div>
                        <i class="fa fa-circle fa-fw text-danger" aria-hidden="true"></i><span>{item.props.language}</span>
                        <i class="fa fa-star fa-fw text-warning ml-4" aria-hidden="true"></i><span>{item.props.stars}</span>
                        <i class="fa fa-code-fork fa-fw text-dark ml-4" aria-hidden="true"></i><span>{item.props.stars}</span>
                      </div>
                  </Expand>
                </div>
                </div>

              </div>

              {console.log(item)}
            </li>
              </Fragment>
          ))}
        </ul>
          </div> 

        ))}
      
          </div>
          </div>
    );}
    
  
}

export default injectSheet(StyleSheet)(App);
