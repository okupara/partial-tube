import React from "react"
import { Margin } from "./MarginDecorator"
import CommentIconText from "../src/app/components/molecules/CommentIconText"

export const withComment = () => <CommentIconText text="helloハロー" />
export const noComment = () => <CommentIconText />

export default {
  title: "Text/CommentIconText",
  decorators: [Margin],
}
