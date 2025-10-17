'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function getTodos() {
  return await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string
  if (text.trim()) {
    await prisma.todo.create({ data: { text } })
    revalidatePath('/')
  }
}

export async function deleteTodo(formData: FormData) {
  const id = formData.get('id') as string
  await prisma.todo.delete({ where: { id } })
  revalidatePath('/')
}

export async function updateTodo(formData: FormData) {
  const id = formData.get('id') as string
  const text = formData.get('text') as string
  if (text.trim()) {
    await prisma.todo.update({
      where: { id },
      data: { text }
    })
    revalidatePath('/')
  }
}

export async function toggleTodo(formData: FormData) {
  const id = formData.get('id') as string
  const completed = formData.get('completed') === 'true'
  await prisma.todo.update({
    where: { id },
    data: { completed: !completed }
  })
  revalidatePath('/')
}