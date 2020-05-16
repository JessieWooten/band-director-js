import $store from '@/store';

const dataUpdate = (update)=>{
    console.log('dataUpdate received: ', update);
    switch (true) {
//message transmission
        case update.indexOf('incomingMsg') != -1:
            try{
                $store.commit('setNewMsg', JSON.parse(update.substring(12)));
            }catch(err){
                console.log('NEW MSG: JSON parse error: ', err);
            }
            break;

        case update.indexOf('notify') != -1:
            $store.dispatch('notify', update.substring(7))
            break;
//WIFI 
        case update.indexOf('newListener') != -1:
            $store.commit('addToListenerList', JSON.parse(update.substring(12)));
            break

        case update.indexOf('incomingInvitation') != -1:
            //got listen request with 'leader' ip address & name
            $store.commit('setInvitation', {isIncomingInvitation: true,  incomingInvitation: JSON.parse(update.substring(19))})
            break;
        
        case update.indexOf('invitationResponse') != -1:
            //got response from listener
            $store.dispatch('handleInvitationResponse', JSON.parse(update.substring(19)))
            break;

        case update.indexOf('removeListener') != -1:
            $store.dispatch('removeListenerFromSession', JSON.parse(update.substring(15)))
            break;
//USER
        case update.indexOf('userName') != -1:
            $store.commit('setUserName', decodeURIComponent(update.substring(9)));
            $store.commit('setIsRenaming', false);
            break;

        case update.indexOf('requestUserName') != -1:
            $store.commit('setIsRenaming', true);
            break;

        case update.indexOf('deviceIp') != -1:
            //compare current ip and this ip to see if they have changed
            if($store.state.user.ip != "" && $store.state.user.ip != update.substring(9)){
                //alert
                console.log('your ip changed')
            }
            $store.commit('setDeviceIp', update.substring(9));
            break;

        default:
            break;
    }
}

export default dataUpdate;