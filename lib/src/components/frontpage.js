//frontpage.js
import React from 'react';
import '../stylesheets/DeckoCards.css';
import Typist from 'react-typist';
import Delay from 'react-delay';
import './Cursor.scss';
import SvgLines from 'react-mt-svg-lines';

export default class FrontPage extends React.Component{
    render(){
        return(
          <div className = 'frontPAge'>
            <div className = 'frontText'>
              <Typist
              className="frontHead"
              avgTypingDelay={120}
              cursor={{ hideWhenDone: true }}
              >
              Librario.
              </Typist>
              <Delay wait={2350} >
              <Typist className="frontSub" cursor={{ hideWhenDone: true  }} avgTypingDelay={110}>
                Social media for books.
              </Typist>
              </Delay>
            </div>
          <Delay wait={6000} >
            <div className='svgDiv'>
            <SvgLines animate={ true } duration={ 1000 }
              duration={2000}
              stagger={100}
              timing="linear"
              >
              <svg width="1600" height="1200" xmlns="http://www.w3.org/2000/svg">

   <g>
    <title>background</title>
    <rect fill="none" id="canvas_background" height="1202" width="1602" y="-1" x="-1"/>
   </g>
   <g>
    <title>Layer 1</title>
    <g stroke="null" id="svg_1">
     <path fill="#ffffff" stroke="#ffffff" id="svg_2" d="m1264.815788,884.571486l-67.768053,-252.467274l-58.415205,16.775852l6.453473,24.041754l-64.974053,0l0,-33.485184l-60.624216,0l0,24.780687l-32.831434,0l0,-54.625707l-81.81011,0l0,291.862315l70.187815,0l11.622295,0l32.831434,0l11.622295,0l37.379625,0l11.622295,0l76.050875,0l0,-187.267299l50.237758,187.159905l58.415205,-16.77505zm-233.705758,-233.113173l37.379625,0l0,29.771287l-37.379625,0l0,-29.771287zm0,79.634805l37.379625,0l0,136.706523l-37.379625,0l0,-136.706523zm0,-12.021679l0,-6.898841l37.379625,0l0,6.898841l-37.379625,0zm0,-18.920519l0,-6.899642l37.379625,0l0,6.899642l-37.379625,0zm-56.076024,165.888747l-58.56552,0l0,-221.190873l58.56552,0l0,221.190873zm0,-244.426374l0,11.213822l-58.56552,0l0,-11.213822l58.56552,0zm-58.56552,267.819759l0,-11.371707l58.56552,0l0,11.371707l-58.56552,0zm103.019249,0l-32.831434,0l0,-213.194053l32.831434,0l0,213.194053zm11.622295,0l0,-9.611733l37.379625,0l0,9.611733l-37.379625,0zm113.430501,0l-64.42858,0l0,-204.490357l64.42858,0l0,204.490357zm69.949945,-2.885203l-40.865539,-152.24334l36.017492,-10.344254l40.865539,152.24334l-36.017492,10.344254zm-43.97489,-163.826628l-3.20233,-11.928711l36.017492,-10.344254l3.20233,11.928711l-36.017492,10.344254zm18.442258,-75.818323l11.263554,41.96207l-36.017492,10.344254l-11.263554,-41.96207l36.017492,-10.344254z"/>
     <rect fill="#ffffff" stroke="#ffffff" id="svg_3" height="12.021679" width="37.435412" y="697.950954" x="1093.608534"/>
     <rect fill="#ffffff" stroke="#ffffff" id="svg_4" height="12.021679" width="37.435412" y="719.07144" x="1093.608534"/>
     <rect fill="#ffffff" stroke="#ffffff" id="svg_5" height="12.021679" width="37.435412" y="740.192728" x="1093.608534"/>
     <rect fill="#ffffff" stroke="#ffffff" id="svg_6" height="12.021679" width="37.435412" y="862.51972" x="1093.608534"/>
     <rect fill="#ffffff" stroke="#ffffff" id="svg_7" height="20.2405" width="11.622295" y="787.566157" x="997.260483"/>
     <rect fill="#ffffff" stroke="#ffffff" id="svg_8" height="45.761722" width="11.622295" y="819.248089" x="997.260483"/>
     <rect fill="#ffffff" stroke="#ffffff" id="svg_9" height="54.563194" width="11.622295" y="721.563134" x="997.260483"/>
     <rect fill="#ffffff" stroke="#ffffff" id="svg_10" height="21.121288" width="11.622295" y="689.8804" x="997.260483"/>
    </g>
    <g id="svg_11"/>
    <g id="svg_12"/>
    <g id="svg_13"/>
    <g id="svg_14"/>
    <g id="svg_15"/>
    <g id="svg_16"/>
    <g id="svg_17"/>
    <g id="svg_18"/>
    <g id="svg_19"/>
    <g id="svg_20"/>
    <g id="svg_21"/>
    <g id="svg_22"/>
    <g id="svg_23"/>
    <g id="svg_24"/>
    <g id="svg_25"/>
    <line stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_26" y2="896.081731" x2="913.076923" y1="900.697115" x1="0.769231" stroke-width="10" stroke="#ffffff" fill="none"/>
    <line stroke="#ffffff" transform="rotate(-15.228636741638184 1441.5234374999989,829.0771484375001) " stroke-linecap="undefined" stroke-linejoin="undefined" id="svg_27" y2="826.769468" x2="1637.53796" y1="831.384853" x1="1245.508892" stroke-width="10" fill="none"/>
   </g>
  </svg>
</SvgLines>
</div>
</Delay>
         </div>
        )
    }
}
