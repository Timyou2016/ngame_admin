const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
  isGm: state => state.user.is_gm,
  auth: state => state.user.auth,
  id: state => state.user.id,
  permission_routes: state => state.permission.routes,
  systemTitle: state => state.settings.title,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
