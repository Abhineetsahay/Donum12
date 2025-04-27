import fs from "fs/promises";
import path from "path";
import os from "os";


export async function saveFileToDisk(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());

  const tempDir = os.tmpdir(); 
  const tempFilePath = path.join(tempDir, file.name);

  await fs.writeFile(tempFilePath, buffer);
  
  return tempFilePath; 
}
