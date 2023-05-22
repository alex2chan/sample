import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source.js"
import { Sum } from "../entity/Sum.js"

export class SumController {
  private sumRepository = AppDataSource.getRepository(Sum)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.sumRepository.find()
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id)

    const sum = await this.sumRepository.findOne({
      where: { id },
    })

    if (!sum) {
      return "unregistered sum"
    }
    return sum
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstNumber, secondNumber, total } = request.body

    const sum = Object.assign(new Sum(), {
      firstNumber,
      secondNumber,
      total,
    })

    return this.sumRepository.save(sum)
  }

  async getTotal(req: Request, res: Response) {
    const {firstNumber, secondNumber} = req.body
    const total = firstNumber + secondNumber
    const sum = Object.assign(new Sum(), {
      firstNumber,
      secondNumber,
      total,
    })
    return this.sumRepository.save(sum)
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id)

    let sumToRemove = await this.sumRepository.findOneBy({ id })

    if (!sumToRemove) {
      return "this sum not exist"
    }

    await this.sumRepository.remove(sumToRemove)

    return "sum has been removed"
  }
}
