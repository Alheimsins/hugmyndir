import Idea from './Idea'

export default ({ ideas }) => (
  <div>
    { Object.values(ideas).map((idea, index) => <Idea idea={idea} key={index} />)}
  </div>
)
