import './App.css';
import { useEffect, useState } from 'react';

function SentenceSplit({ sentence, word, clickOnWord }: any) {
  const splitIntoWords = (s) => {
    return s.split(/([^A-Za-z\-])/); // eslint-disable-line
  };

  const [sentenceTokens, setSentenceTokens] = useState(
    splitIntoWords(sentence),
  );

  const TokenElements = sentenceTokens.map((token) => {
    const isAlpha = (str) => /^[a-zA-Z\-]*$/.test(str); // eslint-disable-line
    if (isAlpha(token)) {
      if (word === token) {
        return (
          <a
            className="word-token chosen"
            onClick={(e) => {
              clickOnWord(e, token);
            }}
          >
            {token}
          </a>
        );
      }

      return (
        <a
          className="word-token"
          onClick={(e) => {
            clickOnWord(e, token);
          }}
        >
          {token}
        </a>
      );
    }

    return <p className="word-token">{token}</p>;
  });
  return <div>{TokenElements}</div>;
}

function ReferenceInput({ reference, setReference }: any) {
  const onChange = (event: any) => {
    setReference(event.target.value);
  };

  return (
    <label className="ref-input-label">
      <span>from:</span>
      <input type="text" value={reference} onChange={onChange} />
    </label>
  );
}

export default function Entry() {
  const [sentence, setSentence] = useState('');
  const [word, setWord] = useState('');
  const [textAreaDisabled, setTextAreaDisabled] = useState(false);
  const [showSelectWord, setShowSelectWord] = useState(false);
  const [reference, setReference] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    // fetch('/some-api', { method: form.method, body: formData });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  };

  const continueOnClick = (event: any) => {
    setTextAreaDisabled(true);
    setShowSelectWord(true);
  };

  const backOnClick = (event: any) => {
    setTextAreaDisabled(false);
    setShowSelectWord(false);
  };

  const clickOnWord = (event: any, word: string) => {
    console.log('"%s" is clicked', word);
    setWord(word);
  };

  const resetStates = () => {
    setSentence('');
    setShowSelectWord(false);
    setTextAreaDisabled(false);
    setWord('');
  };

  const getTime = () => {
    let date = new Date();
    date.toISOString().split('T')[0];
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split('T')[0];
  };

  const storeWord = (word: string) => {
    const item = {
      sentence,
      word,
      ref: reference,
      mandarin: '',
      time: getTime(),
    };
    const vocabulary = localStorage.getItem('vocabulary');
    if (vocabulary === null) {
      localStorage.setItem('vocabulary', JSON.stringify([item]));
    } else {
      const vocabularyJson = JSON.parse(vocabulary);
      vocabularyJson.push(item);
      console.log(vocabularyJson);
      localStorage.setItem('vocabulary', JSON.stringify(vocabularyJson));
    }
  };

  const enterOnClick = (event: any) => {
    console.log('word is "%s" when clicking on enter', word);
    storeWord(word);
    resetStates();
  };

  return (
    <div className="page-container">
      <label id="textarea-label">Paste your sentence:</label>
      <div style={{ marginBottom: '20px' }}>
        <textarea
          name="sentence-box"
          rows={4}
          cols={35}
          value={sentence}
          disabled={textAreaDisabled}
          onChange={(event: any) => {
            setSentence(event.target.value);
          }}
        />
        <button
          type="button"
          id="continue"
          onClick={continueOnClick}
          disabled={showSelectWord}
        >
          Continue
        </button>
      </div>
      {showSelectWord && (
        <div className="select-word">
          <SentenceSplit
            sentence={sentence}
            word={word}
            clickOnWord={clickOnWord}
          />
          <div className="button-section">
            <button type="button" onClick={backOnClick} id="back">
              Back
            </button>
            {word && (
              <button type="button" onClick={enterOnClick} id="enter">
                Enter
              </button>
            )}
          </div>
        </div>
      )}
      <div className="entry-buttom-bar">
        <ReferenceInput
          className="ref-input"
          reference={reference}
          setReference={setReference}
        />
        {/* <button type="button" id='reset' onClick={
                    (e) => {localStorage.removeItem("vocabulary")}
                }>Reset all</button> */}
      </div>
    </div>
  );
}
