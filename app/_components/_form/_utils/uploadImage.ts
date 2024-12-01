export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  // Substitua a URL pela API onde o upload será tratado
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao enviar a imagem");
  }

  const data = await response.json();
  return data.url; // Retorne a URL da imagem armazenada
};

