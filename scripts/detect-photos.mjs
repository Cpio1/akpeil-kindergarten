/**
 * Находит фотографии садика в public/ и записывает пути и размеры в lib/photos.generated.json.
 * Запускается автоматически перед `npm run dev` и `npm run build`.
 *
 *   public/images/main-page.*   — главный экран (любое расширение: jpg, jpeg, png, webp, avif)
 *   public/images/main-page2.*  — раздел «Біз туралы / О нас»
 *   public/gallery/*            — фотографии галереи (порядок — по имени файла)
 *
 * Остальные фото из public/images (кроме main-page и main-page2) тоже попадают в галерею.
 */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const UNSUPPORTED_EXTENSIONS = new Set([".heic", ".heif", ".tif", ".tiff"]);
const MAIN = "main-page";
const ABOUT = "main-page2";

async function listPhotos(dir) {
  let files;
  try {
    files = await readdir(path.join(root, "public", dir));
  } catch {
    return [];
  }
  for (const name of files) {
    if (UNSUPPORTED_EXTENSIONS.has(path.extname(name).toLowerCase())) {
      console.warn(`[photos] ${dir}/${name}: формат не поддерживается браузерами, сохраните файл как JPG или WebP`);
    }
  }
  return files
    .filter((name) => !name.startsWith(".") && PHOTO_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => ({ dir, name, base: path.basename(name, path.extname(name)).toLowerCase() }));
}

async function describe({ dir, name }) {
  const meta = await sharp(path.join(root, "public", dir, name)).metadata();
  if (!meta.width || !meta.height) return null;
  // EXIF-ориентация 5–8 означает поворот на 90°: ширина и высота меняются местами.
  const rotated = (meta.orientation ?? 1) >= 5;
  return {
    file: name,
    src: `/${dir ? `${dir}/` : ""}${encodeURIComponent(name)}`,
    width: rotated ? meta.height : meta.width,
    height: rotated ? meta.width : meta.height,
  };
}

const sectionPhotos = [...(await listPhotos("images")), ...(await listPhotos(""))];
const findSection = (base) => sectionPhotos.find((photo) => photo.base === base);

const mainFile = findSection(MAIN);
const aboutFile = findSection(ABOUT);
const galleryFiles = [
  ...(await listPhotos("gallery")),
  ...sectionPhotos.filter((photo) => photo.dir === "images" && photo !== mainFile && photo !== aboutFile),
];

const result = {
  main: mainFile ? await describe(mainFile) : null,
  about: aboutFile ? await describe(aboutFile) : null,
  gallery: (await Promise.all(galleryFiles.map(describe))).filter(Boolean),
};

console.log(`[photos] ${MAIN}: ${result.main ? result.main.src : "не найдено — показывается заглушка"}`);
console.log(`[photos] ${ABOUT}: ${result.about ? result.about.src : "не найдено — показывается заглушка"}`);
console.log(`[photos] галерея: ${result.gallery.length} фото`);

await writeFile(path.join(root, "lib", "photos.generated.json"), JSON.stringify(result, null, 2) + "\n");
