 const bar =  document.getElementById('bar');

const close =  document.getElementById('close');

const nav = document.getElementById('navbar');
 if(bar){

  bar.addEventListener('click',()=>{

  nav.classList.add('active');

  })

}
 if(close){

  close.addEventListener('click',()=>{

  nav.classList.remove('active');

  })

} 

//productt
 var MainImg = document.getElementById("MinImg");
var smallimg = document.getElementsByClassName("small-img");
smallimg[0].onclick =function(){
    MinImg.src=smallimg[0].sec;
}
smallimg[1].onclick =function(){
    MinImg.src=smallimg[1].sec;
}
smallimg[2].onclick =function(){
    MinImg.src=smallimg[2].sec;
}
smallimg[3].onclick =function(){
    MinImg.src=smallimg[3].sec;
}
smallimg[4].onclick =function(){
    MinImg.src=smallimg[4].sec;
}






