interface ServerNews {
  notices: notice[];
}

interface notice {
  added: string;
  category: string;
  show_from: string;
  show_until: string;
  teaser: string;
  text: string;
}

export default ServerNews;
