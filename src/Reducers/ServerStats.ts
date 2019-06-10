function serverStats(ServerStats, action) {
  const { type, values } = action;

  if(!ServerStats) {
    return {
      status: "fetching status...",
      running: 0,
      queue_length: 0,
      total_jobs: 0
    };
  }

  switch(type) {
    case 'UpdateStats':
      return { ...ServerStats, ...values };
    default:
      return ServerStats;
  }
}

export default serverStats;