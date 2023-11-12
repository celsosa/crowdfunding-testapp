const bcrypt = require("bcrypt");

async function generatePasswordHash() {
  const password = "admin123";
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Hash da senha:", hash);
  } catch (error) {
    console.error("Erro ao gerar hash da senha:", error);
  }
}

generatePasswordHash();
