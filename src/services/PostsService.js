import axiosInstance from "../services/AxiosInstance";

export function getPosts() {
	return axiosInstance.get(`posts.json`);
}

export function getTicket(data, token) {
	return axiosInstance.get(
		`sr/ticket/detail/?email=${data.email}&sr_number=${data.sr_number}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export function getChildList(data, token) {
	return axiosInstance.post(`ticket/child/list/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function getAssetList(data, token) {
  return axiosInstance.post(`ticket/asset/list/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUnifiedChatData(data, token) {
	return axiosInstance.post(`get/unified_chat/data/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function getFavourite(data, token) {
	return axiosInstance.get(`tickets/favourite/?ticket=${data.ticket}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function getSimilarCase(data, token) {
	return axiosInstance.get(`similar/ticket/${data.ticket}/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function schedulerList(data, token) {
	return axiosInstance.get(`scheduler/list/?ticket_id=${data.ticket_id}/`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function scheduleVisit(data, token) {
  return axiosInstance.post(`schedule/visit/`,data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function v2FRList(data, token) {
	return axiosInstance.post(`v2/FR/list/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function getSolution(data, token) {
	return axiosInstance.get(`suggest/solution/?id=${data.id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function getFRList(data, token) {
	return axiosInstance.post(`FR/list/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function checkWorkVisit(data, token) {
	return axiosInstance.post(`check/work/visit/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

//whatsapp api
export function getWhatsappMessage(data, token, pageNo) {
	return axiosInstance.post(`whatsapp_msg_list/?page=${pageNo}`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function sendWhatsappMessage(data, token) {
	return axiosInstance.post(`send/message/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function sendFAMessage(data, token) {
	return axiosInstance.post(`private-message/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function sendWhatsappMessageWithAttachment(data, token) {
	return axiosInstance
		.post(`assets/multipart/`, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((res) => {
			const payload = {
				message_text: data.get("message_text"),
				receiver_id: data.get("receiver_id"),
				source: data.get("source"),
				ticket: data.get("ticket"),
				attachment_id: res.data.id,
			};
			axiosInstance.post(`send/message/`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		});
}

export function sendChatMessage(data, token) {
	return axiosInstance.post(`private-message/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function getSMSMessages(data, token) {
	return axiosInstance.post(`send/message/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function getChatMessages(data, token) {
	return axiosInstance.get(
		`private-message/?page=${data.pageNo}&ticket=${data.ticket}&user_read=true&opponent=${data.opponent}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export function getFRMessages(data, token) {
	return axiosInstance.get(
		`private-message/?page=${data.page}&ticket=${data.ticket}&visit=${data.visit}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export function ClosePost(data, token) {
	return axiosInstance.post(`solution/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function getNotes(data, token) {
	return axiosInstance.get(
		`comment/?page=${data.pageNo}&ticket=${data.ticket}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
}

export function getNotification(data, token) {
	  return axiosInstance.get(`device/notification/?page=${data.page}&is_read=${data.is_read}&source=${data.source}&ticket_id=${data.ticket_id}`, {
		  headers: {
			  Authorization: `Bearer ${token}`,
		  },
	  });
}

export function deleteNotification(token) {
  return axiosInstance.get(`v2/device/notification/read/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
  
export function getBatchCount(data, token) {
	return axiosInstance.post(`get/unread_msg/count/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function getTicketLink(data, token) {
	return axiosInstance.post(`agent/ticket/link/`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export function removeLinkedSolution(data, token) {
	return axiosInstance.delete(`agent/ticket/link/${data.ticketId}/?solutions_linked=${data.solutionId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}