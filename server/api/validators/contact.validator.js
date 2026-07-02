const { z } = require("zod");

const contactSchema = z.object({
    name: z.string().min(2).max(80),
    email: z.string().email(),
    subject: z.string().max(150).optional(),
    message: z.string().min(0).max(3000),
});

module.exports = {
    contactSchema
}