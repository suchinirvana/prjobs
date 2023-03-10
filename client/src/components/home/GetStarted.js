import React from 'react'
import ReactHtmlParser from 'react-html-parser';
import LinkType from '../../common/Button/linktype'
const GetStarted = ({content})=>{
    const section1Content = content.section1;
    const section2Content = content.section2;
    const img1 = section1Content.image ? '/img/'+section1Content.image : '';
    const img2 = section2Content.image ? '/img/'+section2Content.image : '';
    
    return (
        <section className="common-content">
            <div className="container">
                <div className="started-row"> 
                    <img src={img1} alt="" className="alignright" />
                     <div className="overflow">{ReactHtmlParser(section1Content.description)}</div>
                     {section1Content.url && <LinkType classes="btn-link" title={section1Content.buttonTitle} url={section1Content.url}/>}
                </div>
                <div className="started-row"> 
                    <img src={img2} alt="" className="alignleft" />
                     <div className="overflow">{ReactHtmlParser(section2Content.description)}</div>
                     
                     {section2Content.url && <LinkType classes="btn-link" title={section2Content.buttonTitle} url={section2Content.url}/>}
                </div>
            </div>
        </section>
    )
}

export default GetStarted
