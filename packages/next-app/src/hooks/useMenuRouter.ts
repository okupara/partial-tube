import {} from "react"
import { useRouter } from "next/router"

const MenuTypes = ["playlists", "videos", "public playlists", "about"] as const
export type MenuTypes = typeof MenuTypes[number]

const NotLoggedInMenus = [MenuTypes[2], MenuTypes[3]] as const

const URLMap: { [key in MenuTypes]: string } = {
  playlists: "/playlists",
  videos: "/videos",
  about: "/about",
  "public playlists": "/public",
}

export const useMenuRouter = () => {
  const router = useRouter()

  return {
    createOptions(currentMenu: MenuTypes, loggedIn: boolean) {
      const target = loggedIn ? MenuTypes : NotLoggedInMenus
      return Object.keys(target).filter((el) => el !== currentMenu)
    },
    onChange(menu: string) {
      router.push(URLMap[menu as MenuTypes])
    },
  }
}
