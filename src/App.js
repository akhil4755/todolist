import React from 'react';

const initialstate = {
    list: [],

      textboxvalue: null,
  };

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialstate
}

handlecolorChange = (e) =>
{
    let listitem = [{

      item : this.state.textboxvalue,      

    }]

    /*let flag=0;

    if(this.state.customization.length === 0)
    {
      this.setState({ customization:customizationElement });
    }
    else 
    {
      let arr = this.state.customization;

        for(let i=0; i<arr.length; i++)
        {
          if(arr[i].class === this.state.classValue )
          {
             arr[i].color = e.target.value;
             this.setState({customization:arr})
             flag = 1;
          }
        }
        if(flag === 0)
        {*/
          let listarr = this.state.list;
          let concatedcustarray = listarr.concat(listitem);
          this.setState({list:concatedcustarray})
        //}
    //}
}

handleDeleteitem = (e) =>
{
  let arr = this.state.list;
  arr.splice(e.target.id,1);
  this.setState({list: arr});
}


  render() {
      console.log(this.state.list)

      let showlist = this.state.list.map( (value,i) => {
          return(<div>
              <p> {value.item} </p> 
              <button id={i} onClick={this.handleDeleteitem}> X </button>
          </div>)
      })
    
    return (
        <div>
          <center> 

            <h3> To Do's ! </h3> <br/>
            
            { showlist }

            <input type="text" onChange={(e)=> { this.setState({textboxvalue:e.target.value}) }} />   
            <button onClick={this.handlecolorChange} > add </button>

          </center>
        </div>
      );
  }
}

export default App;