const { PrismaClient } = require('@prisma/client');

// Use a singleton PrismaClient to avoid exhausting connections in dev/hot-reload
let prisma;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient();
  }
  prisma = global.__prisma;
}

module.exports = prisma;
