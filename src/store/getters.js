const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname,
<<<<<<< HEAD
  id: state => state.user.id,
  systemTitle: state => state.settings.title,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
=======
  id: state => state.user.id
>>>>>>> 7adeb3e7cc3d63ee369d75da9cba4b1d581200a9
}
export default getters
