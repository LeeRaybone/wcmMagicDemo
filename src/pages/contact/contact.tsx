import React from 'react';
import './App.css';

const Contact = () => {
    return (

        <div className="App">
      <div  className="title-wrapper">
      <text className="title"><b>How to contact the Wolverhampton Circle of Magicians</b></text>
      </div>
    <div className="mainBody">
      <body className="App-body">
        <p>
         <b>Meeting Venue: </b> <a className="App-link"
          href="https://www.google.co.uk/maps/place/The+ECC+Sports+%26+Social+Club/@52.6051902,-2.1269638,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x9183d34918503661!8m2!3d52.6051706!4d-2.1269903"
          target="_blank"
          rel="noopener noreferrer"> ECC Sports & Social Club, Showell Road, Wolverhampton, WV10 9LU</a>
            </p>
            <p>
To contact the WCM please use the form or suitable email addresses below:
</p>
        </body>
        </div>
    </div>
  );
}

export default Contact;
