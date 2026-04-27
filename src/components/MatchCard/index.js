import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails
  return (
    <li className="match-item-card">
      <img
        className="team-logo"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="team-name">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={matchStatus === 'Won' ? 'text-green' : 'text-red'}>
        {matchStatus}
      </p>
    </li>
  )
}

export default MatchCard
