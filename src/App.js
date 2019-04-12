import React from 'react';

const initialstate = {
    list: [],
    done: [],

    textboxvalue: null,
  };

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialstate
}

handleAddList = (e) =>
{
    let listitem = [{  item : this.state.textboxvalue }];

    let listarr = this.state.list;
    let concatedlistarray = listarr.concat(listitem);
    this.setState({list:concatedlistarray})
}

handleDeletelistitem = (e) =>
{
  let arr = this.state.list;
  arr.splice(e.target.id,1);
  this.setState({list: arr});
}

handleDeletedoneitem = (e) =>
{
  let arr = this.state.done;
  arr.splice(e.target.id,1);
  this.setState({done: arr});
}

handlechangetodone = (e) =>
{
  let arrList = this.state.list;
  let arrDone = this.state.done;
  let toDone = arrList[e.target.id];
  arrList.splice(e.target.id, 1);
  arrDone = arrDone.concat(toDone);
  this.setState({done: arrDone});
}

handlechangebacktolist = (e) =>
{  
  let arrList = this.state.list;
  let arrDone = this.state.done;

  let toList = arrDone[e.target.id];
  arrDone.splice(e.target.id, 1);

  arrList = arrList.concat(toList);
  this.setState({list: arrList});
}

  render() {
      console.log("list" , this.state.list)
      console.log("done" , this.state.done)

      let showlist = this.state.list.map( (value,i) => {
        return(<div>              
                  <input id={i} type="checkbox" onChange={this.handlechangetodone}/>
                  <input type="text" value={value.item}  onChange={(e)=> 
                    { 
                      let x = this.state.list;
                      x[i].item = e.target.value;
                      this.setState({list: x}) 
                  }}/>
                  <button id={i} onClick={this.handleDeletelistitem}> X </button>
              </div>)
      })

      let done = this.state.done.map( (value,i) =>{
        return(<div>
                <input id={i} type="checkbox" onChange={this.handlechangebacktolist} checked/>
                  <p> <s>{value.item} </s> </p>
                  <button id={i} onClick={this.handleDeletedoneitem}> X </button>
              </div>)
      })
    
    return (
        <div>
          <center> 

            <h3><u> To Do's ! </u></h3> <br/>
            
            { showlist }
            <hr/>

            { done }

            <hr/>

            <input type="text" onChange={(e)=> { this.setState({textboxvalue:e.target.value}) }} />   
            <button onClick={this.handleAddList} > add </button>

          </center>
        </div>
      );
  }
}

export default App;