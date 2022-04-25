import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create new records 
  let sampleBooks = []

  const book = {
    title: "Title of Book",
    content: "Content of book",
    author: "Devil",
  }
  // Loop through and create dummy recods
  for (let index = 0; index < 5; index++) {
    const i = Number(index + 1)
    sampleBooks.push({
      title: `${book.title}_${i}`,
      content: `${book.content}_${i}`,
      author: book.author
    })
  }

  // Find the records 
  const books = await prisma.book.findMany()
  // If no books then insertMany
  if (books.length <= 0) {
    await prisma.book.createMany({ data: sampleBooks })
  }
  // Find all the records
  const newBooks = await prisma.book.findMany()
  console.log('newBooks', newBooks)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })