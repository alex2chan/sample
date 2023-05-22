import bodyParser from "body-parser"
import express, { Request, Response } from "express"
import { AppDataSource } from "./data-source.js"
import { Sum } from "./entity/Sum.js"
import { Routes } from "./routes.js"
import cors from "cors"

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.set("view engine", "pug")
    app.get("/", (req, res) => {
      res.render("index", { title: "Hey", message: "Hello there!" })
    })
    app.use(cors())
    // app.options("*", cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }))

    // app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }))

    // register express routes from defined application routes
    Routes.forEach((route) => {
      ;(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next)
        if (result instanceof Promise) {
          result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined))
        } else if (result !== null && result !== undefined) {
          res.json(result)
        }
      })
    })

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // insert new users for test
    await AppDataSource.manager.save(
      AppDataSource.manager.create(Sum, {
        firstNumber: 2,
        secondNumber: 3,
        total: 5,
      })
    )

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24,
    //   })
    // )

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")
  })
  .catch((error) => console.log(error))
