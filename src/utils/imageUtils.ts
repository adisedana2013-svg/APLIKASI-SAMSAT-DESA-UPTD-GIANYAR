/**
 * Compresses and resizes an uploaded image file to a JPEG Data URL
 * so multiple activity photos can be stored reliably in localStorage and JSON backups.
 */
export const compressImageToBase64 = (
  file: File,
  maxDimension = 1280,
  quality = 0.78
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error(`File "${file.name}" bukan file gambar yang valid.`));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      reject(new Error(`Gagal membaca file "${file.name}".`));
    };

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) {
        reject(new Error(`Data gambar "${file.name}" kosong.`));
        return;
      }

      const img = new Image();
      img.onerror = () => {
        reject(new Error(`Format gambar "${file.name}" tidak didukung.`));
      };

      img.onload = () => {
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width >= height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };

      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
};
