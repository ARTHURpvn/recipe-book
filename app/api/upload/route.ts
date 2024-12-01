import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";

// Pasta de upload (deve estar dentro de "public" para servir arquivos)
const uploadDir = path.join(process.cwd(), "public/uploads");

// Garante que a pasta de upload existe
async function ensureUploadDirExists() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Garantir que a pasta de upload existe
    await ensureUploadDirExists();

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo foi enviado." },
        { status: 400 }
      );
    }

    // Gerar um nome único para o arquivo
    const fileExtension = file.name.split(".").pop();
    const uniqueName = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(uploadDir, uniqueName);

    // Ler e salvar o arquivo no servidor
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    // URL pública do arquivo
    const fileUrl = `/uploads/${uniqueName}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json(
      { error: "Erro ao fazer upload do arquivo." },
      { status: 500 }
    );
  }
}
