import  Router from "next/router"

export const redirectBase = async(path) => {
  await Router.push(`/${path}`)

}
