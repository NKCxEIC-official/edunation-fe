import {
	getTicket,
	getFavourite,
	getSolution,
	getFRList,
	getChildList,
	getWhatsappMessage,
	ClosePost,
	sendWhatsappMessage,
	getSMSMessages,
	getChatMessages,
	getUnifiedChatData,
	sendChatMessage,
	sendWhatsappMessageWithAttachment,
	getFRMessages,
	getSimilarCase,
	sendFAMessage,
	getNotes,
	checkWorkVisit,
	schedulerList,
	v2FRList,
	scheduleVisit,
	getAssetList,
	getBatchCount,
	getNotification,
	deleteNotification,
	getTicketLink,
	removeLinkedSolution
} from "../../services/PostsService";
import {
	CONFIRMED_EDIT_POST_ACTION,
	CONFIRMED_GET_FAVOURITE,
	CONFIRMED_GET_TICKET,
	CONFIRMED_GET_SOLUTION,
	CONFIRMED_GET_FR_LIST,
	CONFIRMED_GET_WHATSAPP_CHAT,
	CONFIRMED_CLOSE_POST,
	CONFIRMED_SEND_WHATSAPP_CHAT,
	CLEAR_ALL_CHAT,
	CONFIRMED_GET_SMS_CHAT,
	CONFIRMED_GET_CHAT,
	CONFIRMED_GET_UNIFIED_CHAT,
	CONFIRMED_GET_WHATSAPP_CHAT_FROM_WEBSOCKET,
	CONFIRMED_GET_SMS_CHAT_FROM_WEBSOCKET,
	CONFIRMED_GET_CHAT_FROM_WEBSOCKET,
	CONFIRMED_SEND_CHAT,
	CONFIRMED_SEND_WHATSAPP_CHAT_WITH_ATTACHMENT,
	SET_SNACKBAR,
	CONFIRMED_GET_CHILD_LIST,
	CONFIRMED_CREATE_POST_ACTION,
	CONFIRMED_GET_FR_CHAT,
	CONFIRMED_SEND_FA_CHAT,
	CONFIRMED_CLEAR_FR_LIST,
	CONFIRMED_GET_FR_CHAT_FROM_WEBSOCKET,
	CONFIRMED_GET_NOTES,
	CONFIRMED_GET_SIMILAR,
	CONFIRMED_CHECK_WORK_VISIT_ACTION,
	CONFIRMED_GET_SCHEDULER_LIST,
	CONFIRMED_GET_V2_FR__LIST,
	CONFIRMED_GET_TICKET_ERROR,
	CONFIRMED_GET_SCHEDULE_VISIT,
	SET_VIDEO_CALL,
	CONFIRMED_GET_ASSET_LIST,
	CONFIRMED_GET_BATCH_COUNT,
	CONFIRMED_GET_CHAT_BATCH_COUNT_FROM_WEBSOCKET,
	CONFIRMED_GET_NOTIFICATION,
	CONFIRMED_GET_NOTIFY_FROM_WEBSOCKET,
	CONFIRMED_READ_NOTIFICATION,
	CONFIRMED_GET_LINK_FOR_KNOWLEDGEBASE,
	CONFIRMED_UNLINK_SOLUTION,
	CLEAR_SCHEDULE_VISIT_DATA
} from "./ActionTypes";

const token = localStorage.getItem("access_token");

export function getTicketAction(data) {
	return (dispatch, getState) => {
		getTicket(data, token)
			.then((response) => {
				dispatch(confirmedGetTicketAction(response.data));
			})
			.catch((error) => {
				dispatch(confirmedGetTicketErrorAction(error.response.data));
			});
	};
}

export function getChildListAction(data) {
	return (dispatch, getState) => {
		getChildList(data, token).then((response) => {
			dispatch(confirmedGetChildListAction(response.data));
		});
	};
}

export function getAssetListAction(data) {
  return (dispatch, getState) => {
    getAssetList(data, token).then((response) => {
      dispatch(confirmedGetAssetListAction(response.data));
    });
  };
}

export function getUnifiedChatDataAction(data) {
	return (dispatch, getState) => {
		getUnifiedChatData(data, token).then((response) => {
			dispatch(confirmedGetUnifiedChatAction(response.data));
		});
	};
}

export function setChatsFromWebsocketWhatsappAction(whatsapp_data) {
	return {
		type: CONFIRMED_GET_WHATSAPP_CHAT_FROM_WEBSOCKET,
		payload: whatsapp_data,
	};
}

export function setChatsFromFRChatAction(fr_chat_data) {
	return {
		type: CONFIRMED_GET_FR_CHAT_FROM_WEBSOCKET,
		payload: fr_chat_data,
	};
}

export function setChatFromWebsocketSMSAction(sms_data) {
	return {
		type: CONFIRMED_GET_SMS_CHAT_FROM_WEBSOCKET,
		payload: sms_data,
	};
}

export function setChatBatchCountFromWebsocketAction(data) {
	return {
		type: CONFIRMED_GET_CHAT_BATCH_COUNT_FROM_WEBSOCKET,
		payload: data,
	};
}

export function setChatFromWebsocketAction(sms_data) {
	return {
		type: CONFIRMED_GET_CHAT_FROM_WEBSOCKET,
		payload: sms_data,
	};
}

export function setNotifyFromWebsocketAction(notify) {
  return {
    type: CONFIRMED_GET_NOTIFY_FROM_WEBSOCKET,
    payload: notify,
  };
}

export function getFavouriteAction(data) {
	return (dispatch, getState) => {
		getFavourite(data, token).then((response) => {
			dispatch(confirmedGetFavouriteAction(response.data));
		});
	};
}
export function getSimilarAction(data) {
	return (dispatch, getState) => {
		getSimilarCase(data, token).then((response) => {
			dispatch(confirmedGetSimilarAction(response.data));
		});
	};
}

export function getBatchCountAction(data) {
	return (dispatch, getState) => {
		getBatchCount(data, token).then((response) => {
			dispatch(confirmedGetChatBatchCount(response.data));
		});
	};
}
export function getSolutionAction(data) {
	return (dispatch, getState) => {
		getSolution(data, token).then((response) => {
			dispatch(confirmedGetSolutionAction(response.data));
		});
	};
}

export function getFRListAction(data) {
	return (dispatch, getState) => {
		getFRList(data, token).then((response) => {
			dispatch(confirmedGetFRListAction(response.data));
		});
	};
}

export function getWhatsappMessageAction(data, pageNo) {
	return (dispatch, getState) => {
		getWhatsappMessage(data, token, pageNo).then((response) => {
			dispatch(confirmedGetWhatsappDataAction(response.data));
		});
	};
}

export function getSMSMessagesAction(data, pageNo) {
	return (dispatch, getState) => {
		getSMSMessages(data, token, pageNo).then((response) => {
			dispatch(confirmedGetSMSDataAction(response.data));
		});
	};
}

export function checkWorkVisitAction(data) {
	return (dispatch, getState) => {
		checkWorkVisit(data, token)
			.then((response) => {
				dispatch(confirmCheckWorkVisitAction(response.data));
			})
			.catch((e) => {
				dispatch(confirmCheckWorkVisitAction(e.response.data));
			});
	};
}

export function schedulerListAction(data) {
	return (dispatch, getState) => {
		schedulerList(data, token).then((response) => {
			dispatch(confirmSchedulerListAction(response.data));
		});
	};
}

export function getNotificationAction(data) {
	return (dispatch, getState) => {
		getNotification(data, token).then((response) => {
			dispatch(confirmedGetNotificationAction(response.data));
		});
	};
}

export function readNotificationAction() {
  return (dispatch) => {
    deleteNotification(token).then((response) => {
      dispatch(confirmedReadNotificationAction(response.data));
    }).then(()=>{
		dispatch(
			setSnackbarAction({
			  snackbarOpen: true,
			  snackbarType: "info",
			  snackbarMessage: `The notification has been marked as read by the user`,
			})
		  );
	});
  };
}

export function v2FRListAction(data) {
	return (dispatch, getState) => {
		v2FRList(data, token).then((response) => {
			dispatch(confirmGetV2FRListAction(response.data));
		});
	};
}

export function scheduleVisitAction(data) {
	return (dispatch, getState) => {
		scheduleVisit(data, token).then((response) => {
			dispatch(confirmGetScheduleVisitAction(response.data));
		});
	};
}

export function deleteScheduleVisitDataAction() {
	return (dispatch) => {
		dispatch({ type: CLEAR_SCHEDULE_VISIT_DATA });
	};
}


export function closePostAction(data) {
	return (dispatch, getState) => {
		ClosePost(data, token).then((response) => {
			dispatch(confirmedClosePostAction(response.data));
		});
	};
}

export function getKnowledgeBaseTicketLinkAction(data) {
	return (dispatch, getState) => {
		getTicketLink(data, token).then((response) => {
			dispatch(confirmedKnowledgeBaseLinkAction(response.data));
			dispatch(
				setSnackbarAction({
				  snackbarOpen: true,
				  snackbarType: "info",
				  snackbarMessage: data.success_msg,
				  snackbarDuration: 5000,
				})
			  );
		}).then(()=>{
			const solPayload = { id: btoa(data.ticket) };

			//solution api call
			dispatch(getSolutionAction(solPayload));
		})
	};
}

export function removeLinkedSolutionAction(data) {
	return (dispatch, getState) => {
		removeLinkedSolution(data, token).then((response) => {
			dispatch(confirmedUnlinkSolution(response.data));
			dispatch(
				setSnackbarAction({
				  snackbarOpen: true,
				  snackbarType: "info",
				  snackbarMessage: data.success_msg,
				  snackbarDuration: 3000,
				})
			  );
		}).then(()=>{
			const solPayload = { id: btoa(data.ticketId) };

			//solution api call
			dispatch(getSolutionAction(solPayload));
		});
	};
}

export function getChatMessagesAction(data) {
	return (dispatch, getState) => {
		getChatMessages(data, token).then((response) => {
			dispatch(confirmedGetChatDataAction(response.data));
		});
	};
}

export function getFRMessagesAction(data) {
	return (dispatch, getState) => {
		getFRMessages(data, token).then((response) => {
			dispatch(confirmedGetFRChatDataAction(response.data));
		});
	};
}

export function sendWhatsappMessageAction(data) {
	return (dispatch, getState) => {
		sendWhatsappMessage(data, token).then((response) => {
			dispatch(confirmedSendWhatsappDataAction(response.data));
		});
	};
}

export function getNotesAction(data) {
	return (dispatch, getState) => {
		getNotes(data, token).then((response) => {
			dispatch(confirmedGetNotesAction(response.data));
		});
	};
}

export function sendFAMessageAction(data) {
	return (dispatch, getState) => {
		sendFAMessage(data, token).then((response) => {
			dispatch(confirmedSendFAMessageAction(response.data));
		});
	};
}

export function sendWhatsappMessageWithAttachmentAction(data) {
	return (dispatch, getState) => {
		sendWhatsappMessageWithAttachment(data, token).then((response) => {
			dispatch(confirmedSendWhatsappDataWithAttachmentAction(response.data));
		});
	};
}

export function sendChatMessageAction(data) {
	return (dispatch, getState) => {
		sendChatMessage(data, token).then((response) => {
			dispatch(confirmedSendChatDataAction(response.data));
		});
	};
}

export function clearWhatsappMesage() {
	return (dispatch) => {
		dispatch({ type: CLEAR_ALL_CHAT });
	};
}

export function clearFAMessageAction() {
	return (dispatch) => {
		dispatch({ type: CONFIRMED_CLEAR_FR_LIST });
	};
}

export function confirmedCreatePostAction(singlePost) {
	return {
		type: CONFIRMED_CREATE_POST_ACTION,
		payload: singlePost,
	};
}

export function setSnackbarAction(data) {
	return {
		type: SET_SNACKBAR,
		payload: data,
	};
}

export function setVideoCallAction(data) {
	return {
		type: SET_VIDEO_CALL,
		payload: data,
	};
}

export function confirmedGetTicketAction(ticket) {
	return {
		type: CONFIRMED_GET_TICKET,
		payload: ticket,
	};
}

export function confirmedGetTicketErrorAction(error) {
	return {
		type: CONFIRMED_GET_TICKET_ERROR,
		payload: error,
	};
}

export function confirmedGetChildListAction(list) {
	return {
		type: CONFIRMED_GET_CHILD_LIST,
		payload: list,
	};
}

export function confirmedGetAssetListAction(assets) {
  return {
    type: CONFIRMED_GET_ASSET_LIST,
    payload: assets,
  };
}

export function confirmedGetUnifiedChatAction(chat) {
	return {
		type: CONFIRMED_GET_UNIFIED_CHAT,
		payload: chat,
	};
}

export function confirmedGetFavouriteAction(favourite) {
	return {
		type: CONFIRMED_GET_FAVOURITE,
		payload: favourite,
	};
}

export function confirmedGetChatBatchCount(data) {
	return {
		type: CONFIRMED_GET_BATCH_COUNT,
		payload: data,
	};
}

export function confirmedGetSimilarAction(similar) {
	return {
		type: CONFIRMED_GET_SIMILAR,
		payload: similar,
	};
}

export function confirmedGetSolutionAction(solution) {
	return {
		type: CONFIRMED_GET_SOLUTION,
		payload: solution,
	};
}

export function confirmedClosePostAction(close) {
	return {
		type: CONFIRMED_CLOSE_POST,
		payload: close,
	};
}

export function confirmedKnowledgeBaseLinkAction(close) {
	return {
		type: CONFIRMED_GET_LINK_FOR_KNOWLEDGEBASE,
		payload: close,
	};
}

export function confirmedUnlinkSolution(close) {
	return {
		type: CONFIRMED_UNLINK_SOLUTION,
		payload: close,
	};
}

export function confirmedGetFRListAction(fr_data) {
	return {
		type: CONFIRMED_GET_FR_LIST,
		payload: fr_data,
	};
}

export function confirmedGetWhatsappDataAction(whatsapp_data) {
	return {
		type: CONFIRMED_GET_WHATSAPP_CHAT,
		payload: whatsapp_data,
	};
}

export function confirmedGetSMSDataAction(sms_data) {
	return {
		type: CONFIRMED_GET_SMS_CHAT,
		payload: sms_data,
	};
}

export function confirmedGetChatDataAction(chat_data) {
	return {
		type: CONFIRMED_GET_CHAT,
		payload: chat_data,
	};
}

export function confirmedGetFRChatDataAction(chat_data) {
	return {
		type: CONFIRMED_GET_FR_CHAT,
		payload: chat_data,
	};
}

export function confirmedSendWhatsappDataAction(whatsapp_data) {
	return {
		type: CONFIRMED_SEND_WHATSAPP_CHAT,
		payload: whatsapp_data,
	};
}

export function confirmedSendFAMessageAction(FA_data) {
	return {
		type: CONFIRMED_SEND_FA_CHAT,
		payload: FA_data,
	};
}

export function confirmedGetNotesAction(notes_data) {
	return {
		type: CONFIRMED_GET_NOTES,
		payload: notes_data,
	};
}

export function confirmedSendWhatsappDataWithAttachmentAction(whatsapp_data) {
	return {
		type: CONFIRMED_SEND_WHATSAPP_CHAT_WITH_ATTACHMENT,
		payload: whatsapp_data,
	};
}
export function confirmedSendChatDataAction(chat_data) {
	return {
		type: CONFIRMED_SEND_CHAT,
		payload: chat_data,
	};
}

export function confirmedUpdatePostAction(post) {
	return {
		type: CONFIRMED_EDIT_POST_ACTION,
		payload: post,
	};
}

export function confirmCheckWorkVisitAction(data) {
	return {
		type: CONFIRMED_CHECK_WORK_VISIT_ACTION,
		payload: data,
	};
}

export function confirmSchedulerListAction(data) {
	return {
		type: CONFIRMED_GET_SCHEDULER_LIST,
		payload: data,
	};
}

export function confirmGetV2FRListAction(data) {
	return {
		type: CONFIRMED_GET_V2_FR__LIST,
		payload: data,
	};
}

export function confirmGetScheduleVisitAction(data) {
	return {
		type: CONFIRMED_GET_SCHEDULE_VISIT,
		payload: data,
	};
}

export function confirmedGetNotificationAction(notiData) {
	return {
		type: CONFIRMED_GET_NOTIFICATION,
		payload: notiData,
	};
}

export function confirmedReadNotificationAction(msg) {
  return {
    type: CONFIRMED_READ_NOTIFICATION,
    payload: msg,
  };
}
