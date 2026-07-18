import "./index.css";
import { mockImages, type ImageMock } from "./mocks/images";

const images: ImageMock[] = mockImages;

function App() {
  return (
    <main className="min-h-screen w-full columns-[230px] gap-4 px-4 py-3">
      {images.map((image) => (
        <div key={image.id} className="mb-5 break-inside-avoid">
          <img
            className="block h-auto min-h-37.5 max-h-130 w-full rounded-2xl object-cover"
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
