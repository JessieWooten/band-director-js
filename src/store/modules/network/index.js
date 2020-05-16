import Axios from 'axios'
const NETWORK = {
    state:{
        
    },
    mutations:{},
    actions:{
        sendInvite(context, listenerIp){
            let url = `http://${listenerIp}:1991/invitetosession`;
            console.log('sending invite call to: ', url);
            Axios.post(url,
                `{"ip": "${context.rootState.user.ip}", "name":"${encodeURIComponent(context.rootState.user.userName)}"}`, 
                {headers:{'Content-Type':'text/plain'}}
            )
            .then((resp) => {
                console.log(resp);
                context.dispatch('notify', "Invitation sent!")
            })
            .catch((err)=>{
                console.log(`SEND INVITE ERROR: ${err}`);
                context.dispatch('notify', "There was an error sending your invitation")
            })
        },
        leaveSession(context,{sessionLeadIp}){
            let url = `http://${sessionLeadIp}:1991/removefromsession`;
            Axios.post(url, `{"ip":"${context.rootState.user.ip}"}`, {headers:{'Content-Type':'text/plain'}})
            .then((resp) => {
                console.log(resp);
                context.commit('setSessionLeadIp', null)
                context.dispatch('notify', "You left the session!")
                context.commit('setIsListener', false);
                context.commit('setIsLoading', false);
                context.dispatch('clearSessionInfo')
            })
            .catch((err)=>{
                context.commit('setIsLoading', false);
                context.dispatch('notify', "There was an issue leaving the session")
                console.log(`REMOVE FROM SESSION ERROR: ${err}`);
            })
        },
        sendInvitationResponse(context, {sessionLeadIp, response}){
            let url = `http://${sessionLeadIp}:1991/invitationresponse`;
            if(response == 1){
                context.commit('setIsListener', true);
                context.commit('setIsLoading', true);
            }
            Axios.post(url, `{"ip":"${context.rootState.user.ip}", "name": "${encodeURIComponent(context.rootState.user.userName)}", "response":${response}}`,{headers:{'Content-Type':'text/plain'}})
            .then((resp) => {
                console.log(resp);
                context.commit('setIsLoading', false)
                context.commit('setSessionLeadIp', sessionLeadIp)
                if(response){
                    context.dispatch('notify', "Session joined!")
                }
            })
            .catch((err)=>{
                context.commit('setIsListener', false);
                context.commit('setIsLoading', false);
                context.dispatch('notify', "There was an error sending your invitation response")
                console.log(`SEND INVITE ERROR: ${err}`);
            })
            console.log('sending invite response to: ', url);
            context.commit('clearInvitation');
        },
        deliverMsg(context, {note, modifier}){
            let $note = note ? note : '';
            let $modifier = modifier ? modifier : '';
            if(context.getters.isSoloed){
                //if soloed, only send to soloed listeners that are not muted
                if(context.getters.isSoloed){
                    context.rootState.session.soloList.forEach(ip =>{
                        if(context.rootState.session.muteList.indexOf(ip) === -1){
                            let url = `http://${ip}:1991/msgupdate`;
                            console.log('sending solo\'d ajax call to: ', url);
                            Axios.post(url,`{"note":"${$note}","modifier":"${$modifier}"}`,{headers:{'Content-Type':'text/plain'}})
                            .then((resp) => {
                                console.log(resp);
                            })
                            .catch((err)=>{
                                console.log(`SEND INVITE ERROR: ${err}`);
                                context.dispatch('notify', "There was an error sending your message")
                            })
                        }
                    })
                }
            }else{
                context.getters.sessionListeners.forEach(listener => {
                    if(listener.accepted && context.rootState.session.muteList.indexOf(listener.ip) === -1){
                        let url = `http://${listener.ip}:1991/msgupdate`;
                        console.log('sending ajax call to: ', url);
                        Axios.post(url,`{"note":"${$note}","modifier":"${$modifier}"}`,{headers:{'Content-Type':'text/plain'}})
                        .then((resp) => {
                            console.log(resp);
                        })
                        .catch((err)=>{
                            console.log(`SEND MSG ERROR: ${err}`);
                            context.dispatch('notify', "There was an error sending your message")
                        })
                    }
                });
            }
        }
    }
}

export default NETWORK;