import{K as s}from"#entry";function r(e,i,o){const t=e.findIndex(n=>s(n,i)),d=e.findIndex(n=>s(n,o));if(t===-1||d===-1)return[];const[x,f]=[t,d].sort((n,I)=>n-I);return e.slice(x,f+1)}export{r as f};
