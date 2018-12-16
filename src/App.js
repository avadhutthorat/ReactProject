import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons : [
      { id :1, name : 'Max', age : 24 },
      { id :2, name : 'John', age : 41 },
      { id :3, name : 'Avadhut', age : 28 }
    ]
  }

  // onclick of button 
  switchNameHandler = (newName) => {
    //console.log('Was clicked');
   // DONT DO THIS : this.state.persons[0].name = 'Mangesh';
   this.setState({
    persons : [
      { name : newName, age : 24 },
      { name : 'John', age : 41 },
      { name : 'Avadhut', age : 28 }
    ],
    showPerson : false
   });    
  }
  
  changeNamedHandler = (event,id) => {
    const personIndex = this.state.persons.findIndex((p)=>{
              return p.id ===id;
    });
    const personChange = {...this.state.persons[personIndex]};
   // const personChange = Object.assign({},this.state.persons[personIndex]);

    personChange.name = event.target.value;

    const persons =[...this.state.persons];
    persons[personIndex]=personChange;

    this.setState({ persons : persons
     });
  }

  // Toggle the person list
  toggleHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({ showPerson : !doesShow})
    
  }

  deleteHandler = (deleteIndex) =>{
    // Below statement will copy an array reference - 2 ways slice() or ...spread()
    //const persondelete = this.state.persons.slice();
    const persondelete = [...this.state.persons];
    persondelete.splice(deleteIndex,1);
    this.setState({persons : persondelete});
  }

  render() {
    const style = {
      color : 'white',
      backgroundColor : 'green',
      font : 'inherit',
      border : '2px solid blue',
      cursor : 'pointer',
      padding : '5px',
      
    };

    var persons = null;
     if(this.state.showPerson){
       persons = (
        <div> 
          {
            this.state.persons.map((person,index) => {
              return <Person 
                    click = {() => this.deleteHandler(index)}
                    changed ={(event) => this.changeNamedHandler(event,person.id)}
                    name={person.name}
                    age = {person.age} 
                    key ={person.id}
                    />
            })
          }
    </div> 
       );

       style.backgroundColor = 'red';
      //  style[':hover'] = {
      //     backgroundColor : 'salmon',
      //     color : 'black'
      //  }
     }

     const classes =[];
     if(this.state.persons.length <= 2){
       classes.push('red');
     }
     if(this.state.persons.length <= 1){
       classes.push('bold');
     }
    return (
      
      <div className="App">
      <h1> My React App</h1>
      <p className={classes.join(' ')}>This is practice application</p>
      <button style={style} onClick={this.toggleHandler}>Switch Name</button>
     {persons}
    </div>
      
    );

    
        // // { this.state.showPerson ? <div> 
        //   <Person name={this.state.persons[0].name} age = {this.state.persons[0].age} />
        //     <Person 
        //       name={this.state.persons[1].name} 
        //       age={this.state.persons[1].age} 
        //       click={this.switchNameHandler.bind(this,'Modi')}
        //       changed={this.changeNamedHandler}
        //         >My Hobbies : cricket </Person>
        //         <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
        //     </div> : null
        //   }

      //React.createElement('div',null,'h1','This is react app')
    //return  React.createElement('div',{className : 'App'},React.createElement('h1',null,'This is working now!!!'));
  }
}

export default App;
