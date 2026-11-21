import { renderToString } from "react-dom/server";
import App from "./App";
export { site } from "./config/site";
export function render(path: string) {
  return renderToString(<App path={path} />);
}
