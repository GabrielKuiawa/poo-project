import { ImageList } from "./features/images/components/ImageList";
import "./index.css";
import { mockImages } from "./mocks/images";

function App() {
  return <ImageList images={mockImages} />;
}

export default App;
