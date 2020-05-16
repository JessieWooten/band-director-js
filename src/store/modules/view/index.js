const VIEW = {
    state: {
      isLoading: false,
      isRenaming: false,
      displayMessage:{note:'', modifier:''},
      receivedMsgList:[],
      selectedNote: null,
      touchX: 0,
      touchY: 0,
      distanceTraveled:{x:0,y:0},
      activeModifier: null,
      modifiers:['cancel','min', 'dim','7','aug','maj'],
      scale:['c','d','e','f','g','a','b'],
      showFlats: window.localStorage.getItem('showFlats') == 'false' ? false : true,
      notifyMsg: '',
      isNotifyActive: false
    },
    mutations: {
      setSelectedNote(state, note){
        state.selectedNote = note;
      },
      setCoordinates(state, {x, y}){
        state.touchX = x;
        state.touchY = y;
      },
      updateDistance(state, {x, y}){
        state.distanceTraveled = {x,y};
      },
      setModifier(state, modifier){
        state.activeModifier = modifier
      },
      setNewMsg(state, msg){
        console.log('newmsg:', msg)
        state.displayMessage = msg;
        if(msg.note){state.receivedMsgList.push(msg);}
      },
      setIsLoading(state, isLoading){
        state.isLoading = isLoading
      },
      toggleSharps(state){
        state.showFlats = !state.showFlats;
        window.localStorage.setItem('showFlats', state.showFlats);
      },
      setIsRenaming(state, isRenaming){
        state.isRenaming = isRenaming;
      },
      setNotifyMsg(state, msg){
        state.notifyMsg = msg;
      },setIsNotifyActive(state, isActive){
        state.isNotifyActive = isActive;
      },
      setReceivedMsgList(state, list){
        state.receivedMsgList = list;
      }
    },
    actions: {
      startTouch(context, { note, x, y }){
        context.commit('setSelectedNote', note);
        context.commit('setCoordinates', {x,y});
      },
      trackTouch(context, { x, y }){
        context.commit('updateDistance', {x: context.state.touchX - x, y: context.state.touchY - y});
      },
      endTouch(context){
        if(context.state.activeModifier != 0){
          let note = context.state.selectedNote;
          let modifier = context.state.modifiers[context.state.activeModifier];
          context.dispatch('deliverMsg',{note:note, modifier:modifier});
          context.commit('setNewMsg', {note:note, modifier:modifier});
        }
        context.commit('setSelectedNote', null);
        context.commit('setCoordinates', {x:0,y:0});
        context.commit('updateDistance',{x:0, y:0});
        context.commit('setModifier', null);
      },
      clearMsg(context){
        context.dispatch('deliverMsg', '{"note":"", modifier:""}')
        context.commit('setNewMsg', {note:'', modifier:''});
        context.commit('setSelectedNote', null);
        context.commit('setModifier', null);
      },
      notify(context, text){
        context.commit('setIsNotifyActive', true)
        context.commit('setNotifyMsg', text);
      }
    },
    getters: {
      recentMessages(state){
        return state.receivedMsgList.length > 8 ? 
        state.receivedMsgList.slice(state.receivedMsgList.length-8) :
        state.receivedMsgList;
      }
    }
  }

  export default VIEW;