import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    umpires,
    venue,
    date,
    firstInnings,
    secondInnings,
    result,
    manOfTheMatch,
  } = latestMatchDetails
  return (
    <div className="latest-match-details-container">
      <div className="competing-team-details-container">
        <div className="competing-team-text-container">
          <p className="competing-team-name">{competingTeam}</p>
          <p className="latest-match-date">{date}</p>
          <p className="latest-match-venue">{venue}</p>
          <p className="latest-match-result">{result}</p>
        </div>
        <img
          className="competing-team-logo-sm"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
      </div>
      <img
        className="competing-team-logo-lg"
        src={competingTeamLogo}
        alt={`${competingTeam}`}
      />
      <hr className="hr-line" />
      <div className="match-specific-details-container">
        <p className="specific-details-title">First Innings</p>
        <p className="specific-details-text">{firstInnings}</p>
        <p className="specific-details-title">Second Innings</p>
        <p className="specific-details-text">{secondInnings}</p>
        <p className="specific-details-title">Man Of The Match</p>
        <p className="specific-details-text">{manOfTheMatch}</p>
        <p className="specific-details-title">Umpires</p>
        <p className="specific-details-text">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
