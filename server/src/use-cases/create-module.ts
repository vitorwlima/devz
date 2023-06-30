import { Module } from '@prisma/client'
import { prisma } from 'src/db'

const createModule = async (module: Module) => {
  return await prisma.module.create({
    data: module,
  })
}

export const createModuleUseCase = (request: any, response: any) => {
  createModule(request.body)
}
