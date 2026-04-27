import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PieChartStats from '../PieChartStats'

import './index.css'

const bgTeamGradientColors = {
  RCB: {gradientColor1: '#a4261d', gradientColor2: '#1e293b'},
  KKR: {gradientColor1: '#4f5db0', gradientColor2: '#5755a7'},
  KXP: {gradientColor1: '#d91c1f', gradientColor2: '#5755a7'},
  CSK: {gradientColor1: '#f7db00', gradientColor2: '#ffffff33'},
  RR: {gradientColor1: '#da237b', gradientColor2: '#13418b'},
  MI: {gradientColor1: '#13418b', gradientColor2: '#1e293b'},
  SH: {gradientColor1: '#f26d22', gradientColor2: '#ffffff33'},
  DC: {gradientColor1: '#0f172a', gradientColor2: '#d91c1f'},
}

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatchDetails: {},
    recentMatches: [],
    isLoading: true,
    stats: {won: 0, lost: 0, drawn: 0},
  }

  componentDidMount() {
    this.fetchTeamRecentMatches()
  }

  getStats = matches => {
    let won = 0
    let lost = 0
    let drawn = 0

    matches.forEach(match => {
      if (match.matchStatus === 'Won') won += 1
      else if (match.matchStatus === 'Lost') lost += 1
      else drawn += 1
    })

    return {won, lost, drawn}
  }

  fetchTeamRecentMatches = async () => {
    const {match} = this.props
    const response = await fetch(`https://apis.ccbp.in/ipl/${match.params.id}`)
    const data = await response.json()
    console.log(data)
    const {
      team_banner_url: teamBannerUrl,
      latest_match_details: latestMatchDetails,
      recent_matches: recentMatches,
    } = data
    const updatedLatestMatchDetails = {
      id: latestMatchDetails.id,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      umpires: latestMatchDetails.umpires,
      venue: latestMatchDetails.venue,
      date: latestMatchDetails.date,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      matchStatus: latestMatchDetails.match_status,
    }
    const updatedRecentMatches = recentMatches.map(matchDetails => ({
      id: matchDetails.id,
      competingTeam: matchDetails.competing_team,
      competingTeamLogo: matchDetails.competing_team_logo,
      result: matchDetails.result,
      matchStatus: matchDetails.match_status,
    }))

    const stats = this.getStats(updatedRecentMatches)

    this.setState({
      teamBannerUrl,
      latestMatchDetails: updatedLatestMatchDetails,
      recentMatches: updatedRecentMatches,
      stats,
      isLoading: false,
    })
  }

  render() {
    const {teamBannerUrl, latestMatchDetails, recentMatches, stats} = this.state
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {gradientColor1, gradientColor2} = bgTeamGradientColors[
      params.id
    ] || {
      gradientColor1: '#000000',
      gradientColor2: '#000000',
    }
    return (
      <div
        className="team-matches-container"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${gradientColor1}, ${gradientColor2})`,
        }}
      >
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <>
            <Link to="/" className="link-element">
              <button type="button" className="back-btn">
                Back
              </button>
            </Link>
            <div className="team-match-details">
              <img
                className="team-banner"
                src={teamBannerUrl}
                alt="team banner"
              />
              <p className="latest-match-title">Latest Matches</p>
              <LatestMatch latestMatchDetails={latestMatchDetails} />

              <PieChartStats
                won={stats.won}
                lost={stats.lost}
                drawn={stats.drawn}
              />

              <ul className="recent-matches-container">
                {recentMatches.map(matchDetails => (
                  <MatchCard
                    key={matchDetails.id}
                    matchDetails={matchDetails}
                  />
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default TeamMatches
