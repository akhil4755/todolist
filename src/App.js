import React from 'react';

const initialstate = {
    list: [],
    done: [],

    textboxvalue: null,
    selectid:0,
    count:0,
  };

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialstate;
}

//Add elements to the list 
handleAddList = (e) =>
{
    let listarr = this.state.list;

    let listitem = [{  
        item : this.state.textboxvalue, 
        id : this.state.count 
      }];

    let concatedlistarray = listarr.concat(listitem);
    this.setState({ list:concatedlistarray })
    let c = this.state.count; 
    this.setState({ count: ++c });
}

//Delete element from unfinished items list
handleDeletelistitem = (e) =>
{
  let arr = this.state.list;
  let pos = null; 

  for(let i=0; i<arr.length; i++)
  {
    if(arr[i].id === e.target.id)
    {
      pos = i;
    }
  }
  arr.splice(pos,1);
  this.setState({list: arr});
}

//Delete element from done list
handleDeletedoneitem = (e) =>
{
  let arr = this.state.done;
  let pos = null;

  for(let i=0; i<arr.length; i++)
  {
    if(arr[i].id === e.target.id)
    {
      pos = i;
    }
  }
  arr.splice(pos,1);
  this.setState({done: arr});
}

//Moving list elements from unfinished to completed items
handlechangetodone = (e) =>
{
  let arrList = this.state.list;
  let arrDone = this.state.done;
  let pos = null;

  for(let i=0; i< arrList.length; i++)
  {
    if(arrList[i].id === e.target.id)
    {
      console.log("jajaja");
      pos = i;
    }
  }
  let toDone = arrList[pos];
  arrList.splice(pos, 1);
  arrDone = arrDone.concat(toDone);
  this.setState({done: arrDone});
}

//Moving list elements from done, back to yet to be completed
handlechangebacktolist = (e) =>
{  
  let arrDone = this.state.done;
  let arrList = this.state.list;
  let pos = null;

  for(let i=0; i<arrDone.length; i++)
  {
    if(arrDone[i].id === e.target.id)
    {
      pos = i;
    }
  }
  let toList = arrDone[pos];
  arrDone.splice(pos, 1);
  arrList = arrList.concat(toList);
  this.setState({list: arrList});
}

  render() {
      console.log("list" , this.state.list)
      console.log("done" , this.state.done)

//Print the items that are unfinished
      let showlist = null;

      if(this.state.list.length === 0)
      {
        showlist = null;
      }
      else
      {
        showlist = this.state.list.map( (value,i) => {
          return(<div>              
                    <input id={value.id} type="checkbox" onChange={this.handlechangetodone} />
                    <input id={value.id} type="text" value={value.item}  onChange={(e)=> 
                      { 
                        let arr = this.state.list;
                        let pos = null;
                        for(let i=0; i<arr.length; i++)
                        {
                          if(arr[i].id === e.target.id)
                            pos = i;
                        }
                        arr[pos].item = e.target.value;
                        this.setState({list: arr}); 
                    }}/>
                    <button id={value.id} onClick={this.handleDeletelistitem}> X </button>
                </div>)         
        })
      }

//Print the items that are done
      let done = null;

      if(this.state.done.length === 0)
      {
        done = null;
      }
      else
      {      
        done = this.state.done.map((value) =>{
          return(<div>
                  <input id={value.id} type="checkbox" onChange={this.handlechangebacktolist} checked />
                    <p> <s>{value.item} </s> </p>
                    <button id={value.id} onClick={this.handleDeletedoneitem}> X </button>
                </div>)
        })
      }

//Separating the items based on completion      
      let splitter = null;
      if(this.state.done.length !==0)
        splitter = (<hr/>)
    
//Rendering
    return (
        <div>
          <center> 

            <h3><u> To Do's ! </u></h3> <br/>
            
            { showlist }            
            <hr/>
            { done }
            { splitter }
            <input type="text" onChange={(e)=> { this.setState({textboxvalue:e.target.value}) }} />   
            <button onClick={this.handleAddList} > add </button>

          </center>
        </div>
      );
  }
}

export default App;