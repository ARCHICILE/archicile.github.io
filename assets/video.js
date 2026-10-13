// يحوّل رابط فيديو (YouTube، TikTok، Facebook، أو ملف mp4) إلى ما يُعرض في الصفحة
window.ArchiVideo = (function () {
  function youtubeId(u) {
    const m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : null;
  }
  function parse(url) {
    const u = (url || '').trim();
    if (!u) return null;
    const yt = youtubeId(u);
    if (yt) return { kind: 'youtube', embed: 'https://www.youtube-nocookie.com/embed/' + yt + '?autoplay=1&rel=0', thumb: 'https://i.ytimg.com/vi/' + yt + '/hqdefault.jpg', vertical: /shorts\//.test(u) };
    const tt = u.match(/tiktok\.com\/.*\/video\/(\d+)/);
    if (tt) return { kind: 'tiktok', embed: 'https://www.tiktok.com/embed/v2/' + tt[1], vertical: true };
    if (/facebook\.com|fb\.watch/.test(u)) return { kind: 'facebook', embed: 'https://www.facebook.com/plugins/video.php?show_text=false&href=' + encodeURIComponent(u), vertical: /\/reel\//.test(u) };
    if (/\.(mp4|webm)(\?|$)/i.test(u)) return { kind: 'file', src: u };
    return null;
  }
  return { parse: parse };
})();
