function serverNews(ServerNews, action) {
  const { type, values } = action;

  if (!ServerNews) {
    return {
      notices: [
        {
          teaser: "Loading...",
          text: "loading"
        }
      ]
    };
  }

  switch (type) {
    case 'UpdateNews':
      return { ...ServerNews, ...values };
    default:
      return ServerNews;
  }
}

export default serverNews;