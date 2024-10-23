import React, { useContext, useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets.js';
import { Context } from '../../context/context.jsx';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const [placeholder, setPlaceholder] = useState('Enter a prompt here');
    const updatePlaceholder = () => {
        if (window.innerWidth <= 768) {
            setPlaceholder('Enter a prompt');
        } else {
            setPlaceholder('Enter a prompt here');
        }
    };

    useEffect(() => {
        updatePlaceholder();
        window.addEventListener('resize', updatePlaceholder);

        return () => {
            window.removeEventListener('resize', updatePlaceholder);
        };
    }, []);

    const handleCardClick = (question) => {
        const trimmedQuestion = question.trim();
        setInput(trimmedQuestion);

        setTimeout(() => {
            if (input === trimmedQuestion) {
                onSent();
            }
        }, 100);
    };

    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.profile_pic} alt="" />
            </div>
            <div className="main-container">
                {
                    !showResult
                        ? <>
                            <div className="greet">
                                <p><span>Hello, Dhruv.</span></p>
                                <p>How can I Help You today?</p>
                            </div>
                            <div className="cards">
                                <div className="card" onClick={() => handleCardClick("Suggest beautiful places to see on an upcoming road trip")}>
                                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                                    <img src={assets.compass_icon} alt="" />
                                </div>
                                <div className="card" onClick={() => handleCardClick("Briefly summarize this concept: urban planning")}>
                                    <p>Briefly summarize this concept: urban planning</p>
                                    <img src={assets.bulb_icon} alt="" />
                                </div>
                                <div className="card" onClick={() => handleCardClick("Brainstorm team bonding activities for our work retreat")}>
                                    <p>Brainstorm team bonding activities for our work retreat</p>
                                    <img src={assets.message_icon} alt="" />
                                </div>
                                <div className="card" onClick={() => handleCardClick("Tell me about React js and React native")}>
                                    <p>Tell me about React js and React native</p>
                                    <img src={assets.code_icon} alt="" />
                                </div>
                            </div>
                        </>
                        : <div className='result'>
                            <div className="result-title">
                                <img src={assets.profile_pic} alt="" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className="result-data">
                                <img src={assets.gemini_icon} alt="" />
                                {loading
                                    ? <div className='loader'>
                                        <hr />
                                        <hr />
                                        <hr />
                                    </div>
                                    : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                }
                            </div>
                        </div>
                }

                <div className="main-bottom">
                    <div className="serach-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder={placeholder}
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? <img onClick={() => onSent(input)} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Main;
