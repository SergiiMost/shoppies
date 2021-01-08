import { useCallback, useEffect, useState, useRef } from 'react'
import debounce from './utils/debounce'
import Navbar from './components/Navbar/Navbar'
import NominationsList from './components/NominationsList/NominationsList'
import headerImage from './assets/svg/header_image.svg'
import Footer from './components/Footer/Footer'
import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation'
import MovieCard from './components/MovieCard/MovieCard'
import LoadingButton from './components/LoadingButton/LoadingButton'
import Overlay from './components/Overlay/Overlay'
import SuccessModal from './components/SuccessModal/SuccessModal'
import MovieInfo from './components/MovieInfo/MovieInfo'
import { BiSearch } from 'react-icons/bi'
import styles from './App.module.scss'

function App() {
  const firstRender = useRef(true)
  const [nominated, setNominated] = useState(JSON.parse(localStorage.getItem('nominated')) || {})
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [currentPage, setCurrentpage] = useState(1)
  const [apiResponse, setApiResponse] = useState({})
  const [movies, setMovies] = useState([])
  const [showModal, setShowModal] = useState({ show: false, type: '' })
  const [movieInfo, setMovieInfo] = useState({ id: null, info: '', loading: false })
  const [fetchError, setFetchError] = useState(null)
  let { totalResults, Error: error } = apiResponse

  let numberOfPages = null
  if (totalResults) numberOfPages = Math.ceil(apiResponse.totalResults / 10)

  //Handle load more click when we have more than 10 movies
  const handleLoadMoreButtonClick = () => {
    setCurrentpage(currentPage + 1)
  }

  // Nominate a movie
  const handleNominate = (obj) => {
    setNominated({ ...nominated, ...obj })
  }

  // Remove a nomination
  const handleRemoveNomination = (id) => {
    let obj = { ...nominated }
    delete obj[id]
    setNominated(obj)
  }

  //hide overlay
  const handleOverlayClick = () => {
    setShowModal({ show: false, type: '' })
    document.body.style.overflowY = 'auto'
  }

  // handle  a button click for more info about a movie
  const handleMoreInfoClick = (id) => {
    if (id === movieInfo.id) {
      setMovieInfo({ ...movieInfo, id: id, loading: false })
    } else {
      setMovieInfo({ info: '', id: id, loading: true })
    }
  }

  // debounced api request to prevent spamming the api with requests on each keystroke
  // a request is fired only after 800ms of the last keystroke
  const debouncedApiRequest = useCallback(
    debounce(async (value) => {
      if (value.trim() !== '') {
        value = value.trim()
        let url = `https://www.omdbapi.com/?s=${value}&apikey=eb8f90cf&page=${currentPage}&type=movie`
        const res = await fetch(url).then((data) => data.json())
        setMovies(res.Search)
        setCurrentpage(1)
        setApiResponse(res)
      }
      setLoading(false)
    }, 800),
    []
  )

  //runs when the movie input changes
  useEffect(() => {
    const fireRequest = async () => {
      setApiResponse({})
      setMovies([])
      if (input.trim() !== '') setLoading(true)
      else setLoading(false)
      try {
        debouncedApiRequest(input)
      } catch (err) {
        setLoading(false)
        setFetchError('Something went wrong. Try again later.')
      }
    }

    fireRequest()
  }, [input])

  // runs when we change page from 1 -> 2 when we have more that 10 movies available
  useEffect(() => {
    const loadMore = async () => {
      try {
        if (currentPage > 1) {
          setButtonLoading(true)
          let url = `https://www.omdbapi.com/?s=${input}&apikey=eb8f90cf&page=${currentPage}&type=movie`
          const res = await fetch(url).then((data) => data.json())
          setMovies([...movies, ...res.Search])
          setButtonLoading(false)
        }
      } catch (err) {
        setButtonLoading(false)
        setFetchError('Something went wrong. Try again later.')
      }
    }

    loadMore()
  }, [currentPage])

  //displays a banner when all 5 movies were nominated
  useEffect(() => {
    localStorage.setItem('nominated', JSON.stringify(nominated))
    if (firstRender.current !== true) {
      if (Object.keys(nominated).length === 5) {
        setShowModal({ show: true, type: 'success' })
        document.body.style.overflowY = 'hidden'
      }
    }
  }, [nominated])

  //fetches data about individual movie, runs when a movie id has changed
  useEffect(() => {
    const loadMovieData = async () => {
      if (movieInfo.id !== null) {
        setShowModal({ show: true, type: 'movieInfo' })
        document.body.style.overflowY = 'hidden'
        try {
          let url = `https://www.omdbapi.com/?i=${movieInfo.id}&apikey=eb8f90cf&type=movie`
          const res = await fetch(url).then((data) => data.json())
          setMovieInfo({ ...movieInfo, info: res, loading: false })
        } catch (err) {
          setMovieInfo({ id: null, info: '', loading: false })
          setFetchError('Something went wrong. Try again later.')
        }
      }
    }

    loadMovieData()
  }, [movieInfo.id])

  // determine if first load
  useEffect(() => {
    firstRender.current = false
  }, [])

  return (
    <>
      <Navbar />
      {showModal.show && (
        <Overlay handleOverlayClick={handleOverlayClick}>
          {showModal.type === 'success' ? (
            <SuccessModal numberOfNominations={5} />
          ) : (
            <MovieInfo info={movieInfo.info} loading={movieInfo.loading} />
          )}
        </Overlay>
      )}

      <header className={styles.header}>
        <div className={styles.headerContentWrapper}>
          <div className={styles.headerTextWrapper}>
            <h1 className={styles.headerMain}>Movie awards for entrepreneurs</h1>
            <h2 className={styles.headerSecondary}>nominate your favorite movies for the upcoming Shoppies</h2>
          </div>
          <div className={styles.headerImageWrapper}>
            <img className={styles.headerImage} src={headerImage} alt='2 people holding awards' />
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainContentWrapper}>
          <NominationsList nominated={nominated} removeNomination={handleRemoveNomination} />
          <div className={styles.moviesWrapper}>
            <div className={styles.moviesInputWrapper}>
              <label className={styles.moviesInputLabel}>Movie title</label>
              <input
                className={styles.moviesInput}
                type='text'
                id='title'
                onChange={(e) => setInput(e.target.value)}
                value={input}
              ></input>
              <BiSearch className={styles.moviesSearchIcon} color='#525158' size='16px' />
            </div>
            {loading && <LoadingAnimation />}
            {error === 'Too many results.' ? <p>Too many results for the title "{input}".</p> : <p>{error}</p>}
            <div className={styles.moviesContainer}>
              {fetchError ? (
                <p>{fetchError}</p>
              ) : (
                movies &&
                movies.map((movie) => (
                  <MovieCard
                    title={movie.Title}
                    year={movie.Year}
                    imgsrc={movie.Poster}
                    id={movie.imdbID}
                    key={movie.imdbID}
                    nominate={handleNominate}
                    nominated={nominated[movie.imdbID] ? true : false}
                    disableNominate={Object.keys(nominated).length >= 5 ? true : false}
                    setShowModal={setShowModal}
                    loadMovieData={handleMoreInfoClick}
                  />
                ))
              )}
            </div>
            {currentPage < numberOfPages && (
              <div className={styles.loadMore}>
                <span className={styles.loadMoreData}>
                  {currentPage * 10} / {totalResults} search results
                </span>
                <LoadingButton handleClick={handleLoadMoreButtonClick} loading={buttonLoading} />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default App
