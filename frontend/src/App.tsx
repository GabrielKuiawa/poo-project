import "./index.css";
import { mockImages, type ImageMock } from "./mocks/images";

const images: ImageMock[] = mockImages;

function App() {
  return (
    <main className="min-h-screen w-full columns-[190px] gap-3 p-3">
      {images.map((image) => (
        <div key={image.id} className="mb-3 break-inside-avoid">
          <img
            className="block h-auto min-h-60 w-full rounded-2xl object-cover"
            src={image.pathImage}
            alt={image.description}
            loading="lazy"
          />
        </div>
      ))}
    </main>
  );
}

export default App;
