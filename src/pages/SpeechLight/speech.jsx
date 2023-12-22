// import { list } from 'postcss';
import React, { useState, useRef } from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import microphoneIcon from '../../assets/images/images.png';

const Dictaphone = () => {
    const commands = [
        {
          command: "open *",
          callback: (website) => {
            window.open("http://" + website.split(" ").join(""));
          },
        },
        {
          command: "change background colour to *",
          callback: (color) => {
            document.body.style.background = color;
          },
        },
        {
          command: "reset",
          callback: () => {
            handleReset();
          },
        },
        ,
        {
          command: "reset background colour",
          callback: () => {
            document.body.style.background = `rgba(0, 0, 0, 0.8)`;
          },
        },
      ];
    const {transcript, resetTranscript} = useSpeechRecognition({commands});
    const [isListening, setIsListening] = useState(false);
    const microphoneRef = useRef(null);

    if(!SpeechRecognition.browserSupportsSpeechRecognition()){
        return(
            <div className='microphone-container'>
                Browser is not Support Speech Recognition.
            </div>
        );
    }

    const handleListening = () => {
        setIsListening(true);
        microphoneRef.current.classList.add('listening');
        SpeechRecognition.startListening({
            language: 'ko'
        });
    };

    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove('listening');
        SpeechRecognition.stopListening();
    };

    const handleReset = () => {
        stopHandle();
        resetTranscript();
    };

    console.log(transcript)

    return(
        <div className='microphone-wrapper'>
            <div className='microphone-container'>
                <div
                    className='microphone-icon-container'
                    ref={microphoneRef}
                    onClick={handleListening}
                >
                <img src={microphoneIcon} className='microphone-icon'/>
                </div>
                <div className='microphone-status'>
                    {isListening ? "Listening......." : "Click to start Listening"}
                </div>
                {isListening && (
                    <button className='microphone-stop btn' onClick={stopHandle}>
                        Stop
                    </button>
                )}
            </div>
            {transcript && (
                <div className='microphone-result-container' >
                    <div className='microphone-result-text'>{transcript}</div>
                    <button className='microphone-reset btn' onClick={handleReset}>
                        Reset
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dictaphone;