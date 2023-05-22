import { SumController } from "./controller/SumController.js"

export const Routes = [
  {
    method: "get",
    route: "/sums",
    controller: SumController,
    action: "all",
  },
  {
    method: "get",
    route: "/sums/:id",
    controller: SumController,
    action: "one",
  },
  {
    method: "put",
    route: "/sums",
    controller: SumController,
    action: "getTotal",
  },
  {
    method: "delete",
    route: "/sums/:id",
    controller: SumController,
    action: "remove",
  },
]
