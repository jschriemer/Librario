//frontpage.js
import React from 'react';
import '../stylesheets/DeckoCards.css';
import Typist from 'react-typist';
import Delay from 'react-delay';
import './Cursor.scss';
import SvgLines from 'react-mt-svg-lines';
import { FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";
import Fade from 'react-reveal/Fade';
import { DiReact } from "react-icons/di";
import { BrowserRouter as Router, Route, Link, Switch, useHistory, withRouter } from 'react-router-dom';

export default class FrontPage extends React.Component{
    render(){
        return(
          <div className = 'frontPAge'>
            <div className = 'frontText'>
              <Typist
              className="frontHead"
              avgTypingDelay={120}
              cursor={{ hideWhenDone: true }}>
              Librario
              </Typist>
              <Delay wait={2350} >
              <Typist className="frontSub" cursor={{ hideWhenDone: true  }} avgTypingDelay={80}>
                Social media for books.
              </Typist>
              </Delay>
              <Delay wait = {11000}>
              <Fade>
              <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
                <div className="frontIcon" style = {{ marginTop: '30px'}}>
                   <Link to='/about' className="nav-link" href="/about">About</Link>
                   <FaGithub />
                </div>
                </IconContext.Provider>
                </Fade>
              </Delay>
            </div>
          <Delay wait={6000} >
            <div className='svgDiv'>
            <SvgLines animate={ true }
              duration={4000}
              stagger={1000}
              timing="linear" >
              <svg
                   width="5.55556in" height="4.55556in"
                   viewBox="0 0 500 500">
                <path id="Imported Path"
                      fill="none" stroke="white" strokeWidth="10"
                      d="M 71.69,123.51
                         C 71.69,123.51 158.07,152.56 158.07,152.56
                           165.19,155.68 198.97,168.04 258.87,153.19
                           334.53,134.41 498.35,101.90 500.00,101.56
                           500.00,101.56 493.90,70.78 493.90,70.78
                           493.84,70.79 493.39,70.87 492.81,71.00
                           492.81,71.00 336.68,48.98 336.68,48.98
                           319.51,46.56 291.79,47.27 274.77,50.59
                           274.77,50.59 66.03,91.08 66.03,91.08
                           38.88,89.67 13.05,106.35 4.40,133.40
                           -0.59,149.01 0.81,165.64 8.31,180.17
                           12.15,187.60 17.38,194.02 23.62,199.23
                           14.23,206.56 6.84,216.65 2.95,228.83
                           -2.03,244.43 -0.64,261.07 6.86,275.61
                           10.93,283.48 16.60,290.12 23.32,295.43
                           14.07,302.74 6.80,312.79 2.93,324.83
                           -2.04,340.43 -0.65,357.06 6.84,371.60
                           14.36,386.16 27.08,396.91 42.68,401.90
                           42.68,401.90 193.16,450.01 193.16,450.01
                           201.43,452.65 214.97,453.24 223.42,451.28
                           223.42,451.28 487.60,390.76 487.60,390.76
                           487.60,390.76 486.02,383.92 484.09,375.47
                           482.16,367.03 473.74,361.74 465.28,363.68
                           465.28,363.68 224.78,418.75 224.78,418.75
                           216.34,420.69 202.79,420.11 194.52,417.48
                           194.52,417.48 52.25,372.00 52.25,372.00
                           44.63,369.58 38.41,364.30 34.76,357.21
                           31.09,350.13 30.41,342.01 32.85,334.41
                           37.87,318.68 54.75,310.06 70.48,314.99
                           70.52,314.84 157.54,342.65 193.18,354.00
                           201.44,356.64 214.98,357.23 223.44,355.27
                           223.44,355.27 487.61,294.76 487.61,294.76
                           487.61,294.76 486.03,287.91 484.10,279.46
                           482.17,271.02 473.75,265.72 465.29,267.67
                           465.29,267.67 224.79,322.75 224.79,322.75
                           216.35,324.68 202.81,324.09 194.53,321.48
                           194.53,321.48 52.25,275.99 52.25,275.99
                           44.63,273.57 38.41,268.29 34.76,261.20
                           31.09,254.11 30.41,246.00 32.85,238.40
                           37.87,222.67 54.75,214.04 70.48,218.98
                           70.49,218.93 158.71,247.12 194.63,258.59
                           202.88,261.23 216.43,261.81 224.88,259.86
                           224.88,259.86 489.05,199.34 489.05,199.34
                           489.05,199.34 487.47,192.50 485.54,184.03
                           483.60,175.60 475.18,170.30 466.73,172.25
                           466.73,172.25 226.23,227.31 226.23,227.31
                           217.79,229.27 204.25,228.68 195.97,226.04
                           195.97,226.04 53.69,180.56 53.69,180.56
                           46.08,178.13 39.85,172.86 36.20,165.76
                           32.53,158.67 31.85,150.56 34.29,142.96
                           39.32,127.25 56.18,118.50 71.69,123.51 Z" />
              </svg>
              </SvgLines>
            </div>
            <div className="botText">
            <Delay wait = {7000}>
            <Fade>
              <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
                Made with ❤️ by
                <a href="https://github.com/jschriemer"> John</a>
              </IconContext.Provider>
            </Fade>
            </Delay>
            </div>
            </Delay>
         </div>
        )
    }
}
