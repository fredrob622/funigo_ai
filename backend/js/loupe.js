zoom=2;
espaceloupe=document.getElementById("container");
espaceloupe.onmousemove=fonctloupe();

fonctloupe()
    loupe=document.getElementById("loupe");
    console.log(loupe);
    loupe.style.left=mouse.event.clientX+"px";
    loupe.style.top=mouse.event.clientY+"px";
    console.log(loupe.style.left);



