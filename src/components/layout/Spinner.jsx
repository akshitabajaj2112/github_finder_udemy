import spinners from './assets/spinners.gif'

function Spinner() {
  return (
    <div className='mt-20'>
      <img
        width={180}
        className='text-center mx-auto'
        src={spinners}
        alt='Loading...'
      />
    </div>
  )
}

export default Spinner;