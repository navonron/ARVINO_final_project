import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import text from '../../Elements/EText.json'

import img1 from '../../Assets/img1.jpeg';
import img2 from '../../Assets/img2.jpeg';
import img3 from '../../Assets/img3.jpeg';
import img4 from '../../Assets/img4.jpeg';


import wine from '../../Assets/drow2.jpg';

const FCSlideshow = () => {
    return (
        <div className='slideshow'>
            <div className="slide-container" id='howweare'>
                <div className='Slideshowtext' >
                    <p className="mainTEXT3">{text.sales1}</p>
                    <p className="mainTEXT3">{text.sales2}</p>
                    <p className="mainTEXT3">{text.sales3}</p>
                </div>
                <div >
                    <Fade className='right'>
                        <div className="each-fade">
                            <div className="image-container">
                                <img src={img1} className="image" />
                            </div>
                        </div>
                        <div className="each-fade">
                            <div className="image-container">
                                <img src={img2} className="image" />
                            </div>
                        </div>
                        <div className="each-fade">
                            <div className="image-container">
                                <img src={img3} className="image" />
                            </div>
                        </div>
                        <div className="each-fade">
                            <div className="image-container">
                                <img src={img4} className="image" />
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </div>
    )
}
export default FCSlideshow;