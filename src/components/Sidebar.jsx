import React from "react";


export default function Sidebar({
  conversations,
  currentId,
  onNew,
  onSelect,
  onDelete,
  onRename
}){


return (

<div style={{
width:"260px",
height:"100%",
background:"#221e26",
color:"#e9e4ea",
padding:"16px",
boxSizing:"border-box",
}}>


<button
onClick={onNew}
style={{
width:"100%",
padding:"10px",
borderRadius:"10px",
border:"none",
cursor:"pointer"
}}
>
+ 新建对话
</button>


<div style={{
marginTop:"20px"
}}>


{
conversations.map(conv=>(

<div
key={conv.id}
style={{
padding:"10px",
marginBottom:"8px",
borderRadius:"10px",
background:
conv.id===currentId
?"#2a2530"
:"transparent",
cursor:"pointer"
}}
>


<div
onClick={()=>onSelect(conv)}
>
{conv.title}
</div>


<div style={{
marginTop:"6px",
display:"flex",
gap:"8px",
fontSize:"12px"
}}>

<span
onClick={()=>{
const title=prompt(
"新的名称",
conv.title
);

if(title){
onRename(
conv.id,
title
);
}
}}
>
改名
</span>


<span
onClick={()=>
onDelete(conv.id)
}
>
删除
</span>


</div>


</div>

))
}


</div>


</div>

);


}
