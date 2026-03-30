import React from 'react';
import {
  MDBFooter,
  MDBContainer,
} from 'mdb-react-ui-kit';
import foodelogo from "../screens/foodelogo.png";

export default function Footer() {
  return (
    <MDBFooter className='text-center text-white' style={{"backgroundColor": "#464646"}}>
      <MDBContainer className='p-2' style={{"margin":"10px"}}>
      By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2023 © <img src={foodelogo} alt="Logo" style={{ height: "3rem", width: "auto" }} />™ Ltd. All rights reserved.
        
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', textAlign:"center" }}>
        © 2023 Copyright &nbsp; &nbsp; <img src={foodelogo} alt="Logo" style={{ height: "3rem", width: "auto" }} />
      </div>
    </MDBFooter>
  );
}