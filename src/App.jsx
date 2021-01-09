import React, { Component } from 'react'
import {data} from "./data"
import "./App.css"
export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data,
       currentPage:0

    }
  }
  nextPage = ()=>{
    if(this.state.currentPage<this.state.data.length-1){
      this.setState({currentPage:this.state.currentPage+1})
    }
    
  }  
  prevPage = ()=>{
    if(this.state.currentPage>0){
      this.setState({currentPage:this.state.currentPage-1})
    }
    
  }  
  render() {
    console.log("current page",this.state.currentPage)
    console.log("length",this.state.data.length)
    let disablePrev = !this.state.currentPage ? "true" : ""
    let disableNext = this.state.currentPage < this.state.data.length-1 ? "" : "true"
    // let disable = !this.state.currentPage ? "true" : ""
    // console.log("data><><",this.state.data[this.state.currentPage ? 1 : 0])
    const datum = [...[this.state.data[this.state.currentPage ]]]
    return (
      <div className="App">
          {
            datum.map(firstpage=>{
              return(
                <div className="welcome" key={firstpage.PageID}>{firstpage.Name}
                    <div>
                        {
                          firstpage.Sections.map(question=>{
                            return (
                              <div key={question.SectionID} className="question">{question.Label}
                                {
                                  question.Questions.map(everyQuestion=>{
                                    let element, elems
                                    if(everyQuestion.UI === "cb"){
                                      element = <input type="checkbox"/>
                                    }
                                    if(everyQuestion.UI === "tb" ){
                                      element = <input type="text"/>
                                    }
                                    if(everyQuestion.UI === "rbil" ){
                                      element = <input type="radio"/>
                                    }
                                    if(everyQuestion.Options === null){
                                      elems = <>
                                      <div className="checkbox">{element}</div> 
                                      <div className="answers">{everyQuestion.Label}</div> 
                                      </>
                                    }
                                    if(Array.isArray(everyQuestion.Options)){
                                      elems = <div className="radio">
                                          <div >{everyQuestion.Label}</div> 
                                          {
                                            everyQuestion.Options.map(radio=>{
                                              return (
                                                <div key={radio.QuestionOptionID} id="radios">
                                                <div>{element}</div>
                                                <div>{radio.Value}</div>
                                              </div>
                                              )
                                            })
                                          }
                                      </div>
                                    }
                                   
                                    return(
                                      <div key={everyQuestion.QuestionID} className="everyQuestion">
                                        <div className="labels">
                                              {elems}                          
                                        </div>                 
                                        </div>
                                    )
                                  })
                                }
                              
                              </div>
                            )
                          })
                        }
                    </div>
                </div>
             
              )
            })
          }
          <div id="pagination">
              <input disabled={disablePrev} onClick={this.prevPage}  type="submit" value="prev"/>
              <input disabled={disableNext} onClick={this.nextPage} type="submit" value="next"/>
          </div>        
      </div>
    )
  }
}
