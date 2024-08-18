import './App.css';
import { useEffect, useState, useSyncExternalStore } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function WordExample({sentence, word}: any) {
    const splitIntoWords = (s) => {
        return s.split(/([^A-Za-z])/);
    }

    const [sentenceTokens, setSentenceTokens] = useState(splitIntoWords(sentence))

    let TokenElements = sentenceTokens.map((token) => {
        if(word===token){
            return (
                <p style={{color: 'purple'}}>{token}</p>
            )
        }
        else{
            return (
                <p style={{color: 'black'}}>{token}</p>
            )
        }
    })
    return (
        <div className='word-example'>
            {TokenElements}
        </div>
    )
}

function WordCarousel({wordList}: any) {
    const [index, setIndex] = useState(0);
    const [location, setLocation] = useState(0);

    const wordListLength = wordList === null ? 0 : wordList.length
    const carouselWidth = 320;
    const prevButtonDisabled = index === 0 ? true : false
    const nextButtonDisabled = index === wordListLength - 1 ? true : false

    const handleCarouselIndex = (offset: number) => {
        if (index + offset >= wordListLength || index + offset < 0) {
            return;
        }
        console.log(index + offset)
        //console.log(wordListLength)
        const tmp_location = (location + offset * -carouselWidth);
        document
            .getElementsByClassName("carousel-change")[0]
            .setAttribute("style", `transform: translateX(${tmp_location}px)`);

        setIndex((index + offset) % wordListLength)
        setLocation(tmp_location)
    }

    const TopCarouselElements = (wordList: any[]) => {
        return wordList.map((element, index) => (
            <div className="top-carousel-element" key={index}>
                <div style={{width: `${carouselWidth}px`}}>
                    <div className='word'>{element.word}</div>
                    <WordExample sentence={element.sentence} word={element.word}></WordExample>
                </div>
            </div>
        ));
    }
    
    return (
        <div className="top-carousel">
            {(wordList != null) &&
            <div>
            <div className="top-carousel-container">
                <div className="carousel-change">{TopCarouselElements(wordList)}</div>
            </div>
            <div className="control">
                <button onClick={() => handleCarouselIndex(-1)} disabled={prevButtonDisabled}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button onClick={() => handleCarouselIndex(1)} disabled={nextButtonDisabled}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
            </div>
            }
            {(wordList == null) &&
            <h3>
                Go add your first word !
            </h3>
            }
        </div>
    )
}

function loadWordList() {
    var vocabulary = localStorage.getItem("vocabulary");
    if (vocabulary === null) {
        return null
    }
    else {
        return JSON.parse(vocabulary);
    }
}

export default function WordListPage() {
    const [wordList, setWordList] = useState(loadWordList())

    useEffect(() => {
        if(wordList !== null){
            console.log('number of words: %d', wordList.length);
        }
        else {
            console.log('number of words: 0');
        }
    }, [])

    return (
        <div className='page-container' id='word-list'>
            <WordCarousel wordList={wordList}></WordCarousel>
        </div>
    )
}