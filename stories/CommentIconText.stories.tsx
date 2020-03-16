import React from "react"
import { MarginDecorator } from "./Decorators"
import { CommentIconText } from "../src/app/components/molecules/CommentIconText"

export const withComment = () => <CommentIconText text="helloハロー" />
export const noComment = () => <CommentIconText />

export default {
  title: "Text/CommentIconText",
  decorators: [MarginDecorator],
}
