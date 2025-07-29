const dropArrow=document.getElementById('drop-arrow');

dropArrow.onclick=function(){
    dropArrow.classList.toggle('d-a')
    dropArrow.classList.toggle('drop-down-onclick');
    noHover();
}
function noHover(){
    const noHovers=document.getElementById('Sales-dropdown');
    noHovers.classList.toggle('hover')
    noHovers.classList.toggle('no-hover')
}
function businessDropDown(){
    const switchBusinessOption=document.getElementById('switch-business-id')
    switchBusinessOption.classList.toggle('business-active');
}
