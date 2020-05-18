const SESSION = {
  state: {
    foundListeners: {},
    soloList: [],
    muteList: [],
    isIncomingInvitation: false,
    incomingInvitation: null,
    sessionLeadIp: null,
    isListener: false,
  },
  mutations: {
    addToListenerList(state, { name, ip }) {
      let onList = state.foundListeners[ip];
      if (!onList) {
        state.foundListeners = {
          ...state.foundListeners,
          [ip]: {
            name: decodeURIComponent(name),
            ip,
            invited: false,
            accepted: false,
          },
        };
      }
    },
    inviteToSession(state, ip) {
      state.foundListeners[ip].invited = true;
    },
    addToSession(state, ip) {
      state.foundListeners[ip].accepted = true;
    },
    removeFromSession(state, ip) {
      state.foundListeners[ip].accepted = false;
      state.foundListeners[ip].invited = false;
    },
    setInvitation(state, { isIncomingInvitation, incomingInvitation }) {
      state.incomingInvitation = incomingInvitation;
      state.isIncomingInvitation = isIncomingInvitation;
    },
    setSessionLeadIp(state, ip) {
      state.sessionLeadIp = ip;
    },
    clearInvitation(state) {
      state.incomingInvitation = null;
      state.isIncomingInvitation = false;
    },
    solo(state, ip) {
      if (state.soloList.indexOf(ip) === -1) {
        state.soloList.push(ip);
      } else {
        state.soloList.splice(state.soloList.indexOf(ip), 1);
      }
    },
    mute(state, ip) {
      if (state.muteList.indexOf(ip) === -1) {
        state.muteList.push(ip);
      } else {
        state.muteList.splice(state.muteList.indexOf(ip), 1);
      }
    },
    resetSoloMute(state) {
      state.soloList = [];
      state.muteList = [];
    },
    setIsListener(state, isListener) {
      state.isListener = isListener;
    },
  },
  actions: {
    inviteToSession(context, ip) {
      context.dispatch("sendInvite", context.state.foundListeners[ip].ip);
      context.commit("inviteToSession", ip);
    },
    removeListenerFromSession(context, { ip }) {
      if (!context.state.foundListeners[ip]) {
        return context.dispatch(
          "notify",
          "ERROR: Cannot find user at the provided address."
        );
      }
      context.dispatch(
        "notify",
        `${decodeURIComponent(
          context.state.foundListeners[ip].name
        )} has left your session.`
      );
      context.commit("removeFromSession", ip);
    },
    handleInvitationResponse(context, { ip, response }) {
      if (!context.state.foundListeners[ip]) {
        return context.dispatch(
          "notify",
          "ERROR: Cannot find user at the provided address."
        );
      }
      if (parseInt(response) === 1) {
        context.commit("addToSession", ip);
        context.dispatch(
          "notify",
          `${context.state.foundListeners[ip].name} joined your session!`
        );
      } else {
        context.commit("removeFromSession", ip);
      }
    },
    clearSessionInfo(context) {
      context.commit("setReceivedMsgList", []);
      context.commit("setNewMsg", { note: "", modifier: "" });
    },
  },
  getters: {
    sessionListeners(state) {
      return Object.values(state.foundListeners).filter((listener) => {
        return listener.invited === true && listener.accepted === true;
      });
    },
    invitedListeners(state) {
      return Object.values(state.foundListeners).filter((listener) => {
        return listener.invited === true;
      });
    },
    foundListenersList(state) {
      return Object.values(state.foundListeners);
    },
    isSoloed(state) {
      return !!state.soloList.length;
    },
    isMuted(state) {
      return !!state.muteList.length;
    },
  },
};

export default SESSION;
