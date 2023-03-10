import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {popupActions } from '../../redux/actions';

export default function JoinNow(){
    const dispatch = useDispatch();
    const isModel = useSelector(state => state.popup);
    const modelActive = isModel.model ? 'active' : 'mfp-hide';
    return(
        <>
        <div className='mfp-bg'></div>
        <div className='mfp-wrap'>
            <div className='mfp-container'>
        <div className="mfp-content">
        <div id="started-p" className={"common-popup " + modelActive}>
             <div className='popupInner'>  
             <button title="Close (Esc)" type="button" className="mfp-close" onClick={()=>dispatch(popupActions.close())}>&#10006;</button> 
            <div className="popup-content">
                <h3>Register to Get Started </h3>
                <p className="btn-row m-t3 get-btn">
                    <a  onClick={() => dispatch(popupActions.open("jobseeker"))} className="btn md-btn div-popup">FIND JOBS</a> 
                    <a  onClick={() => dispatch(popupActions.open("employer"))} className="btn secondary-btn md-btn div-popup">POST JOBS</a>
                </p>
            </div>
            </div>
        </div>
      </div>
      </div>
      </div>
      </>
    )
}