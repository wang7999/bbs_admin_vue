import { Store } from 'vuex'

declare interface User {
  token: string,
  userInfo: object|null
}
declare interface Permission {
  menus: Array,
  baseMenus: Array,
  dataPerms: Array
}

declare interface App {
  device: string,
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  },
  language: string,
  size: string
}
declare interface TagsView {
  visitedViews: Array,
  cachedViews: (string | undefined)[]
}

declare interface State {
  user: User,
  permission: Permission,
  app: App,
  tagsView: TagsView
}

