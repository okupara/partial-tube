export const Menus = ["playlists", "videos", "public videos", "about"] as const
export const NotLoggedInMenus = [Menus[2], Menus[3]] as const
export type MenuType = typeof Menus[number]

const URLTable: { [key in MenuType]: string } = {
  playlists: "/playlists",
  videos: "/videos",
  "public videos": "/public",
  about: "/about",
}

export const createOptions = (current: MenuType, isLoggedIn: boolean) => {
  const target = isLoggedIn ? Menus : NotLoggedInMenus
  return target.filter((item) => item !== current)
}

export const determineURL = (value: string) => URLTable[value as MenuType]
