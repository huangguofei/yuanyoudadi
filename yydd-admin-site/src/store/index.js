/*状态管理*/
import Vue from 'vue'
import Vuex from 'vuex'
import ADMIN_CLIENT from './modules/admin/client'
import ADMIN_SELL from './modules/admin/sell'
import ADMIN_STALL from './modules/admin/stall'
import ADMIN_SYSTEM from './modules/admin/system'
import ADMIN_COMMON from './modules/admin/common'

Vue.use(Vuex);
export default new Vuex.Store({
  	modules : {
  		ADMIN_CLIENT,
  		ADMIN_SELL,
  		ADMIN_STALL,
  		ADMIN_SYSTEM,
  		ADMIN_COMMON
  	}
});