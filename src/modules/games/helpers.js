const getGameName = (match, game) => {
  const { team, groupId } = match
  let gameName = game.name
  if (team !== null && team !== undefined) {
    gameName += ` (Team ${team + 1})`
  } else if (groupId !== null && groupId !== undefined) {
    gameName += ` (Group ${groupId + 1})`
  }
  return gameName
}

export { getGameName }
