import { CONFIRMED_FA_DATA_ADDED } from "./ActionTypes";

export function setFAData(data) {
    return {
        type: CONFIRMED_FA_DATA_ADDED,
        payload: data,
    };
}