const USER = {
    state:{
        userName: '',
        ip:''
    },
    mutations:{
        setUserName(state, name){
            state.userName = name;
        },
        setDeviceIp(state, ip){
            state.ip = ip;
        }
    },
    actions:{
        initUser(){
            window.native.getUser();
            window.native.getDeviceIp()
          }
    }
}
export default USER;