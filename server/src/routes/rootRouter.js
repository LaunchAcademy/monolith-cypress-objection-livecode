import express from "express"
import stuffedAnimalsRouter from "./api/v1/stuffedAnimalsRouter.js"
import clientRouter from "./clientRouter.js"

const rootRouter = new express.Router()

rootRouter.use("/api/v1/stuffed-animals", stuffedAnimalsRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
