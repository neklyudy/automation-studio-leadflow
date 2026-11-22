import { useState } from "react";
import { Play, MonitorPlay } from "lucide-react";
import { leadflowDemoVideo, youtubeId } from "../config/video";
import { localUrl } from "../config/paths";
import { site } from "../config/site";

export default function VideoDemo() {
  const [playing, setPlaying] = useState(false);
  const video = leadflowDemoVideo;
  const url = video.url || site.demoVideoUrl;
  const id = video.type === "youtube" ? youtubeId(url) : null;
  const ready = Boolean(url && (video.type === "mp4" || id));
  if (!ready) return <div className="video-placeholder">
    <MonitorPlay size={32} aria-hidden="true" />
    <div><h3>Демонстрація LeadFlow</h3>
      <p>Ролик ще готується. Вже зараз можна пройти етапи обробки заявки або відкрити навчальну форму.</p>
      <div className="demo-alternatives">
        <a href="#workflow">Переглянути інтерактивну демонстрацію</a>
        <a href={site.formUrl} target="_blank" rel="noopener noreferrer">Відкрити навчальну форму</a>
      </div>
      <p>Форма навчальна: використовуйте лише вигадані дані. Надсилання не бронює прибирання.</p>
    </div>
  </div>;
  return <div className="video-player">
    {playing ? video.type === "youtube" ? <iframe
      title="Демонстрація роботи LeadFlow"
      src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"
    /> : <video controls autoPlay playsInline preload="metadata" poster={localUrl(video.poster)}>
      <source src={localUrl(url)} type="video/mp4" />
      {video.captions && <track kind="captions" src={localUrl(video.captions)} srcLang="uk" label="Українська" default />}
      Ваш браузер не підтримує відео. <a href={localUrl(url)}>Відкрити MP4</a>
    </video> : <button className="video-start" onClick={() => setPlaying(true)} aria-label="Відтворити демонстрацію LeadFlow">
      <img src={localUrl(video.poster)} alt="" width="1200" height="630" loading="lazy" />
      <span><Play aria-hidden="true" /> Переглянути демонстрацію</span>
    </button>}
  </div>;
}
