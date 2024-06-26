import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LinearChart from '../LinearCharts'
import PieChart from '../PieChart'
import NoAnalysisDataFound from '../NoAnalysisDataFound'
import NoAnalysisFound from '../NoAnalysisFound'

class Analysis extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quarterCommitCount: {},
      langRepoCount: {},
      statusState: '',
      isLoading: true,
    }
  }

  componentDidMount() {
    const user = sessionStorage.getItem('username')
    const getAnalysisData = async () => {
      const options = {method: 'GET'}
      const response = await fetch(
        `https://apis2.ccbp.in/gpv/profile-summary/${user}?api_key=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`,
        options,
      )
      if (response.ok) {
        const data = await response.json()
        this.setState({statusState: response.ok})
        const {quarterCommitCount} = data
        const {langRepoCount} = data
        this.setState({quarterCommitCount, langRepoCount, isLoading: false})
      } else {
        this.setState({isLoading: false})
      }
    }
    getAnalysisData()
  }

  render() {
    const {quarterCommitCount, langRepoCount, statusState, isLoading} =
      this.state
    if (isLoading) {
      return (
        <div className="loader-position" data-testid="loader">
          <Loader type="TailSpin" color="#3B82F6" height={50} width={50} />
        </div>
      )
    }

    if (statusState === false) {
      return <NoAnalysisDataFound />
    }

    if (Object.keys(langRepoCount).length === 0) {
      return <NoAnalysisFound />
    }

    return (
      <>
        <LinearChart commitData={quarterCommitCount} />
        <PieChart langRepo={langRepoCount} />
      </>
    )
  }
}

export default Analysis
