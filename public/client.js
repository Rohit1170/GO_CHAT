const socket=io(    )
let name;
let text=document.querySelector('#textarea')
let messarea=document.querySelector('.mess')
let but=document.querySelector('.icon')
do{
    name=prompt('please enter your name:')

}while(!name)
but.addEventListener('click',(e)=>{
    sendMessage(text.value)
});
text.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})
function sendMessage(message){
    if(!message||!message.trim()){
        return
    }
    let msg={
        user:name,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    text.value=''
    scrollToBottom();

    socket.emit('message',msg)
}
function appendMessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markup

    messarea.appendChild(mainDiv)
}
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom();
})
function scrollToBottom(){
    messarea.scrollTop=messarea.scrollHeight
}
