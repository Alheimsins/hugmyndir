import Idea from './Idea'

export default ({ ideas }) => (
  <div className='ideasWrapper'>
    { Object.values(ideas).filter(idea => idea).map((idea, index) => <Idea idea={idea} key={index} />)}
    <style jsx>
      {`
        .ideasWrapper {
          margin-top: 10px;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }
      `}
    </style>
  </div>
)
