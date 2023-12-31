import React from 'react'
import { TbAlertCircle } from "react-icons/tb";
import { GoX } from "react-icons/go";

export default function Popup({setPopupOn}) {
  return (
    <div style={{width:"400px", height:"250px", padding:"24px", boxSizing:"border-box", position:"fixed",top:"50px", left:"50px", backgroundColor:"white", borderWidth:"1px", borderStyle:"solid", borderColor:"#ccc", zIndex:"999", borderRadius:"15px", boxShadow:"2px 2px 5px 0 lightgray"}}>
        <div style={{width:"100%", display:"flex", justifyContent:"end"}}>
            
            <button style={{fontSize:"30px"}}
            className="w-8 h-8 bg-[#ffc35c] rounded-full flex items-center justify-center text-white text-[1.4rem] hover:[transform:rotateY(360deg)] transition-all duration-700" 
            
            onClick= { (e)=> {
                e.preventDefault();

                setPopupOn(false);
            
            }}
            
            ><GoX /></button>
        </div>
        
        <div className="textWrap" style={{textAlign:"center"}}>
            <div style={{textAlign:"center", display:'flex' ,  alignItems: 'center', justifyContent:"center", color:"#FDBA74",fontSize:"35px", width:"100%"}}>
                <TbAlertCircle />
                <span style={{}}> 공지사항 </span>
            </div>
            <p style={{marginTop:"20px", fontSize:"17px"}}>현재 모임 참여기능이 개발중에 있습니다. <br/>현재 툴킷 다운로드 기능만 사용이 가능합니다.</p>
        </div>
    </div>
  )
}
