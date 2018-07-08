export default ({ idea }) => (
  <div className='wrapper'>
    { idea }
    <style jsx>
      {`
        .wrapper {
          text-align: left;
          padding: 10px;
          border-radius: 0;
          background-color: #FFF;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
          margin-top: 10px;
        }
      `}
    </style>
  </div>
)
