const native = {
    sendMessage(msg){
        console.log('sending message: ', msg);
    },
    getUser(){
        window.vue.$children[0].dataUpdate("userName:"+encodeURIComponent("Jessie's iPad"))
    },
    saveUsername(name){
        window.vue.$children[0].dataUpdate("userName:"+name)
    },
    getDeviceIp(){
        window.vue.$children[0].dataUpdate("deviceIp:987.765.543.123");
    },
    scanForUsers(){
        const users =[
                {name: 'Jessie\'s iPad', ip:'123.234.456.6'},
                {name: 'Kaila\'s iPad Pro', ip:'234.456.678.12'},
                {name: 'Adam\'s iPhone 8', ip:'123.456.234.225'},
                {name: 'Warren\'s iPhone X', ip:'125.456.234.210'}
            ]
            setTimeout(()=>{
                users.forEach(user=>{window.vue.$children[0].dataUpdate(`newListener:${JSON.stringify(user)}`);})
            },1500)
    }
}

export default native;