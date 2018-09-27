import api from "../../../api";
import {CLEAR_DATACENTER_DETAIL, FILTER_DATACENTER_DETAIL, FILTER_OUTLINE} from "../../../constants/ActionTypes";

export const fetchOutlineData = (page, searchEventCode, searchUrl, searchSsid, searchIp, selected) => dispatch => {
  const condition = {
    'page[number]': page,
  }
  searchEventCode && (condition['filter[eventCode]'] = searchEventCode)
  searchUrl && (condition['filter[urlLog]'] = searchUrl)
  searchSsid && (condition['filter[ssid]'] = searchSsid)
  searchIp && (condition['filter[ip]'] = searchIp)
  selected && (condition['filter[isWechat]'] = selected)
  return dispatch({
    type: FILTER_OUTLINE,
    promise: api.fetchOutlineData({params: condition}),
  })
}

export const fetchOutlineDetail = id => dispatch => {
  return dispatch({
    type: FILTER_DATACENTER_DETAIL,
    promise: api.fetchOutlineDetail(id)
  })
}

export const clearDataCenterData = () => ({type: CLEAR_DATACENTER_DETAIL})
