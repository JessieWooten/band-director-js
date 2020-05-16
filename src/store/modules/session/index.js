const SESSION = {
    state:{
        foundListeners:[],
        soloList:[],
        muteList:[],
        isIncomingInvitation: false,
        incomingInvitation: null,
        sessionLeadIp:null,
        isListener: false
    },
    mutations:{
        addToListenerList(state, {name, ip}){
            let onList = false;
            for(var i=0; i<state.foundListeners.length;i++){
                if(state.foundListeners[i].ip ===ip){onList = true; break;}
            }
            if(!onList){
                state.foundListeners.push({name: decodeURIComponent(name), ip:ip, invited:false, accepted: false});
            }
        },
        inviteToSession(state, index){
            state.foundListeners[index].invited = true;
        },
        addToSession(state, index){
            state.foundListeners[index].accepted = true;
        },
        removeFromSession(state, index){
            state.foundListeners[index].accepted = false;
            state.foundListeners[index].invited = false;
        },
        setInvitation(state, { isIncomingInvitation, incomingInvitation }){
            state.incomingInvitation = incomingInvitation;
            state.isIncomingInvitation = isIncomingInvitation;
        },
        setSessionLeadIp(state, ip){
            state.sessionLeadIp = ip;
        },
        clearInvitation(state){
            state.incomingInvitation = null;
            state.isIncomingInvitation = false;
        },
        solo(state, ip){
            if(state.soloList.indexOf(ip) === -1){
                state.soloList.push(ip);
            }else{
                state.soloList.splice(state.soloList.indexOf(ip), 1);
            }
        },
        mute(state, ip){
            if(state.muteList.indexOf(ip) === -1){
                state.muteList.push(ip);
            }else{
                state.muteList.splice(state.muteList.indexOf(ip), 1);
            }
        },
        resetSoloMute(state){
            state.soloList = [];
            state.muteList = [];
        },
        setIsListener(state, isListener){
            state.isListener = isListener;
        }
    },
    actions:{
        inviteToSession(context, index){
            context.dispatch('sendInvite', context.state.foundListeners[index].ip);
            context.commit('inviteToSession', index);
        },
        removeListenerFromSession(context, {ip}){
            let index = -1;
            for (var i =0; i < context.state.foundListeners.length; i++){
                if(context.state.foundListeners[i].ip === ip){
                    index = i;
                    break;
                }
            }
            if(index != -1){
                context.dispatch('notify', `${decodeURIComponent(context.state.foundListeners[index].name)} has left your session.`)
                context.commit('removeFromSession', index);
            }
        },
        handleInvitationResponse(context, { ip, response }){
            let index = -1;
            for (var i =0; i < context.state.foundListeners.length; i++){
                if(context.state.foundListeners[i].ip === ip){
                    index = i;
                    break;
                }
            }
            if(parseInt(response) === 1){
                context.commit('addToSession', index);
                context.dispatch('notify', `${context.state.foundListeners[index].name} joined your session!`)
            }else{
                context.commit('removeFromSession', index);
            }
        },
        clearSessionInfo(context){
            context.commit('setReceivedMsgList', []);
            context.commit('setNewMsg', {note:'', modifier:''});
        }
    },
    getters:{
        sessionListeners(state){
            return state.foundListeners.filter(listener => {return listener.invited === true && listener.accepted === true});
        },
        invitedListeners(state){
            return state.foundListeners.filter(listener => {return listener.invited === true });
        },
        isSoloed(state){
            return !!state.soloList.length;
        },
        isMuted(state){
            return !!state.muteList.length;
        }
    }
}

export default SESSION;