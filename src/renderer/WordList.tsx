import './App.css';
import { useEffect, useState, useSyncExternalStore } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faArrowLeft,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

function WordExample({ sentence, word }: any) {
  const splitIntoWords = (s) => {
    return s.split(/([^A-Za-z])/);
  };

  const [sentenceTokens, setSentenceTokens] = useState(
    splitIntoWords(sentence),
  );

  const TokenElements = sentenceTokens.map((token) => {
    if (word === token) {
      return <p style={{ color: 'purple' }}>{token}</p>;
    }

    return <p style={{ color: 'black' }}>{token}</p>;
  });
  return <div className="word-example">{TokenElements}</div>;
}

function WordOptions({ deleteWord, index }: any) {
  const [showPopOut, setShowPopOut] = useState(false);
  const deleteWordOnClick = () => {
    deleteWord(index);
    setShowPopOut(!showPopOut);
  };
  return (
    <div>
      <div className="word-options">
        <button
          onClick={() => {
            setShowPopOut(!showPopOut);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {showPopOut && (
        <div className="pop-out">
          <a
            onClick={() => {
              deleteWordOnClick();
            }}
          >
            delete this word
          </a>
        </div>
      )}
    </div>
  );
}

function WordCarousel({ wordList, setWordList }: any) {
  const [index, setIndex] = useState(0);
  const [location, setLocation] = useState(0);

  const wordListLength = wordList === null ? 0 : wordList.length;
  const carouselWidth = 320;
  const prevButtonVisibility = index === 0 ? 'hidden' : 'visible';
  const nextButtonVisibility =
    index === wordListLength - 1 ? 'hidden' : 'visible';

  const handleCarouselIndex = (offset: number) => {
    if (index + offset >= wordListLength || index + offset < 0) {
      return;
    }
    console.log(index + offset);
    // console.log(wordListLength)
    const tmp_location = location + offset * -carouselWidth;
    document
      .getElementsByClassName('carousel-change')[0]
      .setAttribute('style', `transform: translateX(${tmp_location}px)`);

    setIndex((index + offset) % wordListLength);
    setLocation(tmp_location);
  };

  const deleteWord = (idx: number) => {
    let newWordList;
    if (wordListLength == 1) {
      newWordList = null;
      localStorage.removeItem('vocabulary');
      setIndex(0);
    } else {
      newWordList = [];
      for (let i = 0; i < wordListLength; i++) {
        if (i == idx) continue;
        newWordList.push(wordList[i]);
      }
      if (idx == wordListLength - 1) {
        handleCarouselIndex(-1);
      }
      localStorage.setItem('vocabulary', JSON.stringify(newWordList));
    }
    setWordList(newWordList);
    console.log(wordList);
    console.log(index);
  };

  const TopCarouselElements = (wordList: any[]) => {
    return wordList.map((element, index) => (
      <div className="top-carousel-element" key={index}>
        <div style={{ width: `${carouselWidth}px` }}>
          <div className="word">{element.word}</div>
          <WordExample sentence={element.sentence} word={element.word} />
        </div>
        <div className="word-info">
          <span>{element.ref}</span>
          <span>{element.time}</span>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="top-carousel">
        {wordList != null && (
          <div>
            <div className="top-carousel-container">
              <div className="carousel-change">
                {TopCarouselElements(wordList)}
              </div>
            </div>
            <div className="control">
              <button
                onClick={() => handleCarouselIndex(-1)}
                style={{ visibility: prevButtonVisibility }}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button
                onClick={() => handleCarouselIndex(1)}
                style={{ visibility: nextButtonVisibility }}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <WordOptions deleteWord={deleteWord} index={index} />
          </div>
        )}
        {wordList == null && <h3>Go add your first word !</h3>}
      </div>
    </div>
  );
}

function loadWordList() {
  const vocabulary = localStorage.getItem('vocabulary');
  if (vocabulary === null) {
    return null;
  }

  return JSON.parse(vocabulary).reverse();
}

export default function WordListPage() {
  const [wordList, setWordList] = useState(loadWordList());

  useEffect(() => {
    if (wordList !== null) {
      console.log('number of words: %d', wordList.length);
    } else {
      console.log('number of words: 0');
    }
  }, []);

  return (
    <div className="page-container" id="word-list">
      <WordCarousel wordList={wordList} setWordList={setWordList} />
    </div>
  );
}
