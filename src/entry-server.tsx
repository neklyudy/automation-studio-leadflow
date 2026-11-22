import { renderToString } from "react-dom/server";
import App from "./App";
export { site } from "./config/site";
export { youtubeId } from "./config/video";
export function render(path: string) {
  return renderToString(<App path={path} />);
}
