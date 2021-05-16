import React from 'react';
import './App.css';


const API = "https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20"  //Api Link

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      res: [],   //Empty array to store the api response
    }
    this.handleSelected = this.handleSelected.bind(this);
    
  }

   handleSelected (e) {

    let c = e.currentTarget.childNodes;   //Array of child elements of the clicked card

    c[4].classList.add("show-location"); //adding the class to the 5th child html element this class will show the
                                         //location of the person.

    c[0].classList.add("hide-img");    //this class will larger image of the selected person  

    c[1].classList.remove("hide-img");

    const clickedCard = e.currentTarget.innerHTML;  //Storing the current html. 
    
    //Removing the above defined classes from the elements.
    c[4].classList.remove("show-location");
    c[0].classList.remove("hide-img");
    c[1].classList.add("hide-img");
   
    const selectedCard = document.querySelector(".selected-card"); //The html element that shows the selected card 
                                                                     //at the top.  
    selectedCard.innerHTML = clickedCard  
  }
  
  

  componentDidMount() {
    
    //fetching the data from the Api 
    fetch(API).then(res => res.json())   
      .then(res => {
        console.log(res);
        this.setState({
          res: res.results
        })    
      })
} 
  
  render(){
      const { res } = this.state;  //the current state
      
       let cards = res.map((items, idx)=>{        //setting up all the cards
                            return (
                              <div className="cards"  key={idx} onClick = {this.handleSelected}>

                                <img src={items.picture.medium} alt=""/>

                                <img src={items.picture.large} className="hide-img" alt=""/>

                                <p className="gender">
                                  Gender: {items.gender}
                                </p>

                                <span className="name">
                                  Name: {items.name.title} {items.name.first} {items.name.last}
                                </span>

                                <p className="location">

                                  <span>
                                    Address: {items.location.street.number}, {items.location.street.name}, {items.location.city}, {items.location.state}, Post-Code: {items.location.postcode}, {items.location.country}
                                  </span>

                                </p>

                                <p className="email">
                                  Email: {items.email}
                                </p>

                              </div>
                            );
         })
      
      return (
        <div className="outer-box">

          <div className="container">

               <div  className="selected-card">

                  <h3 style={{color:"#535d00ad"}}>
                    Click a card to see user details
                  </h3>

              </div>

              <div className="all-cards" ref="selected">
                  {
                     cards
                  }
              </div>

          </div>

        </div>  
      );
   }
}


export default App;
