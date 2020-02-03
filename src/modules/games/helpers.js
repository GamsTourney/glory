const getGameName = (match, game) => {
  const { team, groupId } = match
  let gameName = game.name
  if (team !== null) {
    gameName += ` (Team ${team + 1})`
  } else if (groupId !== null) {
    gameName += ` (Group ${groupId + 1})`
  }
  return gameName
}

export { getGameName }
